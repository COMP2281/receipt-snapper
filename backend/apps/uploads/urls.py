from django.urls import path
from .views import UploadBlobView

urlpatterns = [
    path('', UploadBlobView.as_view(), name='upload_blob'),
]