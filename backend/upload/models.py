
from django.db import models

class Blob(models.Model):
    blob_name = models.CharField(max_length=255, unique=True)
    blob_url = models.URLField()
    uploaded_at = models.DateTimeField(auto_now_add=True)