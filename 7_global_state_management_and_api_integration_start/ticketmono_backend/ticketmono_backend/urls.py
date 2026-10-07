from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path("admin/", admin.site.urls),
    # include our auth urls
    path("api/v1/auth/", include("core.urls")),
]
