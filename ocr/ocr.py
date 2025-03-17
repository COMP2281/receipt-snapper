from PIL import Image
import pytesseract
import numpy as np
import re
import pandas as pd
import platform
import os
import csv
from geopy.geocoders import Nominatim

def configure_tesseract():
    """Configures Tesseract path for Windows."""
    if platform.system() == "Windows":
        pytesseract.pytesseract.tesseract_cmd = 'C:/Program Files/Tesseract-OCR/tesseract.exe'.replace(os.sep, '/')

def extract_text_from_image(image_path):
    """Extracts text from an image using Tesseract OCR."""
    img = np.array(Image.open(image_path))
    return pytesseract.image_to_string(img)

def save_text_to_file(text, output_file):
    """Saves extracted text to a file."""
    with open(output_file, 'w', encoding='utf-8') as file:
        file.write(text)

def extract_data_from_text(file_path):
    """Extracts date, costs, currency, and location details from OCR text."""
    date_pattern = re.compile(r'\d{2}[/.,-]\d{2}[/.,-]\d{4}')
    cost_pattern = re.compile(r'[\£\$\€]\d+(?:\.\d{2})?')
    address_keywords = ["ROAD", "AVENUE", "CRESCENT", "DRIVE", "LANE", "STREET", "COURT", "HIGHWAY"]
    currency_abrvs = ["GBP", "AUD"]
    
    date, amounts, currency, location = "", [], "", ""
    with open(file_path, "r", encoding='utf-8') as file:
        for line in file:
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

def find_highest_amount(amounts):
    """Finds the highest amount from a list of extracted costs."""
    return max(map(lambda x: float(x[1:]), amounts)) if amounts else 0

def reformat_date(date):
    """Reformats date from extracted format to standardized format."""
    return date.replace(date[2], "/", 2) if date else ""

def geocode_location(location, currency):
    """Finds geographical coordinates for a given location string."""
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

def match_expense_data(formatted_date, total_cost, expense_csv):
    """Matches extracted expense data with an existing expense report."""
    df = pd.read_csv(expense_csv.replace(os.sep, '/'), usecols=["Date", "Amount"])
    matched_rows = df[(df["Date"] == formatted_date) & (df["Amount"] == total_cost)]
    return matched_rows

def write_matched_data_to_csv(matched_rows, output_file):
    """Writes matched expense data to a CSV file."""
    header = ["Index", "Date", "Category", "Description", "Detail", "Company Paid", "Currency Code", "Amount", 
              "Payment Exchange Rate", "Payment Amount", "Exchange Override", "Expense Location", "Total Tax Amount", 
              "Net Amount", "Project", "Project Name"]
    
    with open(output_file, mode='w', newline='', encoding='utf-8') as file:
        writer = csv.writer(file)
        writer.writerow(header)
        for index, row in matched_rows.iterrows():
            category = input("Enter the category for the expense: ")
            description = input("Enter a short description of the expense: ")
            detail = input("Enter any additional details (optional): ")
            total_tax_amount = round(row["Amount"] - row["Amount"] / 1.2, 2)
            net_amount = round(row["Amount"] - total_tax_amount, 2)
            writer.writerow([index, row["Date"], category, description, detail, "None", "", row["Amount"], "None", row["Amount"],
                             "None", row.get("Expense Location", ""), total_tax_amount, net_amount, "Example Project", "Example Project Name"])

def main():
    configure_tesseract()
    image_path = "example_images/image02.png".replace(os.sep, '/')
    text = extract_text_from_image(image_path)
    output_file = "example_ocr_txt/image02.txt".replace(os.sep, '/')
    save_text_to_file(text, output_file)
    
    date, amounts, currency, location = extract_data_from_text(output_file)
    total_cost = find_highest_amount(amounts)
    formatted_date = reformat_date(date)
    
    if location:
        address, lat, lon = geocode_location(location, currency)
        if address == "not found":
            print("Failed to find location")
        else:
            print(address, lat, lon)
    
    if not amounts:
        print("No costs found in the file")
    if not date:
        print("No date found in the file")
    
    print(currency, formatted_date, total_cost)
    
    expense_csv = "example_expenses/ExpenseReport-RawCardDataOnly.csv"
    matched_rows = match_expense_data(formatted_date, total_cost, expense_csv)
    
    if not matched_rows.empty:
        write_matched_data_to_csv(matched_rows, "matched_data.csv")
    else:
        print("No matching expense found.")

if __name__ == "__main__":
    main()
