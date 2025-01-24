from django.urls import path
from . import views  # Import views from the current app

urlpatterns = [
    #path('', views.index, name='index'), 
    #path('login/', views.login_view, name='login'),
    path('users/', views.user_list, name='user-list'),
    path('login/', views.login_user, name='user-login')
]