from django.db import models


# let's make a vehicle model
class Vehicle(models.Model):
    # remember below is the cols representation
    make = models.CharField(max_length=100)
    model = models.CharField(max_length=100)
    year = models.PositiveBigIntegerField()
    # change licence to license (typo fix)
    license_plate = models.CharField(max_length=100, unique=True)

    # you want to be able to know what's in the model
    # when you're reading a debugging.
    def __str__(self):
        return f" {self.make} {self.model} {self.year} ({self.licence_plate})"


# so let's add a driver model
class Driver(models.Model):
    name = models.CharField(max_length=150)
    license_number = models.CharField(max_length=50, unique=True)
    phone = models.CharField(max_length=20, blank=True)
    email = models.EmailField(blank=True)

    # we're going to add the str
    def __str__(self):
        return f"{self.name}, ({self.license_number})"


class Trip(models.Model):
    # we're going to link to both tables.
    vehicle = models.ForeignKey(
        Vehicle,
        on_delete=models.CASCADE,  # if a vehicle is deleted it deletes the trips.
        related_name="trips",  # how to name trips on a vehicle
        # you need to make a decision if it's blank/nullable
    )
    driver = models.ForeignKey(
        Driver,
        on_delete=models.CASCADE,  # if a driver is deleted it deletes the trips.
        related_name="trips",  # how to name trips on a driver
        # you need to make a decision if it's blank/nullable
    )
    # in the future we could make these lat longs
    start_location = models.CharField(max_length=255)
    end_location = models.CharField(max_length=255)
    # start time and end time.
    start_time = models.DateTimeField()
    end_time = models.DateTimeField(null=True, blank=True)
    # distance
    distance = models.DecimalField(
        max_digits=8, decimal_places=2, null=True, blank=True
    )
