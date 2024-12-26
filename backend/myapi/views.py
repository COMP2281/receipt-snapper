from django.shortcuts import render

from rest_framework.decorators import api_view
from rest_framework.response import Response    #takes in python data and renders ut as json data

from rest_framework.response import Response
from django.http import HttpResponse
from base.models import Item
from .serializers import ItemSerializer

#views

#defines a new API endpoint (returns a JSON response with message hello world)
@api_view(['GET'])
def getData(request):
    items = Item.objects.all()
    serializer = ItemSerializer(items, many=True)
    return Response(serializer.data)
"""
def hello_world(request):
    #return Response({'message': 'Hello, world!'})
    return HttpResponse("Hello, World!")

def index(request):
    return render(request , 'setupTests.js')

"""

@api_view(['POST'])
def addItem(request):
    #Gets data passed from the front end POST request
    serializer = ItemSerializer(data=request.data)
    if serializer.is_valid():       #checks input data is valid
        serializer.save()       #creates item in database
    return Response(serializer.data)

