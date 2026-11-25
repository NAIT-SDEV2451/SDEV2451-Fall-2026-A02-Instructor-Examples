from datetime import timedelta

from django.contrib.auth import get_user_model
from django.utils import timezone
from rest_framework.test import APITestCase

from .models import Event, Order, Ticket, TicketTier, Venue

User = get_user_model()


class EventTicketsTestCase(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(
            username='testuser',
            password='testpass123',
            role='attendee',
        )
        self.organizer = User.objects.create_user(
            username='organizer',
            password='testpass123',
            role='organizer',
        )
        self.venue = Venue.objects.create(
            name='Test Venue',
            address='123 Test St',
            owner=self.organizer,
        )
        self.event = Event.objects.create(
            name='Test Event',
            date_time=timezone.now(),
            venue=self.venue,
            organizer=self.organizer,
        )
        self.tier = TicketTier.objects.create(
            name='General Admission',
            price='25.00',
            event=self.event,
        )

    def test_order_total_price(self):
        ticket_1 = Ticket.objects.create(tier=self.tier)
        ticket_2 = Ticket.objects.create(tier=self.tier)
        order = Order.objects.create(customer=self.user)
        order.tickets.set([ticket_1, ticket_2])

        self.assertEqual(order.total_price, 50)

    def test_events_list_requires_authentication(self):
        response = self.client.get('/api/v1/events/')

        self.assertEqual(response.status_code, 401)

    def test_authenticated_user_can_list_events(self):
        self.client.force_authenticate(user=self.user)
        response = self.client.get('/api/v1/events/')

        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data), 1)

    def test_create_order(self):
        self.client.force_authenticate(user=self.user)
        payload = {
            'items': [
                {
                    'event_id': self.event.id,
                    'ticket_tier_id': self.tier.id,
                    'quantity': 2,
                }
            ]
        }
        response = self.client.post('/api/v1/orders/', payload, format='json')

        self.assertEqual(response.status_code, 201)
        self.assertEqual(Order.objects.count(), 1)
        order = Order.objects.first()
        self.assertEqual(order.customer, self.user)
        self.assertEqual(order.tickets.count(), 2)

    def test_user_cannot_see_other_users_orders(self):
        other_user = User.objects.create_user(
            username='other',
            password='testpass123',
            role='attendee',
        )
        ticket = Ticket.objects.create(tier=self.tier)
        other_order = Order.objects.create(customer=other_user)
        other_order.tickets.set([ticket])

        self.client.force_authenticate(user=self.user)
        response = self.client.get('/api/v1/orders/')

        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data), 0)

    def test_create_order_requires_authentication(self):
        payload = {
            'items': [
                {
                    'event_id': self.event.id,
                    'ticket_tier_id': self.tier.id,
                    'quantity': 1,
                }
            ]
        }
        response = self.client.post('/api/v1/orders/', payload, format='json')

        self.assertEqual(response.status_code, 401)
        self.assertEqual(Order.objects.count(), 0)

    def test_order_detail_returns_nested_tickets(self):
        ticket = Ticket.objects.create(tier=self.tier)
        order = Order.objects.create(customer=self.user)
        order.tickets.set([ticket])

        self.client.force_authenticate(user=self.user)
        response = self.client.get(f'/api/v1/orders/{order.id}/')

        self.assertEqual(response.status_code, 200)
        self.assertIn('tickets', response.data)
        self.assertEqual(len(response.data['tickets']), 1)
        self.assertIn('tier', response.data['tickets'][0])
        self.assertEqual(response.data['tickets'][0]['tier']['name'], 'General Admission')
        self.assertIn('total_price', response.data)


class OrganizerEventsTestCase(APITestCase):
    url = '/api/v1/organizer/events/'

    def setUp(self):
        self.user = User.objects.create_user(
            username='testuser',
            password='testpass123',
            role=User.ROLE_USER,
        )
        self.organizer = User.objects.create_user(
            username='organizer',
            password='testpass123',
            role=User.ROLE_EVENT_ORGANIZER,
        )
        self.venue = Venue.objects.create(
            name='Test Venue',
            address='123 Test St',
            owner=self.organizer,
        )
        self.past_event = Event.objects.create(
            name='Past Event',
            date_time=timezone.now() - timedelta(days=7),
            venue=self.venue,
            organizer=self.organizer,
        )
        self.upcoming_event = Event.objects.create(
            name='Upcoming Event',
            date_time=timezone.now() + timedelta(days=7),
            venue=self.venue,
            organizer=self.organizer,
        )
        self.past_tier = TicketTier.objects.create(
            name='General Admission',
            price='10.00',
            event=self.past_event,
        )
        self.general_tier = TicketTier.objects.create(
            name='General Admission',
            price='25.00',
            event=self.upcoming_event,
        )
        self.vip_tier = TicketTier.objects.create(
            name='VIP',
            price='60.50',
            event=self.upcoming_event,
        )

    def create_order(self, *tiers):
        order = Order.objects.create(customer=self.user)
        order.tickets.set([Ticket.objects.create(tier=tier) for tier in tiers])
        return order

    def test_requires_authentication(self):
        response = self.client.get(self.url)

        self.assertEqual(response.status_code, 401)

    def test_normal_user_is_forbidden(self):
        self.client.force_authenticate(user=self.user)
        response = self.client.get(self.url)

        self.assertEqual(response.status_code, 403)

    def test_only_returns_own_events(self):
        other_organizer = User.objects.create_user(
            username='other',
            password='testpass123',
            role=User.ROLE_EVENT_ORGANIZER,
        )
        Event.objects.create(
            name='Other Event',
            date_time=timezone.now(),
            venue=self.venue,
            organizer=other_organizer,
        )

        self.client.force_authenticate(user=self.organizer)
        response = self.client.get(self.url)

        self.assertEqual(response.status_code, 200)
        names = [event['name'] for event in response.data['events']]
        self.assertEqual(names, ['Past Event', 'Upcoming Event'])

    def test_event_statistics_only_count_ordered_tickets(self):
        self.create_order(self.general_tier, self.general_tier, self.vip_tier)
        Ticket.objects.create(tier=self.vip_tier)

        self.client.force_authenticate(user=self.organizer)
        response = self.client.get(self.url)

        event = response.json()['events'][1]
        self.assertEqual(event['tickets_sold'], 3)
        self.assertEqual(event['revenue'], '110.50')

    def test_ticket_in_two_orders_is_counted_once(self):
        first_order = self.create_order(self.vip_tier)
        second_order = Order.objects.create(customer=self.user)
        second_order.tickets.set(first_order.tickets.all())

        self.client.force_authenticate(user=self.organizer)
        response = self.client.get(self.url)

        event = response.json()['events'][1]
        self.assertEqual(event['tickets_sold'], 1)
        self.assertEqual(event['revenue'], '60.50')

    def test_summary_and_status(self):
        self.create_order(self.past_tier, self.general_tier)

        self.client.force_authenticate(user=self.organizer)
        response = self.client.get(self.url)

        data = response.json()
        self.assertEqual(
            data['summary'],
            {'tickets_sold': 2, 'gross_revenue': '35.00', 'live_events': 1},
        )
        statuses = [event['status'] for event in data['events']]
        self.assertEqual(statuses, ['past', 'on_sale'])

    def test_event_with_no_sales(self):
        self.client.force_authenticate(user=self.organizer)
        response = self.client.get(self.url)

        event = response.json()['events'][1]
        self.assertEqual(event['tickets_sold'], 0)
        self.assertEqual(event['revenue'], '0.00')
