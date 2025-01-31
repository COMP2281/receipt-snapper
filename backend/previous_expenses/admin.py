from django.contrib import admin
from .models import PreviousExpense

# Register your models here.
@admin.register(PreviousExpense)
class PreviousExpenseAdmin(admin.ModelAdmin):
    list_display = ('purchase_date', 'merchant', 'amount', 'vat_percentage', 'vat_amount', 'total_amount', 'currency')
    list_filter = ('purchase_date', 'currency', 'vat_percentage')
    search_fields = ('merchant', 'currency')
    ordering = ('-purchase_date',)
    readonly_fields = ('vat_amount', 'total_amount')

    def get_queryset(self, request):
        qs = super().get_queryset(request)
        return qs.filter(purchase_date__lt=now().date())
