from django.urls import path
<<<<<<< HEAD
from .views import UploadBlobView, UploadBlobAndCreateExpenseView

urlpatterns = [
    path('', UploadBlobView.as_view(), name='upload_blob'),
    path('/newExpense', UploadBlobAndCreateExpenseView.as_view(), name='new_expense'),
=======
from .views import UploadBlobView

urlpatterns = [
    path('', UploadBlobView.as_view(), name='upload_blob'),
>>>>>>> b4aecccb77a27effc4eea8436e51d5f57217a08c
]