from rest_framework import status
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from .serializers import UserRegistrationSerializer


# registration view
class UserRegistrationView(APIView):
    permission_classes = (AllowAny,)

    def post(self, request):
        serializer = UserRegistrationSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()  # this calls create for new and update for existing instances
            return Response(
                {"message": "user registered successfully"},
                status=status.HTTP_201_CREATED,
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# give the infromation
class MeView(APIView):
    # we need to identify the user.
    permission_classes = (IsAuthenticated,)
    # in the future we we can expand our permission_classes to not allow
    # certain users to access certain endpoints, that's going to be
    # with a specific class.

    def get(self, request):
        # the middleware in django converts the token
        # into a user that we've signed up in our application
        user = request.user
        return Response(
            {
                "id": user.id,
                "username": user.username,
                "email": user.email,
                "role": user.role,
            }
        )
