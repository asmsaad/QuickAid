const BASE_URL = "http://192.168.5.187:8000/"; //Must be a slash at at end
const apinames = {
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
    
    
    
    "check-registered-user": BASE_URL + "check-user-email/", //This api store the name of the user if he viewed the ticket 
    "get-registered-user-basic-info": BASE_URL + "get-user-info-by-email/", //This api store the name of the user if he viewed the ticket 
    "update-user-avater": BASE_URL + "update-profile-url/", //This api store the name of the user if he viewed the ticket 
    
  

    

};

export const getAPI = (name) => {
    // console.log("apinames.name", apinames[name]);
    return apinames[name];
};



