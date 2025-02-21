from datetime import timedelta
from django.utils.timezone import now
from django.test import TestCase
from .models import PreviousExpense

class PreviousExpensesTest(TestCase):
#old expense
    def test_previous_expenses_filter(self):
        PreviousExpense.objects.create(
            purchase_date=now().date() - timedelta(days=10),  
            merchant="Old Merchant",
            amount=50.00,
            vat_percentage=10.00,
            currency="USD"
        )

#future expense
        PreviousExpense.objects.create(
            purchase_date=now().date() + timedelta(days=5),  
            merchant="Future Merchant",
            amount=75.00,
            vat_percentage=5.00,
            currency="EUR"
        )

        previous_expenses = PreviousExpense.objects.filter(purchase_date__lt=now().date())
        self.assertEqual(previous_expenses.count(), 1)
