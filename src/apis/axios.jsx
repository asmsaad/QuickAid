import axios from "axios";
import { getCookie } from "../utility";


// Base API URL
const BASE_URL = "http://192.168.5.187:8080/";

// API Endpoints
const apiEndpoints = {
    userByDepartments: 'projects/get-employee-departments/',  // Get departments by user ID
    myApiName2: 'my-api-name/',  // Another API endpoint as an example
};

// Generic Axios POST request handler
export const axios_post = async ({ api, param }) => {
    try {
        const response = await axios.post(
            BASE_URL + api, // Build the full API URL
            param || {},    // Provide the parameters, default to an empty object if none provided
            {
                headers: {
                    "Content-Type": "application/json" , "X-CSRFToken" : getCookie('csrftoken'),  // Set the content type header
                },
            }
        );
        return response.data; // Return response data for further processing
    } catch (error) {
        console.error('API request failed:', error);
        throw error;  // Re-throw the error for handling in the calling function
    }
};