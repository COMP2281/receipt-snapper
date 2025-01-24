from django.shortcuts import render
from .forms import ExpenseForm

def manual_input(request):
    form = ExpenseForm()
    if request.method == 'POST':
        form = ExpenseForm(request.POST, request.FILES)
        if form.is_valid():
            form.save()
            return render(request, 'manual_input/success.html') #Doesn't exist yet (page can be anything or back to main menu or whatever when added; for now it takes you to an nonexistent page called success so you know its working)
        
    print(form)
    return render(request, 'manual_input/manual_input.html', {'form': form})