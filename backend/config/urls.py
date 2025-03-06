"""
URL configuration for backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
#from django.http import HttpResponse
from django.contrib import admin
from django.urls import path, include
from manual_inputs import views

#def root_view(request):
#    return HttpResponse("Root test")

urlpatterns = [
    #path('', views.index),     #root link to react
    #path('', root_view, name='root'),  #root
    path('admin/', admin.site.urls),    #admin url
    path('', include('myapi.urls')), #api url
    #path('', include('myapi.urls')),
    path('login_system/', include('login_system.urls')),
    path('api/manual/', include('manual_inputs.urls')),
    path('api/export/', include('export.urls')),  
    path('upload/', include('upload.urls')),  
]


