from django.urls import path
from . import views
from django.http import HttpResponse


#def api_root(request):
#    return HttpResponse("api test")

#defines new URL pattern that maps hallo_world function in views.py
urlpatterns = [
    #path('', api_root, name='api_root'),  #default
    #path('hello-world/', views.hello_world, name='hello_world'),    #new page test
    #path('index/', views.index, name="index"),
    path('', views.getData),
    path('add/', views.addItem)
]