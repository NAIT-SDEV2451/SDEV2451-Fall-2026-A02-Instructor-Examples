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
