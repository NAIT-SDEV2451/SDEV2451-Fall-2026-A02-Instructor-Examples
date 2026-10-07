from django.urls import path
from rest_framework_simplejwt.views import (
    TokenObtainPairView,  # login view to get both tokens
    TokenRefreshView,  # refresh the access token
)

from core.views import MeView, UserRegistrationView

urlpatterns = [
    path("register/", UserRegistrationView.as_view(), name="auth-register"),
]
