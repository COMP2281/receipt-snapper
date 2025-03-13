from django.db import models
from card_data.models import Currency, Location, CardData
from users.models import User

# Create your models here.
class Category(models.Model):
    name = models.CharField(max_length=100, unique=True)
    objects = models.Manager()


class Project(models.Model):
    id = models.CharField(max_length=50, primary_key=True)
    name = models.CharField(max_length=100)
    objects = models.Manager()

class Status(models.Model):
    name = models.CharField(max_length=50, primary_key=True)

class Expense(models.Model):
    date = models.DateField()
    description = models.TextField(null=True, blank=True)
    company_paid = models.CharField(max_length=50, null=True, blank=True)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    currency_code = models.ForeignKey(Currency, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True, blank=True)
    location_code = models.ForeignKey(Location, on_delete=models.CASCADE)
    line_item = models.ForeignKey(CardData, on_delete=models.SET_NULL, null=True, blank=True)
    project = models.ForeignKey(Project, on_delete=models.SET_NULL, null=True, blank=True)
    status = models.ForeignKey(Status, on_delete=models.CASCADE)

    objects = models.Manager()