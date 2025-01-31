from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from rest_framework.decorators import action
from rest_framework.response import Response
from django.utils.timezone import now
from .models import Expense
from .serializers import ExpenseSerializer

# Create your views here.
class ExpenseViewSet(ModelViewSet):
    queryset = Expense.objects.all()
    serializer_class = ExpenseSerializer
    @action(detail=False, methods=['get'])
    def previous_expenses(self, request):
        previous_expenses = self.get_queryset().filter(purchase_date__lt=now().date())
        serializer = self.get_serializer(previous_expenses, many=True)
        return Response(serializer.data)
