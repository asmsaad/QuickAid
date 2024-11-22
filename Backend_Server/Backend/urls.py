from django.urls import path
from . import views
from .views import *


urlpatterns = [
    # path('', views.home, name= 'Home'),
    # path('populate-designations/', PopulateDesignationsView.as_view(), name='populate-designations'),
    # path('populate-user/', PopulateUserInfoView.as_view(), name='populate-designations'),
    
    
    
    # Independent API's
    path('get-all-domain/', get_all_domain, name='get-all-employee-info'),
    path('get-all-sub-domain/', get_all_sub_domain, name='get-all-employee-info'),
    path('get-all-urgency/', get_all_urgency, name='get-all-employee-info'),  
    path('get-all-service/', get_all_service, name='get-all-employee-info'),    
    path('get-all-employee-info/', get_all_employee_info, name='get-all-employee-info'),
    path('get-all-ticket-status/', get_all_request_status, name='get-all-employee-info'),
               
        
    # Dependent API's
    path('get-managers-by-empid/', get_managers_by_empid, name='get-managers-by-empid'),
    path('get-user-info-by-empid/', get_user_info_by_empid, name='get-user-info-by-empid'),
    path('get-all-ticket-by-empid/', get_all_request_by_empid, name='get-all-request-by-empid'),
    path('get-request-by-acknowledge/', get_request_by_acknowledge, name='get-request-by-acknowledge'),
    path('get_ticket_header_info/', get_request_header_info, name='get-all-request-by-empid'),
    path('update-ticket-status/', update_request_status, name='update-ticket-status'),
    path('ticket-status-flow-by-id/', request_status_flow_by_id, name='update-ticket-status'),
    path('get_viewer_by_request/', get_viewer_by_request, name='update-ticket-status'),
    
    
    # Administrator & Access Control
    path('get-assign-to-user/', get_assign_to_user, name='get-request-by-acknowledge'),
    path('update-request-viewed-users/', update_request_viewed_users, name='update-request-viewed-users'), 
    path('get-accessible-requests/', get_accessible_requests, name='get-all-request-by-empid'),
    path('get-request-access/', get_request_access, name='get-all-request-by-empid'),

    
    
    # Login & Authentication API's
    path('check-user-email/', check_user_email, name='check-user-email'),  
    path('get-user-info-by-email/', get_user_info_by_email, name='get-user-info-by-email'),  
    path('update-profile-url/', update_profile_url, name='update-profile-url'),  
      
    
    # Create Entry API's
    path('create-new-request/', create_new_request, name='create-new-request'),
    path('create-new-domain/', create_new_domain, name='create-new-domain'),
    path('create-new-sub-domain/', create_new_sub_domain, name='create-new-domain'),
    path('submit-rating/', submit_rating, name='submit-rating'),
]
