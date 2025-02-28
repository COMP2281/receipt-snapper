from django.db import models

class ExpenseReport(models.Model):
    line = models.IntegerField()
    date = models.DateField()
    category = models.CharField(max_length=255)
    description = models.TextField()
    detail = models.TextField(blank=True, null=True)
    company_paid = models.CharField(max_length=10, choices=[('Checked', 'Checked'), ('Unchecked', 'Unchecked')])
    currency_code = models.CharField(max_length=10)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    payment_exchange_rate = models.DecimalField(max_digits=10, decimal_places=5, default=0)
    payment_amount = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    exchange_override = models.CharField(max_length=20, blank=True, null=True)
    expense_location = models.CharField(max_length=50)
    total_tax_amount = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    net_amount = models.DecimalField(max_digits=10, decimal_places=2)
    project_code = models.CharField(max_length=20)
    project_name = models.CharField(max_length=255)

    def __str__(self):
        return f"{self.project_code} - {self.description}"
