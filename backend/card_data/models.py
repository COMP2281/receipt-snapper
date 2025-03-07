from django.db import models

# Create your models here.
#Line,Date,Category,Description,Detail,Company Paid,Currency Code,Amount,Payment Exchange Rate,Payment Amount,Exchange Override,Expense Location,Total Tax Amount,Net Amount, Project, Project Name
class LineItem(models.Model):
    date = models.DateTimeField(auto_now_add=True)        
    category = models.CharField(max_length=200)                 
    description = models.CharField(max_length=1000)
    detail = models.CharField(max_length=1000)
    company_paid = models.CharField(max_length=200)
    currency_code = models.CharField(max_length=3)        # only ever GBP/AUD for this project
    amount = models.FloatField()
    exchange_rate = models.FloatField()
    location = models.CharField(max_length=200)
    tax_amount = models.FloatField()
    net_amount = models.FloatField()
    project_name = models.CharField(max_length=200)
      
         