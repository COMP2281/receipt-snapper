
from django.urls import path
from . import views 
urlpatterns = [
    path('upload-image/', views.upload_blob, name='upload_image'),
]