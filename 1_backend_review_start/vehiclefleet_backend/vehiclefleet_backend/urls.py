from django.contrib import admin

# we're going to add the mappings
# of our custom app as an api,
# we need include,
from django.urls import path, include

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/v1/", include("fleet.urls")),
]
