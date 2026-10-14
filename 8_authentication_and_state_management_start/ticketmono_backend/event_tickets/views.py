from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import AllowAny

from .models import Event
from .serializers import EventListReadOnlySerializer


class EventViewSet(ModelViewSet):
    queryset = Event.objects.select_related(
        "venue", "organizer"  # optimizes joins.
    ).prefetch_related(
        "ticket_tiers"  # another optimization for the sql under the hood.
    )
