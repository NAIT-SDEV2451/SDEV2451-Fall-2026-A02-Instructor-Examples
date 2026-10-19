from rest_framework import viewsets, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from .models import Event, Order, TicketTier, Ticket
from .serializers import (
    EventListReadOnlySerializer,
    CreateNewOrderSerializer,
    OrderSerializer,
)


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
    # this will be the default but we'll override
    # the create to create a new order.
    serializer_class = OrderSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        # we want to ensure that you can only see
        # your own orders
        # remember that you can access self.request.user
        return Order.objects.filter(
            customer=self.request.user,
        )

    # let's create an order.
    def create(self, request, *args, **kwargs):
        # use our create serializer
        # request.data is going to be a list of items
        serializer = CreateNewOrderSerializer(data=request.data)
        # check if it's valid
        serializer.is_valid(raise_exception=True)
        # note we aren't doing validation against the
        # venue capacity

        # create the tickets based on the tier
        tickets = []
        # note items is the array of validated items
        for item in serializer.validated_data["items"]:
            tier = TicketTier.objects.get(id=item["ticket_tier_id"])
            for _ in range(item["quantity"]):
                tickets.append(
                    Ticket.objects.create(tier=tier),
                )
        # create the order
        order = Order.objects.create(customer=request.user)
        # set the tickets to the order.
        order.tickets.set(tickets)

        return Response(
            OrderSerializer(order).data,
            status=status.HTTP_201_CREATED,
        )
