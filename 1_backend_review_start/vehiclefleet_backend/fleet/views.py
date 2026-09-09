# from DRF itself
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet

# let's import a filter
from rest_framework.filters import SearchFilter

# fround our code let's import our models and serializers
from fleet.models import Vehicle, Driver, Trip
from fleet.serializers import (
    VehicleSerializer,
    DriverSerializer,
    TripSerializer,
)


# we're not going o be using apiviews a ton but they're pretty useful.
class FleetStatsView(APIView):
    # we're just going to specify a get here.
    def get(self, request):
        # this takes in a request and returns a response
        # we're going to return a count of all of them.
        return Response(
            {
                "total_vehicles": Vehicle.objects.count(),
                "total_drivers": Driver.objects.count(),
                "total_trips": Trip.objects.count(),
            }
        )
        # using .objects.count() or .all() or .filter() or .update()
        # or .create() this is doing crud on the models/db instances
        # you've created.


# viewsets are pretty handy because they allow for less code to
# write our get, patch, put, post, delete views for our endpoints.
class VehicleViewSet(ModelViewSet):
    # what data we want from the database
    queryset = Vehicle.objects.all()
    # define how we want to serialize it
    serializer_class = VehicleSerializer
    # to be able to make our api searchable
    filter_backends = [SearchFilter]
    # what fields we can search on
    search_fields = ["make", "model", "license_plate"]


class DriverViewSet(ModelViewSet):
    # what data we want from the database
    queryset = Driver.objects.all()
    # define how we want to serialize it
    serializer_class = DriverSerializer
    # to be able to make our api searchable
    filter_backends = [SearchFilter]
    # what fields we can search on
    search_fields = ["name", "license_number", "email"]


class TripViewSet(ModelViewSet):
    serializer_class = TripSerializer
    # note like get_queryset you can also get_serializer_class

    # instead of queryset class variable we can use get_queryset
    # if we wanted to use the user or any other information.
    def get_queryset(self):
        # we're going to talk about this later on but we can
        # use select_related to fetch everything in one sql query
        return Trip.objects.select_related("vehicle", "driver").all()
