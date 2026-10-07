# create a registration endpoint

from django.contrib.auth import get_user_model

# this getst the AUTH_USER_MODEL from settings.
from django.contrib.auth.hashers import make_password
from rest_framework import serializers

CustomUser = get_user_model()


class UserRegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=8)

    class Meta:
        model = CustomUser
        fields = ["username", "email", "password", "role"]
        extra_kwargs = {
            "email": {"required": True},
            "role": {"required": True},
        }

    # validate and make a password
    def validate_password(self, value):
        # over here you could add more validation
        return make_password(value)

    # this is going to be called on save
    def create(self, validated_data):
        return CustomUser.objects.create(**validated_data)
