from django.db import models


# let's make a vehicle model
class Vehicle(models.Model):
    # remember below is the cols representation
    make = models.CharField(max_length=100)
    model = models.CharField(max_length=100)
    year = models.PositiveBigIntegerField()
    licence_plate = models.CharField(max_length=100, unique=True)

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
