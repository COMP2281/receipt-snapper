from django import forms
from .models import Expense 

class ExpenseForm(forms.ModelForm):
    class Meta:
        model = Expense
        fields = ['purchase_date', 'merchant', 'currency', 'amount', 'receipt_file']