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
            "category_name": expense.category.name if expense.category else None,
            "category_id": expense.category.id if expense.category else None,
            "amount": expense.amount,
            "currency": expense.currency_code.code if expense.currency_code else None,
            "status": expense.status.name,
            "projectNumber": expense.project.id if expense.project else None,
            "projectName": expense.project.name if expense.project else None,
            "location": expense.location_code.name if expense.location_code else None,
            "line_item": expense.line_item.name if expense.line_item else None,
            "image_url": expense.image_url
        }

        return Response(expense_data, status=status.HTTP_200_OK)
    
class CreateExpenseView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        # create a blank expense and return the ID

        expense = Expense.objects.create(
            user=request.user,
            status=Status.objects.get(name='Waiting')
        )

        return Response({"expense_id": expense.id}, status=status.HTTP_201_CREATED)

class UpdateExpenseView(APIView):
    permission_classes = [IsAuthenticated]

    def put(self, request, expense_id):
        data = request.data
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
        
        if 'currency' in data and data.get('currency_code') != '':
            try:
                currency_code = Currency.objects.get(code=data.get('currency'))
                expense.currency_code = currency_code
            except Currency.DoesNotExist:
                return Response({"error": "Currency code not found."}, status=status.HTTP_404_NOT_FOUND)

        if 'category' in data and data.get('category') != '':
            try:
                category = Category.objects.get(id=data.get('category'))
                expense.category = category
            except Category.DoesNotExist:
                return Response({"error": "Category not found."}, status=status.HTTP_404_NOT_FOUND)

        if 'projectNumber' in data and data.get('projectNumber') != '':
            try:
                project = Project.objects.get(id=data.get('projectNumber'))
                expense.project = project
            except Project.DoesNotExist:
                try:
                    project = Project.objects.create(id=data.get('projectNumber'), name=data.get('projectName'))
                    expense.project = project
                except Exception as e:
                    return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

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

class GetCategoriesView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        categories = Category.objects.all()
        categories_data = [{"id": category.id, "name": category.name} for category in categories]
        return Response(categories_data, status=status.HTTP_200_OK)
    
class ListProjectsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        projects = Project.objects.all()
        projects_data = [{"id": project.id, "name": project.name} for project in projects]
        return Response(projects_data, status=status.HTTP_200_OK)
    
class ProjectInfoView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, project_id):
        try:
            project = Project.objects.get(id=project_id)
        except ObjectDoesNotExist:
            return Response({"error": "Project not found."}, status=status.HTTP_404_NOT_FOUND)
        
        project_data = {
            "id": project.id,
            "name": project.name
        }
        return Response(project_data, status=status.HTTP_200_OK)