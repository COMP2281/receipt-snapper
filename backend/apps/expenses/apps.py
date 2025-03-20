from django.apps import AppConfig
import threading
import time
import os
import pytesseract
import re
import platform
from geopy.geocoders import Nominatim
from PIL import Image
from io import BytesIO
import requests
from datetime import datetime

class ExpensesConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "expenses"

    def ready(self):
        if os.environ.get('RUN_MAIN') == 'true':
            if not hasattr(self, '_background_thread') or not self._background_thread.is_alive():
                self._background_thread = threading.Thread(target=self.start_background_tasks, daemon=True)
                self._background_thread.start()


    def start_background_tasks(self):
        OCRProcessor = OCR()
        while True:
            time.sleep(5)
            OCRProcessor.run()


class OCR():
    def __init__(self):
        
        ## Configure tesseract if on windows
        if platform.system() == "Windows":
            pytesseract.pytesseract.tesseract_cmd = 'C:/Program Files/Tesseract-OCR/tesseract.exe'.replace(os.sep, '/')

    def run(self):
        # print("Running OCR")
        queue = self.checkQueue()
        matchQueue = self.checkMatchQueue()

        for expense in queue:
            try:
                self.processExpense(expense)
            except Exception as e:
                # print(f"Error processing expense {expense.id}: {e}")
                continue

        for expense in matchQueue:
            try:
                self.attemptMatch(expense)
            except Exception as e:
                # print(f"Error matching expense {expense.id}: {e}")
                continue


    def checkQueue(self):
        from expenses.models import Expense
        queued_expenses = Expense.objects.filter(status='Queued')
        if queued_expenses.exists():
            expenses_array = list(queued_expenses)
            # print(f"Found {len(expenses_array)} queued expenses.")
            return expenses_array
        else:
            # print("No queued expenses found.")
            return []
        
    def checkMatchQueue(self):
        from expenses.models import Expense
        queued_expenses = Expense.objects.filter(status='Waiting')
        if queued_expenses.exists():
            expenses_array = list(queued_expenses)
            # print(f"Found {len(expenses_array)} waiting expenses.")
            return expenses_array
        else:
            # print("No waiting expenses found.")
            return []
        
    def processExpense(self, expense):

        self.setExpenseStatus(expense, "Processing")

        from expenses.models import Currency, Location

        image = self.getImage(expense.image_url)

        if image == None:
            # print("Error processing image")
            return
        
        try:
            text = self.getTextFromImage(image)
        except Exception as e:
            raise Exception(f"Error extracting text: {e}")

        date, amounts, currency, location = self.extractDataFromText(text)
        total_cost = self.findHighestAmount(amounts)
        formatted_date = self.reformatDate(date)
        countryCode = None
        if location:
            countryCode, lat, lon = self.geocodeLocation(location, currency)
            if not countryCode or countryCode == "not found":
                countryCode = {"GBP": "GB", "AUD": "AU"}.get(currency)
        else:
            countryCode = {"GBP": "GB", "AUD": "AU"}.get(currency)

        # convert amount to pennies
        total_cost = int(total_cost * 100)

        # if values blank, set to None
        if not formatted_date:
            formatted_date = None
        if not currency:
            currency = None
        if not total_cost:
            total_cost = None

        success = formatted_date and currency and total_cost
        ## SAVE TO DB
        if formatted_date:
            expense.date = formatted_date
        if total_cost:
            expense.amount = total_cost
        if currency:
            expense.currency_code = Currency.objects.filter(code=currency).first()
        if countryCode:
            try:
                expense.location_code = Location.objects.filter(location=countryCode).first()
            except:
                pass
        expense.save()

        if success:
            self.setExpenseStatus(expense, "Waiting")
        else:
            self.setExpenseStatus(expense, "Failed")

        self.attemptMatch(expense)

        

    def attemptMatch(self, expense):

        from expenses.models import Expense
        from card_data.models import CardData

        if not expense.date or not expense.amount:
            # print("Expense date or amount is missing. Skipping match attempt.")
            return

        # Convert amount back to decimal for comparison
        total_cost = expense.amount

        # Query CardData for matching records
        matching_card_data = CardData.objects.filter(
            date=expense.date,
            amount=total_cost
        ).exclude(
            expense__isnull=False  # Exclude CardData already linked to an Expense
        ).first()

        if matching_card_data:
            # Link the CardData to the Expense
            expense.line_item = matching_card_data
            expense.save()
            self.setExpenseStatus(expense, "Completed")
            # print(f"Matched Expense {expense.id} with CardData {matching_card_data.id}. Status set to Complete.")
        else:
            # print(f"No matching CardData found for Expense {expense.id}.")
            pass
        


    def getImage(self, url):
        ## Download image or pdf from url
        if url == None or url.startswith("/"):
            return None

        try:
            response = requests.get(url)
            response.raise_for_status()  # Raise an error for bad status codes
            image = Image.open(BytesIO(response.content))
            return image
        except requests.exceptions.RequestException as e:
            # print(f"Error downloading image: {e}")
            return None
        except Exception as e:
            # print(f"Error processing image: {e}")
            return None
        
    def getTextFromImage(self, image):
        return pytesseract.image_to_string(image)
    
    def extractDataFromText(self, text):
        date_pattern = re.compile(r'\d{2}[/.,-]\d{2}[/.,-]\d{4}')
        cost_pattern = re.compile(r'[\£\$\€]\d+(?:\.\d{2})?')
        address_keywords = ["ROAD", "AVENUE", "CRESCENT", "DRIVE", "LANE", "STREET", "COURT", "HIGHWAY"]
        currency_abrvs = ["GBP", "AUD"]

        date, amounts, currency, location = "", [], "", ""

        for line in text.splitlines():
            if match := date_pattern.search(line):
                date = match.group()
            if match := cost_pattern.search(line):
                amounts.append(match.group())
            if any(entry in line.upper() for entry in address_keywords):
                location = line.strip()
            if any(symbol in line for symbol in currency_abrvs):
                currency = next(symbol for symbol in currency_abrvs if symbol in line)
            if "£" in line:
                currency = "GBP"
            elif "$" in line:
                currency = "AUD"

        return date, amounts, currency, location
    
    def findHighestAmount(self, amounts):
        return max(map(lambda x: float(x[1:]), amounts)) if amounts else 0
    
    def reformatDate(self, date):
        if not date:
            return ""
        try:
            # Try parsing the date in multiple common formats
            for fmt in ("%d/%m/%Y", "%d-%m-%Y", "%d.%m.%Y", "%m/%d/%Y", "%m-%d-%Y", "%m.%d.%Y"):
                try:
                    parsed_date = datetime.strptime(date, fmt)
                    return parsed_date.strftime("%Y-%m-%d")
                except ValueError:
                    continue
            raise ValueError("Date format not recognized")
        except Exception as e:
            # print(f"Error reformatting date: {e}")
            return ""
    
    def geocodeLocation(self, location, currency):
        geolocator = Nominatim(user_agent="my_geopy_app")
        if currency == "GBP":
            location += ", UK"
        elif currency == "AUD":
            location += ", USA"
        try:
            geo_location = geolocator.geocode(location, timeout=10, language='en')
            return geo_location.address, geo_location.latitude, geo_location.longitude
        except:
            return "not found", None, None
        
    def setExpenseStatus(self, expense, status):
        from expenses.models import Status
        validStatuses = Status.objects.values_list('name', flat=True)
        if status not in validStatuses:
            raise Exception(f"Invalid status: {status}")
        expense.status = Status.objects.filter(name=status).first()
        expense.save()
        # print(f"Expense {expense.id} status set to {status}")
        