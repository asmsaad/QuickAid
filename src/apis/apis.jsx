// const BASE_URL = "http://192.168.5.187:8000/"; //Must be a slash at at end
// const BASE_URL = "http://192.168.5.146:8000/"; //Must be a slash at at end [[officd dask]]
// const BASE_URL = "http://192.168.0.101:8000/"; //Must be a slash at at end [[home]]
// const BASE_URL = "http://192.168.10.165:8000/"; //Must be a slash at at end
const BASE_URL = "https://www.ulka.autos/quickaid/apis/"; //Must be a slash at at end
const apinames = {
    "save-notification-token": BASE_URL + "save-notification-token/", //Checking Wheter the user are resgisterd at DB or not


    "get-all-department": BASE_URL + "get-all-department/", //Checking Wheter the user are resgisterd at DB or not


    "get-managers-by-empid": BASE_URL + "get-managers-by-empid/", //Checking Wheter the user are resgisterd at DB or not
    "get-all-employee-info": BASE_URL + "get-all-employee-info/", //Checking Wheter the user are resgisterd at DB or not
    "get-all-sub-domain": BASE_URL + "get-all-sub-domain/", //Checking Wheter the user are resgisterd at DB or not
    "get-all-service": BASE_URL + "get-all-service/", //Checking Wheter the user are resgisterd at DB or not
    "get-all-urgency": BASE_URL + "get-all-urgency/", //Checking Wheter the user are resgisterd at DB or not
    "get-user-info-by-empid": BASE_URL + "get-user-info-by-empid/", //Checking Wheter the user are resgisterd at DB or not
    "create-new-request": BASE_URL + "create-new-request/", //Checking Wheter the user are resgisterd at DB or not
    
    "get-all-ticket-by-empid": BASE_URL + "get-all-ticket-by-empid/", //Checking Wheter the user are resgisterd at DB or not
    "get-request-by-mention": BASE_URL + "get-request-by-acknowledge/", //Checking Wheter the user are resgisterd at DB or not

    "get-accessible-requests": BASE_URL + "get-accessible-requests/", //Checking Wheter the user are resgisterd at DB or not

    "get-all-ticket-status": BASE_URL + "get-all-ticket-status/", //Checking Wheter the user are resgisterd at DB or not
    "update-ticket-status": BASE_URL + "update-ticket-status/", //Checking Wheter the user are resgisterd at DB or not
    "ticket-status-flow-by-id": BASE_URL + "ticket-status-flow-by-id/", //Checking Wheter the user are resgisterd at DB or not
    "get_ticket_header_info": BASE_URL + "get_ticket_header_info/", //Checking Wheter the user are resgisterd at DB or not

    "get-assign-to-user-by-subDomain": BASE_URL + "get-assign-to-user/", //Checking Wheter the user are resgisterd at DB or not


    "update-request-viewed-users": BASE_URL + "update-request-viewed-users/", //This api store the name of the user if he viewed the ticket 
    "get_viewer_by_request": BASE_URL + "get_viewer_by_request/", //This api store the name of the user if he viewed the ticket 
    
    
    
    "check-registered-user": BASE_URL + "check-user-email/", //This api store the name of the user if he viewed the ticket 
    "get-registered-user-basic-info": BASE_URL + "get-user-info-by-email/", //This api store the name of the user if he viewed the ticket 
    "update-user-avater": BASE_URL + "update-profile-url/", //This api store the name of the user if he viewed the ticket 


    "submit-rating": BASE_URL + "submit-rating/", //This api store the name of the user if he viewed the ticket 
    "get-rating-by-ticketid": BASE_URL + "get-rating-by-ticketid/", //This api store the name of the user if he viewed the ticket 

    "get-unviewed-mentioned-ticket-number": BASE_URL + "get-unviewed-acknowledge-request-count/", //This api store the name of the user if he viewed the ticket 
    "get-unviewed-request-ticket-number": BASE_URL + "get-unviewed-accessible-requests-count/", //This api store the name of the user if he viewed the ticket 
    
    
    "get-user-for-domain": BASE_URL + "get-user-for-domain/", //This api store the name of the user if he viewed the ticket 
    "create-new-domain": BASE_URL + "create-new-domain/", //This api store the name of the user if he viewed the ticket 

    "get-subdomain-users-by-domain": BASE_URL + "get-subdomain-users-by-domain/", //This api store the name of the user if he viewed the ticket 
    "create-new-sub-domain": BASE_URL + "create-new-sub-domain/", //This api store the name of the user if he viewed the ticket 
    
    "get-all-issue-category-with-summary": BASE_URL + "get-requests-summary/", //This api store return the all SubIssue category with statstics
    "create-new-issue-category": BASE_URL + "create-new-service/", //This api store return the all SubIssue category with statstics
    
    "get-all-cities": BASE_URL + "get-all-cities/", //This api store return the all SubIssue category with statstics
    "create-city": BASE_URL + "create-city/", //This api store return the all SubIssue category with statstics


    "get-all-building": BASE_URL + "get-all-building/", //This api store return the all SubIssue category with statstics
    "create-buiding": BASE_URL + "create-buiding/", //This api store return the all SubIssue category with statstics


    "get-all-loactions": BASE_URL + "get-all-loactions/", //This api store return the all SubIssue category with statstics
    "create-location": BASE_URL + "create-location/", //This api store return the all SubIssue category with statstics


    
    
    
  

    

};

export const getAPI = (name) => {
    // console.log("apinames.name", apinames[name]);
    return apinames[name];
};



