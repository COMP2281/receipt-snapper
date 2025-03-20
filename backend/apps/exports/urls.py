from django.urls import path
from .views import ExportExpensesView

urlpatterns = [
    # Add your URL patterns here
    path ('', ExportExpensesView.as_view(), name='export_csv'),
]