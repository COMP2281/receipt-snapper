from django.contrib import admin
from .models import Expense  

@admin.register(Expense)
class ExpenseAdmin(admin.ModelAdmin):
    list_display = ('purchase_date', 'merchant', 'amount', 'currency')  
