# card_data/models.py
from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()

class Card(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    card_number = models.CharField(max_length=16)  # Store only numbers (card number)
    card_type = models.CharField(max_length=50)  # e.g., Visa, MasterCard
    expiration_date = models.DateField()

    def __str__(self):
        return f"Card {self.id} - {self.card_type}"
