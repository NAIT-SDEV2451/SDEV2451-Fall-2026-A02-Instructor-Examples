# let's hook up out views and viewsets to urls.
from django.urls import path, include
from rest_framework.routers import DefaultRouter

# we need to import all of our views
from fleet.views import (
    FleetStatsView,
    DriverViewSet,
    VehicleViewSet,
    TripViewSet,
)

# let's create a router for the viewsets
router = DefaultRouter()
router.register("vehicles", VehicleViewSet, basename="vehicle")
router.register("drivers", DriverViewSet, basename="driver")
router.register("trips", TripViewSet, basename="trip")

urlpatterns = [
    # for an api view you need to specify each path for each endpoint.
    path("stats/", FleetStatsView.as_view(), name="fleet-stats"),
    # we're going to include all of the router urls.
    path("", include(router.urls)),
]
