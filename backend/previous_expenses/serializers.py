from rest_framework import serializers
from .models import PreviousExpense

class PreviousExpenseSerializer(serializers.ModelSerializer):
  class meta:
    
