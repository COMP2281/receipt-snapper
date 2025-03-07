#has to serialize data before rendindering it out

#converts item model instances into data types response objcts can understand

from rest_framework import serializers
from .models import LineItem

class ItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = LineItem
        fields = '__all__'