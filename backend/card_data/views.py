from rest_framework.response import Response
from .models import LineItem
from rest_framework import status
from rest_framework.exceptions import AuthenticationFailed
from .serializers import ItemSerializer
from django.contrib.auth import authenticate
from django.contrib.auth import logout
from django.contrib.auth import login
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated

# Create your views here.
#Line,Date,Category,Description,Detail,Company Paid,Currency Code,Amount,Payment Exchange Rate,Payment Amount,Exchange Override,Expense Location,Total Tax Amount,Net Amount, Project, Project Name
#Views
@api_view(['POST'])
def upload_data(request):
    serializer = ItemSerializer(data=request.data)
    if serializer.is_valid():       #checks input data is valid
        serializer.save()       #creates item in database
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

