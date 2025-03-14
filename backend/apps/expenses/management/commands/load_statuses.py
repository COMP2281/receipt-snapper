from django.core.management.base import BaseCommand
from expenses.models import Status

class Command(BaseCommand):
    help = 'Load statuses into database'

    def handle(self, *args, **kwargs):
        statuses = ['Completed', 'Waiting', 'Processing', 'Queued', 'Failed']
        for status in statuses:
            Status.objects.get_or_create(name=status)
        self.stdout.write(self.style.SUCCESS('Successfully loaded statuses'))