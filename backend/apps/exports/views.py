from django.shortcuts import render
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated

from expenses.models import Expense  # Adjusted the import path for Expense
from card_data.models import Currency, Location

from datetime import datetime

from django.core.exceptions import ObjectDoesNotExist
import csv
from django.http import HttpResponse

# Create your views here.


class ExportExpensesView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        from_date = request.query_params.get('from')
        to_date = request.query_params.get('to')

        try:
            from_date = datetime.strptime(from_date, '%Y-%m-%d').date()
            to_date = datetime.strptime(to_date, '%Y-%m-%d').date()
        except (ValueError, TypeError):
            return Response({'error': 'Invalid date format. Use YYYY-MM-DD.'}, status=status.HTTP_400_BAD_REQUEST)

        expenses = Expense.objects.filter(date__range=(from_date, to_date), user=request.user)

        response = HttpResponse(content_type='text/csv')
        response['Content-Disposition'] = f'attachment; filename="export_{from_date}_to_{to_date}.csv"'

        writer = csv.writer(response)
        writer.writerow([
            'Line', 'Date', 'Category', 'Description', 'Detail', 'Currency Code', 'Amount',
            'Payment Exchange Rate', 'Payment Amount', 'Exchange Override', 'Expense Location',
            'Total Tax Amount', 'Net Amount', 'Project', 'Project Name'
        ])

        for idx, expense in enumerate(expenses, start=1):
            writer.writerow([
                idx,
                expense.date,
                expense.category.name if expense.category else '',
                expense.description,
                '',  # Detail is not present in the model
                expense.currency_code.code if expense.currency_code else '',
                f"{expense.amount / 100:.2f}",  # Convert pennies to pounds and pence
                0,  # Payment Exchange Rate is not present in the model
                f"{expense.amount / 100:.2f}",  # Assuming Payment Amount is the same as Amount
                'None',  # Exchange Override is not present in the model


                # expense.location_code.code if expense.location_code else '',
                # TODO: FIX PROPERLY
                'GB' if expense.currency_code.code == 'GBP' else 'AU' if expense.currency_code.code == 'AUD' else '',



                f"{(expense.amount / 100)*.2:.2f}"
                f"{expense.amount / 100:.2f}",  # Assuming Net Amount is the same as Amount
                expense.project.id if expense.project else '',
                expense.project.name if expense.project else ''
        ])


        return response