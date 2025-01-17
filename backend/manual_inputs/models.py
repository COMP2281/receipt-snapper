from django.db import models

class Expense(models.Model):
    purchase_date = models.DateField()
    merchant = models.CharField(max_length=255)
    currency = models.CharField(max_length=10)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    receipt_file = models.FileField(upload_to='receipts/')

    def __str__(self):
        return f"{self.merchant} - {self.amount} {self.currency}" 

