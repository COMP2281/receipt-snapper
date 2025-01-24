from django import forms
from .models import Expense

class ExpenseForm(forms.ModelForm):
    class Meta:
        model = Expense
        fields = ['purchase_date', 'merchant', 'amount','vat_percentage', 'currency', 'receipt_file']
        widgets = {
            'purchase_date': forms.DateInput(attrs={'type': 'date'}), 
            'vat_percentage': forms.NumberInput(attrs={'class': 'form-control', 'step': '0.01', 'placeholder': 'Enter VAT (%)'}),
        }

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        for field_name, field in self.fields.items():
            field.widget.attrs['class'] = 'form-control'