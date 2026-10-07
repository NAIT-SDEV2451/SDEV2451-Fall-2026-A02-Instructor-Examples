from django.contrib import admin
from django.urls import path, include

# in the project urls (the entire web app urls)
# we need to include each app url here.

urlpatterns = [
    path("admin/", admin.site.urls),
    # include our auth urls
    path("api/v1/auth/", include("core.urls")),
]
