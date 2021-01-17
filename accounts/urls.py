from django.urls import include, path
from . import views
from django.conf import settings
from django.conf.urls.static import static

app_name='accounts'

urlpatterns = [
    path('signupView', views.signupView, name='signupView'),
    path('profile/', views.profile, name='profile'),
    path('profile/edit', views.profile_edit, name='profile_edit'),
]

