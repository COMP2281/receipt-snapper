from django.test import TestCase
from manual_inputs.models import Expense


# Create your tests here.
class ExpenseModelTest(TestCase):
    def test_expense_creation(self):
        expense = Expense.objects.create(
            purchase_date="2025-01-01",
            merchant="Test Merchant",
            amount=100.00,
            vat_percentage=20.00,
            currency="USD"
        )
        self.assertEqual(expense.vat_amount, 20.00)
        self.assertEqual(expense.total_amount, 120.00)
