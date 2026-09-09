# from DRF itself
from rest_framework.views import APIView
from rest_framework.response import Response

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
