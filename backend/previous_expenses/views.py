from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from rest_framework.decorators import action
from rest_framework.response import Response
from django.utils.timezone import now
from .models import PreviousExpense
from .serializers import PreviousExpenseSerializer

# Create your views here.
class PreviousExpenseViewSet(ModelViewSet):
    queryset = PreviousExpense.objects.all()
    serializer_class = PreviousExpenseSerializer
    @action(detail=False, methods=['get'])
    def list_previous_expenses(self, request):
        previous_expenses = self.get_queryset().filter(purchase_date__lt=now().date())
        serializer = self.get_serializer(previous_expenses, many=True)
        return Response(serializer.data)
