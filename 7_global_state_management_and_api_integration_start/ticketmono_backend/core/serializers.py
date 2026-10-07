# create a registration endpoint

from django.contrib.auth import get_user_model

# this getst the AUTH_USER_MODEL from settings.
from django.contrib.auth.hashers import make_password
from rest_framework import serializers

User = get_user_model()


class UserRegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=8)

    class Meta:
        model = User
        fields = ["username", "email", "password", "role"]
