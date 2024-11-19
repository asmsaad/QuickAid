from django.urls import path
from . import views
from .views import *


urlpatterns = [
    path('', views.home, name= 'Home'),
    path('populate-designations/', PopulateDesignationsView.as_view(), name='populate-designations'),
    path('populate-user/', PopulateUserInfoView.as_view(), name='populate-designations'),
    path('get-managers-by-empid/', get_managers_by_empid, name='get-managers-by-empid'),
]
