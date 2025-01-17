from django.shortcuts import render
from django.http import HttpResponse
from .models import Expense
from .forms import ExpenseForm

def manual_input(request):
    if request.method == 'POST':
        form = ExpenseForm(request.POST, request.FILES)
        if form.is_valid():
            form.save()
            return HttpResponse("Expense saved successfully") # Can be changed to redirect to a possible success page.
    else:
        form = ExpenseForm()
    return render(request, 'manualinputs.html') 