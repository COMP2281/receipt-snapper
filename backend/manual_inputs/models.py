from django.db import models

class Expense(models.Model):
    purchase_date = models.DateField()
    merchant = models.CharField(max_length=255)
    currency = models.CharField(max_length=10)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    vat_percentage = models.DecimalField(max_digits=5, decimal_places=2, default=20.00)  
    vat_amount = models.DecimalField(max_digits=10, decimal_places=2, editable=False, default=0.00)  
    total_amount = models.DecimalField(max_digits=10, decimal_places=2, editable=False, default=0.00)
    receipt_file = models.FileField(upload_to='receipts/')


    def save(self, *args, **kwargs): # This calculates the VAT and the total amount before saving it so both options are available.
        self.vat_amount = (self.amount * self.vat_percentage) / 100
        self.total_amount = self.amount + self.vat_amount
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.merchant} - {self.amount} {self.currency} on {self.purchase_date}"
