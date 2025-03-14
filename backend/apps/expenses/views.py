from django.shortcuts import render
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated

from .models import Expense, Category, Project, Status
from card_data.models import Currency, Location

from datetime import datetime

from django.core.exceptions import ObjectDoesNotExist


# Create your views here.


class ListExpensesView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        """
        Retrieve a list of expenses for the authenticated user.
        """
        expenses = Expense.objects.filter(user=request.user)
        expenses_data = [{
            "id": expense.id,
            "date": expense.date,
            "description": expense.description,
            "category": expense.category.name if expense.category else None,
            "amount": expense.amount,
            "currency": expense.currency_code.code if expense.currency_code else None,
            "status": expense.status.name,
            "project": expense.project.name if expense.project else None,
            "link": f"/api/v1/expense/{expense.id}"
        } for expense in expenses]
        return Response(expenses_data, status=status.HTTP_200_OK)


class ExpenseInfoView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, expense_id):
        # check if belongs to current user
        expense = Expense.objects.get(id=expense_id)
        if expense.user != request.user and not request.user.is_staff:
            return Response({"message": "You are not authorized to view this expense"}, status=status.HTTP_403_FORBIDDEN)
        
        expense_data = {
            "id": expense.id,
            "date": expense.date,
            "description": expense.description,
            "category": expense.category.name if expense.category else None,
            "amount": expense.amount,
            "currency": expense.currency_code.code if expense.currency_code else None,
            "status": expense.status.name,
            "project": expense.project.name if expense.project else None,
            "location": expense.location_code.name if expense.location_code else None,
            "line_item": expense.line_item.name if expense.line_item else None,
            "image_url": expense.image_url
        }

        return Response(expense_data, status=status.HTTP_200_OK)
    
class CreateExpenseView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        # create expense
        # the data given is going to be:
        # date, location code, category (id or if name is provided with no existing category make a new one), description, amount, currency code, project number (and if this number doesnt exist make a new one)

        data = request.data
        category = None
        project = None

        # Validate required fields
        required_fields = ['date', 'location_code', 'description', 'amount', 'currency_code']
        for field in required_fields:
            if field not in data:
                return Response({"error": f"'{field}' is required."}, status=status.HTTP_400_BAD_REQUEST)

        # Validate amount
        try:
            amount = int(data.get('amount'))
        except (TypeError, ValueError):
            return Response({"error": "'amount' must be an integer representing pennies."}, status=status.HTTP_400_BAD_REQUEST)

        # Validate date
        try:
            date = data.get('date')
            # Assuming date is in 'YYYY-MM-DD' format
            datetime.strptime(date, '%Y-%m-%d')
        except (TypeError, ValueError):
            return Response({"error": "'date' must be in 'YYYY-MM-DD' format."}, status=status.HTTP_400_BAD_REQUEST)

        if 'category_id' in data:
            category_id = data.get('category_id')
            category, created = Category.objects.get(id=category_id)
        else:
            category_name = data.get('category_name')
            category, created = Category.objects.get_or_create(name=category_name)
        
        if 'project_id' in data:
            project_id = data.get('project_id')
            project, created = Project.objects.get(id=project_id)
        else:
            project_name = data.get('project_name')
            project, created = Project.objects.get_or_create(name=project_name)
        
        try: 
            expense = Expense.objects.create(
                user=request.user,
                date=date,
                location_code=data.get('location_code'),
                category=category,
                description=data.get('description'),
                amount=amount,
                currency_code=data.get('currency_code'),
                project=project,
                image_url=data.get('image_url'),
                status="Waiting"
            )
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

        return Response({"expense_id": expense.id}, status=status.HTTP_201_CREATED)

class UpdateExpenseView(APIView):
    permission_classes = [IsAuthenticated]

    def put(self, request, expense_id):
        data = request.data
        print(data)
        print(data.get('date'))
        try:
            expense = Expense.objects.get(id=expense_id)
        except ObjectDoesNotExist:
            return Response({"error": "Expense not found."}, status=status.HTTP_404_NOT_FOUND)

        if expense.user != request.user and not request.user.is_staff:
            return Response({"message": "You are not authorized to update this expense"}, status=status.HTTP_403_FORBIDDEN)
        
        # Update fields
        if 'date' in data and data.get('date') != '':
            
            try:
                date = data.get('date')
                datetime.strptime(date, '%Y-%m-%d')
                expense.date = date
            except (TypeError, ValueError):
                return Response({"error": "'date' must be in 'YYYY-MM-DD' format."}, status=status.HTTP_400_BAD_REQUEST)
        
        if 'location_code' in data and data.get('location_code') != '':
            try:
                location_code = Location.objects.get(id=data.get('location_code'))
                expense.location_code = location_code
            except Location.DoesNotExist:
                return Response({"error": "Location code not found."}, status=status.HTTP_404_NOT_FOUND)
        
        if 'description' in data and data.get('description') != '':
            expense.description = data.get('description')
        if 'amount' in data and data.get('amount') != '':
            try:
                amount = int(data.get('amount'))
                expense.amount = amount
            except (TypeError, ValueError):
                return Response({"error": "'amount' must be an integer representing pennies."}, status=status.HTTP_400_BAD_REQUEST)
        
        if 'currency_code' in data and data.get('currency_code') != '':
            try:
                currency_code = Currency.objects.get(code=data.get('currency_code'))
                expense.currency_code = currency_code
            except Currency.DoesNotExist:
                return Response({"error": "Currency code not found."}, status=status.HTTP_404_NOT_FOUND)

        if 'category_id' in data and data.get('category_id') != '':
            try:
                category = Category.objects.get(id=data.get('category_id'))
                expense.category = category
            except Category.DoesNotExist:
                return Response({"error": "Category not found."}, status=status.HTTP_404_NOT_FOUND)

        if 'project_id' in data and data.get('project_id') != '':
            try:
                project = Project.objects.get(id=data.get('project_id'))
                expense.project = project
            except Project.DoesNotExist:
                return Response({"error": "Project not found."}, status=status.HTTP_404_NOT_FOUND)

        expense.save()
        return Response({"message": f"Expense with id {expense_id} updated successfully."}, status=status.HTTP_200_OK)
    
class DeleteExpenseView(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request, expense_id):
        try:
            expense = Expense.objects.get(id=expense_id)
        except ObjectDoesNotExist:
            return Response({"error": "Expense not found."}, status=status.HTTP_404_NOT_FOUND)

        if expense.user != request.user and not request.user.is_staff:
            return Response({"message": "You are not authorized to delete this expense"}, status=status.HTTP_403_FORBIDDEN)

        expense.delete()
        return Response({"message": f"Expense with id {expense_id} deleted successfully."}, status=status.HTTP_204_NO_CONTENT)
