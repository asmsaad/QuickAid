import { Tag } from "antd";
import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";

//*---------------------------------------------------------------------+
import { useQuery } from "react-query"; //* React Query                 |
import axios from "axios"; //* React Query                              |
import { getAPI } from "./apis/apis"; //*                               |
import { getLoginUserID } from "./authentication/localStorage"; //*     |
import { logPrint } from "./authentication/logPrint"; //*               |
import { getCookie } from "./utility"; //*                              |
import { useEffect, useState } from "react";
//*---------------------------------------------------------------------+


export const RequestPermissionAndCollectToken = () => {
    const [accessToken, setAccessToken] = useState("");

    //Todo[QUEARY] ADD NEW ENTRY
    //*API Setup
    const fetchsaveBrowserTokenForNotification = () => {
        // console.log({ empid: getLoginUserID(), token: accessToken }, "::::--");
        return axios.post(getAPI("save-notification-token"), { empid: getLoginUserID(), token: accessToken }, { headers: { "Content-Type": "application/json", "X-CSRFToken": getCookie("csrftoken") } });
    };

    //*Query Callback
    const {
        isLoading: isLoading_saveBrowserTokenForNotification,
        data: data_saveBrowserTokenForNotification,
        isError: isError_saveBrowserTokenForNotification,
        error: error_saveBrowserTokenForNotification,
        isFetching: isFetching_saveBrowserTokenForNotification,
        refetch: refetch_saveBrowserTokenForNotification,
    } = useQuery("save-notification-token-UNIQUE-1", fetchsaveBrowserTokenForNotification, {
        enabled: false,
    });

    //*Query Response Actions
    useEffect(() => {
        if (isLoading_saveBrowserTokenForNotification) {
            logPrint("🔍   saveBrowserTokenForNotification  ➤  🔄");
        } else if (data_saveBrowserTokenForNotification?.data) {
            logPrint("🔍   saveBrowserTokenForNotification  ➤  🟢", data_saveBrowserTokenForNotification?.data);
        } else if (isError_saveBrowserTokenForNotification) {
            logPrint("🔍   saveBrowserTokenForNotification  ➤  ⚠️", [error_saveBrowserTokenForNotification?.message, error_saveBrowserTokenForNotification?.response.data]);
        }
    }, [isLoading_saveBrowserTokenForNotification, data_saveBrowserTokenForNotification, isError_saveBrowserTokenForNotification, error_saveBrowserTokenForNotification]);

    // requestPermissionAndCollectToken(setAccessToken); 

    // TODO: Replace the following with your app's Firebase project configuration
    // See: https://firebase.google.com/docs/web/learn-more#config-object
    const firebaseConfig = {
        apiKey: "AIzaSyBrbp6qgMQTdulFTl3oupuQa1_4G6zvBsk",
        authDomain: "lunch-booking-380210.firebaseapp.com",
        projectId: "lunch-booking-380210",
        storageBucket: "lunch-booking-380210.appspot.com",
        messagingSenderId: "1058830329036",
        appId: "1:1058830329036:web:f562cbee96fb5a4a01ce69",
        measurementId: "G-X3RHXPY5BM",
    };
    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    // Initialize Firebase Cloud Messaging and get a reference to the service
    const messaging = getMessaging(app);

    console.log("Requesting permission...");
    Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
            console.log(">>> :::  Notification permission granted.");

            getToken(messaging, { vapidKey: "BKX3fwJm59i47kkwQYbSTxi0qE9T8N029iXap5hKAoX8lReN1BV_Qoi9XLQI7osXeufd_AxSquBji4HPeLDYo-s" })
                .then((currentToken) => {
                    if (currentToken) {
                        // Send the token to your server and update the UI if necessary
                        setAccessToken(currentToken);

                        console.log(">>> ::: ", currentToken);
                        return currentToken;
                    } else {
                        // Show permission request UI
                        console.log(">>> ::: No registration token available. Request permission to generate one.");
                    }
                })
                .catch((err) => {
                    console.log(">>> ::: An error occurred while retrieving token. ", err);
                });
        }
    });

    useEffect(() => {
        if (getLoginUserID() !== null && accessToken !== "") {
            refetch_saveBrowserTokenForNotification();
        }
    }, [accessToken]);

    // return <Tag>{accessToken}</Tag>; //!
};
