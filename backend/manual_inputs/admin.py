from django.contrib import admin

# Register your models here.
class ExpenseAdmin(admin.ModelAdmin):
    list_display = ('purchase_date', 'merchant', 'amount', 'currency')