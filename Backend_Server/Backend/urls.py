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
    path('get-all-cities/', get_all_cities, name='get-all-employee-info'),
    path('get-all-building/', get_all_building, name='get-all-employee-info'),
    path('get-all-loactions/', get_all_loactions, name='get-all-employee-info'),
               
        
    # Dependent API's
    path('get-managers-by-empid/', get_managers_by_empid, name='get-managers-by-empid'),
    path('get-user-info-by-empid/', get_user_info_by_empid, name='get-user-info-by-empid'),
    path('get-all-ticket-by-empid/', get_all_request_by_empid, name='get-all-request-by-empid'),
    path('get-request-by-acknowledge/', get_request_by_acknowledge, name='get-request-by-acknowledge'),
    path('get_ticket_header_info/', get_request_header_info, name='get-all-request-by-empid'),
    path('update-ticket-status/', update_request_status, name='update-ticket-status'),
    path('ticket-status-flow-by-id/', request_status_flow_by_id, name='update-ticket-status'),
    path('get_viewer_by_request/', get_viewer_by_request, name='update-ticket-status'),
    path('get-unviewed-accessible-requests-count/', get_unviewed_accessible_requests_count, name='update-ticket-status'),
    path('get-unviewed-acknowledge-request-count/', get_unviewed_acknowledge_request_count, name='update-ticket-status'),
    path('get-user-for-domain/', get_user_for_domain, name=''),
    path('get-subdomain-users-by-domain/', get_subdomain_users_by_domain, name=''),
    path('get-rating-by-ticketid/', get_rating_by_ticketid, name=''),
    path('get-requests-summary/', get_requests_summary, name=''),

    
    
    # Administrator & Access Control
    path('get-assign-to-user/', get_assign_to_user, name='get-request-by-acknowledge'),
    path('update-request-viewed-users/', update_request_viewed_users, name='update-request-viewed-users'), 
    path('get-accessible-requests/', get_accessible_requests, name='get-all-request-by-empid'),
    path('get-request-access/', get_request_access, name='get-all-request-by-empid'),
    path('get-hierarchy-by-domain/', get_hierarchy_by_domain, name='get-all-request-by-empid'),
    path('get-user-access-by-subdomain/', get_user_access_by_subdomain, name=''),

    
    
    # Login & Authentication API's
    path('check-user-email/', check_user_email, name='check-user-email'),  
    path('get-user-info-by-email/', get_user_info_by_email, name='get-user-info-by-email'),  
    path('update-profile-url/', update_profile_url, name='update-profile-url'),  
      
    
    # Create Entry API's
    path('create-new-request/', create_new_request, name='create-new-request'),
    
    path('create-new-domain/', create_new_domain, name='create-new-domain'),
    path('add-domain-user/', add_domain_user, name='add-domain-user'),
    
    path('create-new-sub-domain/', create_new_sub_domain, name='create-new-domain'),
    path('add-sub-domain-user/', add_sub_domain_user, name='create-new-domain'),
    
    path('create-new-service/', create_new_service, name='create-new-domain'),
    path('rename-service-name/', rename_service_name, name='create-new-domain'),
    
    path('submit-rating/', submit_rating, name='submit-rating'),
    
    path('create-buiding/', create_buiding, name=''),
    path('edit-buiding-name/', edit_buiding_name, name=''),
    
    
    path('create-city/', create_city, name=''),
    path('edit-city/', edit_city, name=''),
    
    
    path('create-location/', create_location, name=''),
    path('edit-location/', edit_location, name=''),

    
]
