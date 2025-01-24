from django.contrib import admin
from .models import Expense  

@admin.register(Expense)
class ExpenseAdmin(admin.ModelAdmin):
    list_display = ('purchase_date', 'merchant', 'amount', 'vat_percentage', 'vat_amount', 'total_amount', 'currency')  
    list_filter = ('purchase_date', 'currency', 'vat_percentage')  
    search_fields = ('merchant', 'currency')  
    ordering = ('-purchase_date',)
    readonly_fields = ('vat_amount', 'total_amount') #these are Read-Only fields. 