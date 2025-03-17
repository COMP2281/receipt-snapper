from django.urls import path
from .views import ListExpensesView, ExpenseInfoView, CreateExpenseView, UpdateExpenseView, DeleteExpenseView, GetCategoriesView, ListProjectsView, ProjectInfoView

urlpatterns = [
    path('', ListExpensesView.as_view(), name='list'),
    path('<int:expense_id>', ExpenseInfoView.as_view(), name='info'),
    path('create', CreateExpenseView.as_view(), name='create'),
    path('<int:expense_id>/update', UpdateExpenseView.as_view(), name='update'),
    path('<int:expense_id>/delete', DeleteExpenseView.as_view(), name='delete'),

    path('categories', GetCategoriesView.as_view(), name='categories'),

    path('project', ListProjectsView.as_view(), name='list_projects'),
    path('project/<str:project_id>', ProjectInfoView.as_view(), name='project_info'),
]