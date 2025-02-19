from rest_framework.response import Response
from .models import User
from .serializers import UserSerializer
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.exceptions import AuthenticationFailed
from django.contrib.auth import authenticate
from django.contrib.auth import logout
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated


#Views
@api_view(['POST'])
def login_user(request):
    username = request.data.get('username')
    password = request.data.get('password')

    if not username or not password:
        return Response({"detail": "Username and password are required."}, status=status.HTTP_400_BAD_REQUEST)

    user = authenticate(request, username=username, password=password)

    if user is not None:
        return Response({"detail": "Login successful."}, status=status.HTTP_200_OK)
    else:
        raise AuthenticationFailed("Invalid credentials")

@api_view(['POST'])
def logout_user(request):
    logout(request)
    return Response({"detail": "Logout successful."}, status=status.HTTP_200_OK)


"""
lex's dummy guide for future reference:
to test if this authentication works send a post request from this url with a known user e.g.
 username: test1 and password:password is valid since i already added it
 {
  "username": "test1",
  "password": "password"
}

manually adding users in shell with 
python manage.py shell
from django.contrib.auth.models import User
user = User.objects.create_user(username='...', password='...')
user.save()
#check if worked with
User.objects.all()
exit()
"""


@api_view(['GET'])
@permission_classes([IsAuthenticated])  #checks user is already logged in
def user_getinfo(request):
    user = request.user 
    user_data = {
        "id": user.id,
        "username": user.username,
        "email": user.email,
        "first_name": user.first_name,
        "last_name": user.last_name,
    }
    return Response(user_data, status=status.HTTP_200_OK)

@api_view(['GET'])
def user_list(request):
    users = User.objects.all()
    serializer = UserSerializer(users, many=True)
    return Response(serializer.data)
