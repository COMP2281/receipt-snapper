from rest_framework.viewsets import ModelViewSet
from .models import Expense
from .serializers import ExpenseSerializer

class ExpenseViewSet(ModelViewSet):
    """
    A simple API endpoint for managing expenses.
    """
    queryset = Expense.objects.all()  
    serializer_class = ExpenseSerializer 