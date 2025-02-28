from django.test import TestCase
from django.urls import reverse
from export.models import ExpenseReport
import csv
import io

class ExportExpenseReportTest(TestCase):
    #Tests for the CSV Expense Report Export API

    def setUp(self):
        ExpenseReport.objects.create(
            line=1, date="2024-10-15", category="Travel - Meal Costs - [All Groups]",
            description="Food before the flight", detail="", company_paid="Checked",
            currency_code="GBP", amount=4.25, payment_exchange_rate=0, payment_amount=4.25,
            exchange_override=None, expense_location="GB", total_tax_amount=0, net_amount=4.25,
            project_code="R.12345", project_name="Amazing project number 12345"
        )
        ExpenseReport.objects.create(
            line=2, date="2024-10-16", category="Travel - Rail Travel - [All Groups]",
            description="Train to Darlington", detail="", company_paid="Checked",
            currency_code="GBP", amount=7.14, payment_exchange_rate=0, payment_amount=7.14,
            exchange_override=None, expense_location="GB", total_tax_amount=0, net_amount=7.14,
            project_code="R.54321", project_name="A less amazing project 54321"
        )

    def test_export_csv(self):
        response = self.client.get('/api/export/expenses/')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response['Content-Type'], 'text/csv')

        # Read CSV content
        csv_content = response.content.decode('utf-8')
        csv_reader = csv.reader(io.StringIO(csv_content))
        rows = list(csv_reader)

        # Check headers
        expected_headers = ["line", "date", "category", "description", "detail", "company_paid",
                            "currency_code", "amount", "payment_exchange_rate", "payment_amount",
                            "exchange_override", "expense_location", "total_tax_amount", "net_amount",
                            "project_code", "project_name"]
        self.assertEqual(rows[0], expected_headers)

        # Check data
        self.assertIn(["1", "2024-10-15", "Travel - Meal Costs - [All Groups]", "Food before the flight", "", "Checked",
                    "GBP", "4.25", "0.00000", "4.25", "", "GB", "0.00", "4.25", "R.12345", "Amazing project number 12345"], rows)

        self.assertIn(["2", "2024-10-16", "Travel - Rail Travel - [All Groups]", "Train to Darlington", "", "Checked",
                    "GBP", "7.14", "0.00000", "7.14", "", "GB", "0.00", "7.14", "R.54321", "A less amazing project 54321"], rows)

