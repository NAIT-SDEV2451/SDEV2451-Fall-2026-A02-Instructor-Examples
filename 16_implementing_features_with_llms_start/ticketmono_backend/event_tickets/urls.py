from rest_framework.routers import DefaultRouter

from .views import EventViewSet, OrderViewSet, OrganizerEventViewSet

router = DefaultRouter()
router.register("events", EventViewSet, basename="event")
router.register("orders", OrderViewSet, basename="order")
router.register("organizer/events", OrganizerEventViewSet, basename="organizer-event")

urlpatterns = router.urls
