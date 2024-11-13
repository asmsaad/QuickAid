const BASE_URL = "https://www.ulka.autos/prosync/"; //Must be a slash at at end
const apinames = {
    "get-CSRF-token": BASE_URL + "apis/11/", //Checking Wheter the user are resgisterd at DB or not
    
    "update-user-avater": BASE_URL + "apis/update-profile-url/", //Checking Wheter the user are resgisterd at DB or not
    
    "check-registered-user": BASE_URL + "apis/check-user-email/", //Checking Wheter the user are resgisterd at DB or not
    "get-registered-user-basic-info": BASE_URL + "apis/get-user-info-by-email/", //Getting User info by provideing the user email
    "get-all-projects-id-by-user": BASE_URL + "apis/get-projects-by-empid/", //Getting all project ID's by user ID
    // WEEKLY SUBMISSION
    "update-project-status-by-week": BASE_URL + "apis/weekly-submissions/", //Update project Status by week
    "edit-update-project-status-by-week": BASE_URL + "apis/update-weekly-submission/", //Update project Status by week
    
    "all-departments": BASE_URL + "apis/get-all-departments/", // Get all available Departments
    "all-designations": BASE_URL + "apis/get-all-designations/", // Get all available Designation
    "register-user": BASE_URL + "apis/create-login-user/", // Register user 

    "user-departments": BASE_URL + "apis/get-employee-departments/", //     User Envolved Department list
    "user-projects": BASE_URL + "apis/get-projects-by-employee-department/", // User Envolved Project list
    "user-vendors": BASE_URL + "apis/get-vendors-by-employee-department/", // User Envolved Project list
    "vendor-representors": BASE_URL + "apis/get-members-by-vendor/", // All vensor representor by vendor id
    
    "project-priorities": BASE_URL + "apis/get-all-priorities/", // All vensor representor by vendor id
    "departments-members-by-user": BASE_URL + "apis/get_users-by-employee-department/", // All vensor representor by vendor id
    
    

    
    
    "user-all-projects-update": BASE_URL + "apis/get-submissions-by-employee-and-project/", // Register user 
    "user-all-weekly-update": BASE_URL + "apis/all-weekly-submissions-by-empid/", // Register user 
    
    "all-ongoing-projects-by-user": BASE_URL + "apis/get-projects-by-empid/", // Register user 
    "weekly-submissions-by-underuser-for-userlist": BASE_URL + "apis/get-all-submissions-by-empid-list/", // Register user 
    
    "user-subordinates": BASE_URL + "apis/get-employees-by-supervisor/", // Register user 
    "user-nested-subordinates": BASE_URL + "apis/get-nested-sub/", // Register user 
    
    "all-vendor-names-by-user-department": BASE_URL + "apis/get-vendors-by-employee-department/", // Register user 
    
    "create-project": BASE_URL + "apis/create-project/", // All vensor representor by vendor id
    "create-team": BASE_URL + "apis/create-team/", // All vensor representor by vendor id
    "create-vendor-representor": BASE_URL + "apis/create-clientend-member/", // Register user 
    "create-vendor": BASE_URL + "apis/create-vendor/", // All projects according to login user
    
    "vendors-representors-table": BASE_URL + "apis/get-clientend-members-table-by-empid/", // Register user 
    "contributors-table": BASE_URL + "apis/get-employee-table-by-empid/", // All projects according to login user
    "projects-table": BASE_URL + "apis/get-projects-table-by-empid/", // All projects according to login user
    "teams-table": BASE_URL + "apis/get-teams-table-by-empid/", // All projects according to login user
    "vendors-table": BASE_URL + "apis/get-vendors-table-by-empid/", // All projects according to login user

    "submit-bug": BASE_URL + "apis/save-bug-report/", // All projects according to login user


    "all-access-tags-by-master": BASE_URL + "apis/get-access-tags-and-departments-by-empid/", // All projects according to login user
    "selected-project-all-available-category": BASE_URL + "apis/get-project-tags/", // All projects according to login user
    
    "all-available-task-category": BASE_URL + "apis/get-all-project-tags/", // All projects according to login user
    
    "all-subordiantes-and-user-supervisor-leaves-list": BASE_URL + "apis/get-leave-info-by-list/", // All projects according to login user




    // PROJECT TAB
    "subordiantes-and-my-all-projects-list": BASE_URL + "apis/my-projects-by-empid/", // All projects according to login user
    "get-project-info-by-idx": BASE_URL + "apis/get-project-info-by-idx/", // All projects according to login user
    "employee-submission-count-by-project-idx": BASE_URL + "apis/employee-submission-count-by-idx/", // All projects according to login user
    "get-all-task-category-for-project-by-contributor": BASE_URL + "apis/get-all-skills-info-for-project/", // All projects according to login user
    "get-project-priority-flow": BASE_URL + "apis/get-project-priority-flow/", // All projects according to login user
    "get-project-status-flow": BASE_URL + "apis/get-project-status-flow/", // All projects according to login user

    "get-all-meeting-for-project": BASE_URL + "apis/get-all-meeting-for-project/", // All projects according to login user
    "get-all-weekly-submission-by-project": BASE_URL + "apis/get-all-weekly-submission-by-project/", // All projects according to login user
    
    "update-project-description": BASE_URL + "apis/update-project-description/", // All projects according to login user
    "update-project-goal": BASE_URL + "apis/update-project-goal/", // All projects according to login user
    "update-project-status": BASE_URL + "apis/update-project-status/", // All projects according to login user
    "get_project_all_statuses": BASE_URL + "apis/get_all_statuses/", // All projects according to login user

    "get-submission-statistic": BASE_URL + "apis/status-temporary/", // All projects according to login user
    "get-all-submissions-for-the-week": BASE_URL + "apis/get-all-submissions-for-week/", // All projects according to login user

    

    
};

export const getAPI = (name) => {
    // console.log("apinames.name", apinames[name]);
    return apinames[name];
};



