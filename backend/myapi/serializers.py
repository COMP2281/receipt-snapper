#has to serialize data before rendindering it out

#converts item model instances into data types response objcts can understand

from rest_framework import serializers
from base.models import Item

class ItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Item
        fields = '__all__'