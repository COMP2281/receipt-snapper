from django import forms
from .models import Expense

class ExpenseForm(forms.ModelForm):
    class Meta:
        model = Expense
        fields = ['purchase_date', 'merchant', 'amount', 'currency', 'receipt_file']
        widgets = {
            'purchase_date': forms.DateInput(attrs={'type': 'date'}), 
        }
