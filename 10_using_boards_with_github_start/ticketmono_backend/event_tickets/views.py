from rest_framework import status, viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from .models import Event, Order, Ticket, TicketTier
from .serializers import (
    CreateNewOrderSerializer,
    EventListReadOnlySerializer,
    OrderSerializer,
    OrderDetailSerializer,
)

# let's create our order viewset


class EventViewSet(viewsets.ModelViewSet):
    queryset = Event.objects.select_related("venue", "organizer").prefetch_related(
        "ticket_tiers"
    )
    permission_classes = (IsAuthenticated,)

    def get_serializer_class(self):
        if self.action == "list":
            return EventListReadOnlySerializer
        return EventListReadOnlySerializer


class OrderViewSet(viewsets.ModelViewSet):
    permission_classes = (IsAuthenticated,)
    # we removed the serializer class property
    # to define the function.
    # serializer_class = OrderSerializer

    # let's change the serializer class based on the
    # action.
    def get_serializer_class(self):
        # well if the action is list or retrieve
        # if it's a get request it'll be using our new
        # serializer.
        if self.action in ["list", "retrieve"]:
            # just a note if you are creating a custom action with the @action decorator.
            # you need to include the method name above to choose the serializer
            # class that you'd like to use.
            return OrderDetailSerializer
        return OrderSerializer  # our create serializer

    def get_queryset(self):
        return Order.objects.filter(customer=self.request.user)

    def create(self, request, *args, **kwargs):
        serializer = CreateNewOrderSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        tickets = []
        for item in serializer.validated_data["items"]:
            tier = TicketTier.objects.get(id=item["ticket_tier_id"])
            for _ in range(item["quantity"]):
                tickets.append(Ticket.objects.create(tier=tier))

        order = Order.objects.create(customer=request.user)
        order.tickets.set(tickets)

        return Response(OrderSerializer(order).data, status=status.HTTP_201_CREATED)
