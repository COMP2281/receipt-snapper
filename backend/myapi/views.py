from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.http import HttpResponse


#views

#defines a new API endpoint (returns a JSON response with message hello world)
@api_view(['GET'])
def hello_world(request):
    #return Response({'message': 'Hello, world!'})
    return HttpResponse("Hello, World!")

def index(request):
    return render(request, 'setupTests.js')