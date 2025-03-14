from django.db import models

# Create your models here.
class Currency(models.Model):
    code = models.CharField(max_length=3, primary_key=True)
<<<<<<< HEAD
    objects = models.Manager()

class Location(models.Model):
    code = models.CharField(max_length=10, primary_key=True)
    
    objects = models.Manager()
=======

class Location(models.Model):
    code = models.CharField(max_length=10, primary_key=True)
>>>>>>> b4aecccb77a27effc4eea8436e51d5f57217a08c

class CardData(models.Model):
    date = models.DateField()
    currency_code = models.ForeignKey(Currency, on_delete=models.CASCADE)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    payment_exchange_rate = models.DecimalField(max_digits=10, decimal_places=6)
    payment_amount = models.DecimalField(max_digits=10, decimal_places=2)
    exchange_override = models.CharField(max_length=50)
<<<<<<< HEAD
    location_code = models.ForeignKey(Location, on_delete=models.CASCADE)

    objects = models.Manager()
=======
    location_code = models.ForeignKey(Location, on_delete=models.CASCADE)
>>>>>>> b4aecccb77a27effc4eea8436e51d5f57217a08c
