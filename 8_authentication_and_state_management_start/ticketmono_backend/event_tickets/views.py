from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import AllowAny

from .models import Event
from .serializers import EventListReadOnlySerializer


class EventViewSet(ModelViewSet):
    # this is the same as Event.objects.all() with some optimizations
    queryset = Event.objects.select_related(
        "venue", "organizer"  # optimizes joins.
    ).prefetch_related(
        "ticket_tiers"  # another optimization for the sql under the hood.
    )
    # we're actually going to talk about this much later on.

    permission_classes = [AllowAny]

    serializer_class = EventListReadOnlySerializer
