from django.shortcuts import render
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated

from .models import CardData, Currency, Location
import csv
from io import StringIO

# Create your views here.

class ListLineItemsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        line_items = CardData.objects.filter(card_no=request.user.card_no)
        line_items_data = [{
            "id": line_item.id,
            "date": line_item.date,
            "amount": line_item.amount,
            "currency": line_item.currency_code.code if line_item.currency_code else None,
            "payment_exchange_rate": line_item.payment_exchange_rate,
            "payment_amount": line_item.payment_amount,
            "exchange_override": line_item.exchange_override,
            "location": line_item.location_code.code if line_item.location_code else None
        } for line_item in line_items]
        line_items_data.sort(key=lambda x: x['date'], reverse=True)
        return Response(line_items_data, status=status.HTTP_200_OK)
    

class UploadCardData(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            file = request.FILES['file']
        except KeyError:
            return Response({"message": "No file found in request"}, status=status.HTTP_400_BAD_REQUEST)
        decoded_file = file.read().decode('utf-8')
        io_string = StringIO(decoded_file)
        reader = csv.DictReader(io_string)
        
        for row in reader:
            currency, created = Currency.objects.get_or_create(code=row['currency_code'])
            location, created = Location.objects.get_or_create(code=row['location_code'])
            try:
                formattedDate = row['date']
                day, month, year = formattedDate.split('/')
                formattedDate = f"{year}-{month}-{day}"
            except ValueError:
                return Response({"message": "Invalid date format"}, status=status.HTTP_400_BAD_REQUEST)
            CardData.objects.create(
                card_no=request.user.card_no,
                date=formattedDate,
                amount=int(float(row['amount']) * 100),  # Convert to integer pennies
                currency_code=currency,
                payment_exchange_rate=row['payment_exchange_rate'],
                payment_amount=int(float(row['payment_amount']) * 100),  # Convert to integer pennies
                exchange_override=row['exchange_override'],
                location_code=location
            )
        
        return Response({"status": "success"}, status=status.HTTP_201_CREATED)