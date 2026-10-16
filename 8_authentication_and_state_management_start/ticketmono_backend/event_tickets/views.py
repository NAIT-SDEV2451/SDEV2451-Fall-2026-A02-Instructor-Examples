from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import AllowAny, IsAuthenticated

from .models import Event
from .serializers import EventListReadOnlySerializer


class EventViewSet(ModelViewSet):
    # this is the same as Event.objects.all() with some optimizations
    queryset = Event.objects.select_related(
        "venue", "organizer"  # optimizes joins.
    ).prefetch_related(
        "ticket_tiers"  # another optimization for the sql under the hood.
    )
    serializer_class = EventListReadOnlySerializer
    # we're actually going to talk about this much later on.

    # permission_classes = [AllowAny]
    # we're going to change the permissions classes
    # so that the list, everyone can see
    # on the single item I want to make it authenticated.
    def get_permissions(self):
        # action list https://www.django-rest-framework.org/api-guide/viewsets/#viewset-actions
        if self.action == "list":
            permission_classes = [AllowAny]
        else:
            permission_classes = [IsAuthenticated]

        return [permission() for permission in permission_classes]
