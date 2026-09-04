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
