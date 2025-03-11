from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils.crypto import get_random_string

class User(AbstractUser):
    card_no = models.CharField(max_length=16, blank=True, null=True)
    groups = models.ManyToManyField('auth.Group', related_name='users', related_query_name='user', blank=True)
    user_permissions = models.ManyToManyField('auth.Permission', related_name='users', related_query_name='user', blank=True)
    username = models.CharField(max_length=150, unique=True, blank=True, null=True, default="temp_username")

    def save(self, *args, **kwargs):
        if self.username == "temp_username" or not self.username:
            while True:
                username = f'user_{get_random_string(8)}'
                if not User.objects.filter(username=username).exists():
                    self.username = username
                    break
        super().save(*args, **kwargs)