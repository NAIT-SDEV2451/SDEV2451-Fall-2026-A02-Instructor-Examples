# to serialize the event I want to have a few nested serializers to
# show the venue (single), the organizer (single) and the ticket tier
# which is going to be many.

from django.contrib.auth import get_user_model
from rest_framework.serializers import ModelSerializer

from .models import Event, TicketTier, Venue

User = get_user_model()

# we're going to create the nested serializers before the event
# so the event serializer can use them.


class TicketTierSerializer(ModelSerializer):
    class Meta:
        model = TicketTier
        fields = ["id", "price", "name"]


class VenueSerializer(ModelSerializer):
    class Meta:
        model = Venue
        fields = ["id", "name", "address"]


class OrganizerSerializer(ModelSerializer):
    class Meta:
        model = User  # note: this is the auth user model.
        fields = ["id", "username", "role"]


class EventListReadOnlySerializer(ModelSerializer):
    # the serializer will use these relationships for the serializer

    class Meta:
        model = Event
        fields = [
            # simple data fields
            "id",
            "name",
            "date_time",
            # fk relationships
            "venue",
            "organizer",
            "ticket_tiers",
        ]
