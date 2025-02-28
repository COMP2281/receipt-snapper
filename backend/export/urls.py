from django.urls import path
from .views import ExportExpense  

urlpatterns = [
    path('expenses/', ExportExpense.as_view(), name='export-expenses'), 
]
