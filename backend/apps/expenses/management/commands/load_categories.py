from django.core.management.base import BaseCommand
from expenses.models import Category

class Command(BaseCommand):
    help = 'Load categories from categories.txt'

    def handle(self, *args, **kwargs):
        with open('categories.txt', 'r', encoding='utf-8') as categories_file:
            categories = categories_file.readlines()

        for category in categories:
            category = category.strip()
            if category[0] == '#':
                continue
            Category.objects.get_or_create(name=category)

        self.stdout.write(self.style.SUCCESS('Successfully loaded categories'))