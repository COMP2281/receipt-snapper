from django.urls import path
from .views import UploadBlobView, UploadBlobAndCreateExpenseView

urlpatterns = [
    path('', UploadBlobView.as_view(), name='upload_blob'),
    path('/newExpense', UploadBlobAndCreateExpenseView.as_view(), name='new_expense'),
]