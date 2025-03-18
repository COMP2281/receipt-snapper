from django.urls import path
from .views import UploadBlobView, UploadBlobAndCreateExpenseView, UploadBlobAndUpdateExpense

urlpatterns = [
    path('', UploadBlobView.as_view(), name='upload_blob'),
    path('newExpense', UploadBlobAndCreateExpenseView.as_view(), name='new_expense'),
    path('updateExpense', UploadBlobAndUpdateExpense.as_view(), name='update_expense')
]