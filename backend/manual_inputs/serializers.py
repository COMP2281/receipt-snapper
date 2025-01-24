from rest_framework import serializers
from .models import Expense

class ExpenseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Expense
        fields = ['id', 'purchase_date', 'merchant', 'amount', 'vat_percentage', 'vat_amount', 'total_amount', 'currency', 'receipt_file']
        read_only_fields = ['vat_amount', 'total_amount']  # Calculated fields
