from rest_framework import status
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from .serializers import UserRegistrationSerializer


# registration view
class UserRegistrationView(APIView):
    permission_classes = (AllowAny,)

    def post(self, request)


# give the infromation
