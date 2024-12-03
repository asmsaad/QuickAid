from rest_framework import serializers
from .models import all_requests

class AllRequestsSerializer(serializers.ModelSerializer):
    class Meta:
        model = all_requests
        fields = '__all__'  
