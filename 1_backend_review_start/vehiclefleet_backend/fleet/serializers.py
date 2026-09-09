# with drf let's create the serializers

from rest_framework import serializers

from fleet.models import Vehicle, Driver, Trip


# in drf we use a model serializer to keep the json fields and validation
# in sync with the model itself.
class VehicleSerializer(serializers.ModelSerializer):
    # we need to set up the modelserializer
    class Meta:
        model = Vehicle
        # the database model that we're referring to.
        fields = "__all__"  # this is a short hand for all fields
        # we can speficy them as a list as well.


class DriverSerializer(serializers.ModelSerializer):
    # we need to set up the modelserializer
    class Meta:
        model = Driver
        # the database model that we're referring to.
        fields = "__all__"  # this is a short hand for all fields
        # we can speficy them as a list as well.


class TripSerializer(serializers.ModelSerializer):
    # we need to handle the vehicle and driver
    # we're going to do this so that it's the id for create/update
    # we're going show the detail when it's a read/get
    # using the serializers that we've created
    vehicle_detail = VehicleSerializer(source="vehicle", read_only=True)
    driver_detail = DriverSerializer(source="driver", read_only=True)

    class Meta:
        model = Trip
        fields = [
            # for creating a trip we're just going to
            # take in the ids of vehicle and driver
            "vehicle",
            "driver",
            # for reads we need to inclue the above.
            "vehicle_detail",
            "driver_detail",
            # the plain fields
            "start_location",
            "end_location",
            "start_time",
            "end_time",
            "distance",
        ]
        # specify that driver and vehicle fields are write only.
        extra_kwargs = {
            "vehicle": {"write_only": True},
            "driver": {"write_only": True},
        }
