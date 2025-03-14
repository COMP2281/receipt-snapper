from django.core.management.base import BaseCommand
from card_data.models import Currency, Location

class Command(BaseCommand):
    help = 'Load currencies and Locations into database'

    def handle(self, *args, **kwargs):
        currencies = ['GBP', 'AUD']
        for currency in currencies:
            Currency.objects.get_or_create(code=currency)
        self.stdout.write(self.style.SUCCESS('Successfully loaded currencies'))

        locations = ['GB', 'AU']
        for location in locations:
            Location.objects.get_or_create(code=location)   
        self.stdout.write(self.style.SUCCESS('Successfully loaded locations'))