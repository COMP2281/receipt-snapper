from django.urls import path
from .views import ListExpensesView, ExpenseInfoView, CreateExpenseView, UpdateExpenseView, DeleteExpenseView

urlpatterns = [
    path('', ListExpensesView.as_view(), name='list'),
    path('<int:expense_id>', ExpenseInfoView.as_view(), name='info'),
    path('create', CreateExpenseView.as_view(), name='create'),
    path('<int:expense_id>/update', UpdateExpenseView.as_view(), name='update'),
    path('<int:expense_id>/delete', DeleteExpenseView.as_view(), name='delete'),
]