from django.urls import path
from . import views
from .views import *


urlpatterns = [
    path('', views.home, name= 'Home'),
    path('populate-designations/', PopulateDesignationsView.as_view(), name='populate-designations'),
    path('populate-user/', PopulateUserInfoView.as_view(), name='populate-designations'),
    
    
    path('get-managers-by-empid/', get_managers_by_empid, name='get-managers-by-empid'),
    path('get-all-employee-info/', get_all_employee_info, name='get-all-employee-info'),
    path('get-all-domain/', get_all_domain, name='get-all-employee-info'),
    path('get-all-urgency/', get_all_urgency, name='get-all-employee-info'),
    path('get-all-service/', get_all_service, name='get-all-employee-info'),
    
    
    
    
    
    
    path('create-new-request/', create_new_request, name='create-new-request'),
]
