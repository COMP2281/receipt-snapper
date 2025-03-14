from django.urls import path
from .views import ListExpensesView, ExpenseInfoView, CreateExpenseView, UpdateExpenseView, DeleteExpenseView

urlpatterns = [
    path('', ListExpensesView.as_view(), name='list'),
    path('<int:expense_id>', ExpenseInfoView.as_view(), name='info'),
    path('create', CreateExpenseView.as_view(), name='create'),
<<<<<<< HEAD
    path('<int:expense_id>/update', UpdateExpenseView.as_view(), name='update'),
    path('<int:expense_id>/delete', DeleteExpenseView.as_view(), name='delete'),
=======
    path('update/<int:expense_id>', UpdateExpenseView.as_view(), name='update'),
    path('delete/<int:expense_id>', DeleteExpenseView.as_view(), name='delete'),
>>>>>>> b4aecccb77a27effc4eea8436e51d5f57217a08c
]