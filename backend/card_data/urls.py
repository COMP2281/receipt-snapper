from django.urls import path
from . import views  # Import views from the current app

urlpatterns = [
    path('upload/', views.upload_data, name='upload'),
    ]