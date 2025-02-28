from django.http import HttpResponse
import pandas as pd
from rest_framework.views import APIView
from .models import ExpenseReport

class ExportExpense(APIView):
    def get(self, request, *args, **kwargs):
        queryset = ExpenseReport.objects.all()

        data = list(queryset.values(
            'line', 'date', 'category', 'description', 'detail', 'company_paid',
            'currency_code', 'amount', 'payment_exchange_rate', 'payment_amount',
            'exchange_override', 'expense_location', 'total_tax_amount', 'net_amount',
            'project_code', 'project_name'
        ))
        df = pd.DataFrame(data)

        response = HttpResponse(content_type='text/csv')
        response['Content-Disposition'] = 'attachment; filename=expense_report.csv'
        df.to_csv(response, index=False, float_format='%.5f') 
        return response
