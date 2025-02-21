from rest_framework import serializers
from .models import PreviousExpense

class PreviousExpenseSerializer(serializers.ModelSerializer):
  class meta:
        model = PreviousExpense
        fields = ['id', 'purchase_date', 'merchant', 'amount', 'vat_percentage', 'vat_amount', 'total_amount', 'currency', 'receipt_file']
        read_only_fields = ['vat_amount', 'total_amount'] 
