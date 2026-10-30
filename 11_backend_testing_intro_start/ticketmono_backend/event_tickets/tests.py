from django.contrib.auth import get_user_model
from django.utils import timezone

# thsi is the default django test case
# from django.test import TestCase
# we're going to use the rest_framework test case so it's api aware.
from rest_framework.test import APITestCase

# import all of the models
from .models import Event, Order, Ticket, TicketTier, Venue

User = get_user_model()


# Create your tests here.
class EventTicketsTestCase(APITestCase):
    # setUp runs before all the tests.
    def setUp(self):
        self.user = User.objects.create_user(
            username="testuser",
            password="testpass123",
            role="attendee",
        )
        self.organizer = User.objects.create_user(
            username="organizer",
            password="testpass123",
            role="organizer",
        )
        self.venue = Venue.objects.create(
            name="Test Venue",
            address="123 Test St",
            owner=self.organizer,
        )
        self.event = Event.objects.create(
            name="Test Event",
            date_time=timezone.now(),
            venue=self.venue,
            organizer=self.organizer,
        )
        self.tier = TicketTier.objects.create(
            name="General Admission",
            price="25.00",
            event=self.event,
        )

    # talk about a traditional unittest.
    # for all of your functionality that's not in a view
    # you should test it with this technique
    def test_order_total_price(self):
        # couple tickets
        # price on the tier.
        # order!
        ticket_one = Ticket.objects.create(tier=self.tier)
        ticket_two = Ticket.objects.create(tier=self.tier)
        order = Order.objects.create(customer=self.user)
        # attach the tickets to the order
        order.tickets.set([ticket_one, ticket_two])

        # we're going to add a price and assert that's
        # equal to the price.
        EXPECTED_TOTAL_PRICE = 50
        self.assertEqual(order.total_price, EXPECTED_TOTAL_PRICE)
