from django.shortcuts import render
from azure.storage.blob import BlobServiceClient, ContainerClient
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import APIView
import os
from dotenv import load_dotenv
from rest_framework.permissions import IsAuthenticated
import uuid
from datetime import datetime

#Connecting to Azura Storage

load_dotenv()
connect_str = os.getenv("AZURE_STORAGE_CONNECTION_STRING")

if not connect_str:
    raise ValueError("Azure Storage connection string is not set in environment variables.")


blob_service_client = BlobServiceClient.from_connection_string(connect_str) 

#Container to store images
container_name="receipts"
container_client = blob_service_client.get_container_client(container_name)
print(container_client)

class UploadBlobView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        if 'image' not in request.FILES:
            return Response({"error": "No image file found"}, status=status.HTTP_400_BAD_REQUEST)
        image = request.FILES['image']

        image_name = image.name
        image_extension = image_name.split(".")[-1]
        image_extension = image_extension.lower()
        if image_extension == "jpeg":
            image_extension = "jpg"

        if image_extension not in ["jpg", "png", "gif", "bmp", "heic", "webp", "pdf"]:
            return Response({"error": "Invalid image format"}, status=status.HTTP_400_BAD_REQUEST),

        image.name = f"{image_name.split('.')[0]}.{image_extension}"

        current_time = datetime.now().strftime("%Y%m%d%H%M%S")
        blob_name = f"{uuid.uuid4()}-{current_time}-{image.name}"
        
        print(blob_name)
        try:
            # Uploads to Azure and let Azure assign a unique name
            blob_client = container_client.upload_blob(data=image, name=blob_name)

            print(blob_client)

            # Get the assigned name
            unique_blob_name = blob_client.blob_name

            print("uploaded")
            # Generates the unique URL
            blob_url = f"https://{blob_service_client.account_name}.blob.core.windows.net/{container_name}/{unique_blob_name}"
            # Saves metadata to db

            return Response({
                "message": "Image uploaded successfully",
                "blob_name": blob_name,
                "blob_url": blob_url
            }, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)