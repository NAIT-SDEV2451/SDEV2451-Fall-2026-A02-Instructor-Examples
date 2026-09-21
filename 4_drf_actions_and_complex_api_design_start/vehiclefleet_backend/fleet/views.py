from datetime import timedelta

# we import the Avg from models.
from django.db.models import Count, Avg
from django.db.models.functions import TruncWeek

# let's import django timezone
from django.utils import timezone

from rest_framework.filters import SearchFilter
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.viewsets import ModelViewSet

from fleet.models import Driver, Trip, Vehicle
from fleet.serializers import DriverSerializer, TripSerializer, VehicleSerializer


class FleetStatsView(APIView):
    # we're going to add a some fields so that we can
    # get some more stats.
    def get(self, request):
        # let's get average distance for all trips.
        # we're going to use .aggregate for this because it'll be on the
        # entire queryset.
        average_trip_dist = Trip.objects.aggregate(
            # we're creating a field called average distance
            average_distance=Avg("distance"),
            # we are getting the average of distance on the trip
        )["average_distance"]
        # in the square brackets we're just getting the number.

        # annotations and groupby.
        # we're going to get the weekly average distance for the last
        # 12 months.

        # how we're going to do this.
        # filter all trip objects within the last 12 months.
        twelve_months_ago = timezone.now() - timedelta(weeks=52)  # minus 52 weeks.
        weekly_avg_dist = list(
            Trip.objects.filter(
                start_time__gte=twelve_months_ago,  # __gte is part of the orm in a filter
                distance__isnull=False,  # __isnull is part of the orm in a filter
            )
            .annotate(  # annotate a new field called week
                week=TruncWeek("start_time"),
            )
            .values("week")
            .annotate(  # annotatiion for distance (average it)
                avg_distance=Avg("distance")
            )
            .order_by("week")
            .values_list("week", "avg_distance")
        )
        formatted_distances = []
        for avg_dist in weekly_avg_dist:

            formatted_distances.append(
                {
                    "week": avg_dist[0].strftime("%Y-%m-%d"),
                    "avg_distance": round(float(avg_dist[1]), 2),
                }
            )

        # order by the week
        # see the values list.

        return Response(
            {
                "average_dist_per_week": formatted_distances,
                "avg_trip_distance": average_trip_dist,
                "total_vehicles": Vehicle.objects.count(),
                "total_drivers": Driver.objects.count(),
                "total_trips": Trip.objects.count(),
            }
        )


class VehicleViewSet(ModelViewSet):
    queryset = Vehicle.objects.all()
    serializer_class = VehicleSerializer
    filter_backends = [SearchFilter]
    search_fields = ["make", "model", "license_plate"]


class DriverViewSet(ModelViewSet):
    queryset = Driver.objects.all()
    serializer_class = DriverSerializer
    filter_backends = [SearchFilter]
    search_fields = ["name", "license_number", "email"]


class TripViewSet(ModelViewSet):
    serializer_class = TripSerializer

    def get_queryset(self):
        return Trip.objects.select_related("vehicle", "driver").all()
