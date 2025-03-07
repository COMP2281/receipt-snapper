from django.shortcuts import render
from .models import Blob
from azure.storage.blob import BlobServiceClient, ContainerClient
from .serializers import BlobSerializer
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view
import os
from dotenv import load_dotenv

#Connecting to Azura Storage

load_dotenv()
connect_str = os.getenv("AZURE_STORAGE_CONNECTION_STRING")

if not connect_str:
    raise ValueError("Azure Storage connection string is not set in environment variables.")


blob_service_client = BlobServiceClient.from_connection_string(connect_str) 

#Container to store images
container_name="reciepts"
container_client = blob_service_client.get_container_client(container_name)
print(container_client)

@api_view(['POST'])
def upload_blob(request):
    if 'image' not in request.FILES:
        return Response({"error": "No image file found"}, status=status.HTTP_400_BAD_REQUEST)
    print("me when i post")
    image = request.FILES['image']
    blob_name = image.name
    print(blob_name)
    try:
        # Uploads to Azura
        blob_client = container_client.upload_blob(name=image.name, data=image)

        print("uploaded")
        # Generates the unique URL

        blob_url = f"https://{blob_service_client.account_name}.blob.core.windows.net/%7Bcontainer_name%7D/%7Bblob_name%7D"
        # Saves metadata to db
        blob_instance = Blob.objects

        return Response({
            "message": "Image uploaded successfully",
            "blob_name": blob_name,
            "blob_url": blob_url
        }, status=status.HTTP_201_CREATED)
    except Exception as e:
        print("me when i error")
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
