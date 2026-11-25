from decimal import Decimal

from django.db.models import Count, Prefetch, Q
from rest_framework import status, viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from .models import Event, Order, Ticket, TicketTier
from .permissions import IsEventOrganizer
from .serializers import (
    CreateNewOrderSerializer,
    EventListReadOnlySerializer,
    OrderDetailSerializer,
    OrderSerializer,
    OrganizerEventSerializer,
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


class OrganizerEventViewSet(viewsets.GenericViewSet):
    serializer_class = OrganizerEventSerializer
    permission_classes = (IsAuthenticated, IsEventOrganizer)

    def get_queryset(self):
        # Only tickets that belong to an order count as sold. distinct stops a
        # ticket that is linked to two orders from being counted twice.
        tiers = TicketTier.objects.annotate(
            sold=Count(
                "tickets",
                filter=Q(tickets__orders__isnull=False),
                distinct=True,
            )
        )
        return (
            Event.objects.filter(organizer=self.request.user)
            .select_related("venue")
            .prefetch_related(Prefetch("ticket_tiers", queryset=tiers))
            .order_by("date_time")
        )

    def list(self, request, *args, **kwargs):
        events = self.get_serializer(self.get_queryset(), many=True).data
        gross_revenue = sum(
            (Decimal(event["revenue"]) for event in events), Decimal("0.00")
        )
        summary = {
            "tickets_sold": sum(event["tickets_sold"] for event in events),
            "gross_revenue": str(gross_revenue),
            "live_events": sum(event["status"] == "on_sale" for event in events),
        }
        return Response({"summary": summary, "events": events})


class OrderViewSet(viewsets.ModelViewSet):
    permission_classes = (IsAuthenticated,)

    def get_serializer_class(self):
        if self.action == "retrieve":
            return OrderDetailSerializer
        return OrderSerializer

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
