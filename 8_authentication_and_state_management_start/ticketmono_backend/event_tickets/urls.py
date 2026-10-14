# this is going to be the app urls that we will later import
# in the project
from rest_framework.routers import DefaultRouter

from .views import EventViewSet

# routers are for viewsets only not api views *as a note!
router = DefaultRouter()
router.register("events", EventViewSet, basename="event")

urlpatterns = router.urls
