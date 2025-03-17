from django.urls import path
from .views import LoginView, LogoutView, InfoView

urlpatterns = [
    path('login', LoginView.as_view(), name='login'),
    path('logout', LogoutView.as_view(), name='logout'),
    path('info', InfoView.as_view(), name='user-info'),
]
