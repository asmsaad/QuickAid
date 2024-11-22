import React, { useState, useEffect, useRef } from "react";
// { useState, useEffect  }
import { Box, Stack } from "@mui/material";

// import Rightbar from "./Segments/Rightbar";
// import Mainbody from "./Segments/Mainbody";
import Navbar from "../segments/Navbar";
// import Navbar2 from "./Segments/Navbar2";

import { useQuery } from "react-query"; //* React Query
import axios from "axios"; //* React Query

import NewUserForm from "./../components/NewUserForm";

import { jwtDecode } from "jwt-decode";
import { LoginPage } from "./../authentication/LoginPage";
import { getDataFromLocalStorage, saveDataToLocalStorage, saveImageToLocalStorage } from "../authentication/localStorage";

import { getAPI } from "./../apis/apis";

// import "./Component-Styles/AppStructure.css";
// import "./Component-Styles/Home.css";
import { logPrint } from "../authentication/logPrint";
import { getCookie } from "../utility";

// import { WithOverflow } from "./Segments/FluentUITest";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
// import { Home } from "./Tabs/Home";
import { ShortLeftNavBar } from "../segments/NewNavBar";
// import { DeveloperBoard } from "@mui/icons-material";
import HomePage from "./HomePage";

/**
 * Defines the segmentation of the HR bulletin page.
 *
 * @param {object} props - The component props.
 * @param {string} props.header - The header text for the HR bulletin.
 * @param {string} props.body - The body content for the HR bulletin.
 * @param {string} props.footer - The footer text for the HR bulletin.
 * @returns {JSX.Element} The rendered HR bulletin page segmentation.
 *
 */

const userCredentialData = {};

const AppStructure = (props) => {
    // //! For DeveloperBoard
    // saveDataToLocalStorage("user-credential", { name: "Ammar Azad Kha", email: "ammar.azad.khan@ulkasemi.com", empid: "220816", designation: "Engineer" }); //todo store data at local storage
    // // const [isLogin, setLogin] = useState(true); // USER LOGGING STATE.

    //! For original
    const [isLogin, setLogin] = useState(getDataFromLocalStorage("user-scredential") === null ? false : true); // USER LOGGING STATE.
    const [isNewLogin, setNewLogin] = useState(false);

    //* ON LOGGING WITH GOOGLE SOCIAL MEDIA BUTTON, THIS FUNCTION IS TRIGGERED.
    const onLoginSuccess = (credentialResponse) => {
        const decoded = jwtDecode(credentialResponse.credential); // DECODE WITH JWTDECODE THE USER CREDENTIAL FROM THE GOOGLE ACCOUNT LOGIN.
        userCredentialData["name"] = decoded.name;
        userCredentialData["email"] = decoded.email;
        userCredentialData["picture"] = decoded.picture;
        logPrint("onLoginSuccess => userCredentialFromGoogle", decoded);
        logPrint("onLoginSuccess => userCredentialDataVariable", userCredentialData);
        refetch_isRegisteredUser(); //todo TRIGGER API/QUERY WITH THE USER CREDENTIALS FOR VERIFICATION.
    };
    ////
    ////
    ////

    //* LOAD DATA FROM LOCALSTORAGE WHEN THE COMPONENT MOUNTS.
    useEffect(() => {
        //IF USER CREDENTIALS ARE FOUND IN CURRENT BROWSER LOCATION LOGS, IN THAT CASE  AUTOMATICALLY , TRIGGERING THE USER LOGIN STATE AS TRUE.
        const userCredential = getDataFromLocalStorage("user-credential");
        logPrint("userCredential => fromLocalStorage", userCredential);
        if (userCredential) {
            setLogin(true);
        } else {
            setLogin(false);
        }
    }, [isLogin]);
    ////
    ////
    ////

    //Todo[QUEARY] Check Register user or not
    //*API Setup
    const fetchisRegisteredUser = () => {
        return axios.post(getAPI("check-registered-user"), { email: userCredentialData.email }, { headers: { "Content-Type": "application/json", "X-CSRFToken": getCookie("csrftoken") } });
    };

    //*Query Callback
    const {
        isLoading: isLoading_isRegisteredUser,
        data: data_isRegisteredUser,
        isError: isError_isRegisteredUser,
        error: error_isRegisteredUser,
        isFetching: isFetching_isRegisteredUser,
        refetch: refetch_isRegisteredUser,
    } = useQuery("check-registered-user-UNIQE-1", fetchisRegisteredUser, {
        enabled: false,
    });

    //*Query Response Actions
    useEffect(() => {
        if (isLoading_isRegisteredUser) {
            logPrint("🔍   checkRegisterdUserEmail  ➤  🔄");
        } else if (data_isRegisteredUser?.data) {
            logPrint("🔍   checkRegisterdUserEmail  ➤  🟢", data_isRegisteredUser?.data);
            if (!data_isRegisteredUser?.data.result) {
                setNewLogin(true);
            } else if (data_isRegisteredUser?.data.result) {
                refetch_updateUserAvater();
            }
        } else if (isError_isRegisteredUser) {
            // logPrint("🔍   checkRegisterdUserEmail  ➤  ⚠️", [error_isRegisteredUser?.message, error_isRegisteredUser?.response.data]);
            logPrint("🔍   checkRegisterdUserEmail  ➤  ⚠️", [error_isRegisteredUser]);
        }
    }, [isLoading_isRegisteredUser, data_isRegisteredUser, isError_isRegisteredUser, error_isRegisteredUser]);
    ////
    ////
    ////

    //Todo[QUEARY] Grab the user's data.
    //*API Setup
    const fetchUserInfo = () => {
        return axios.post(getAPI("get-registered-user-basic-info"), { email: userCredentialData.email }, { headers: { "Content-Type": "application/json", "X-CSRFToken": getCookie("csrftoken") } });
    };

    //*Query Callback
    const { isLoading: isLoading_getUserInfo, data: data_getUserInfo, isError: isError_getUserInfo, error: error_getUserInfo, isFetching: isFetching_getUserInfo, refetch: refetch_getUserInfo } = useQuery("get-registered-user-basic-info-UNIQE-1", fetchUserInfo, { enabled: false });

    //*Query Response Actions
    useEffect(() => {
        if (isLoading_getUserInfo) {
            logPrint("🔍   getUserInfo  ➤  🔄");
        } else if (data_getUserInfo?.data) {
            logPrint("🔍   getUserInfo  ➤  🟢", data_getUserInfo?.data);
            // const picture = saveImageToLocalStorage(data_getUserInfo.data.picture);
            // data_getUserInfo.data.picture = picture
            saveDataToLocalStorage("user-credential", data_getUserInfo?.data); //todo store data at local storage
            setLogin(true);
        } else if (isError_getUserInfo) {
            logPrint("🔍   getUserInfo  ➤  ⚠️", [isError_getUserInfo?.message, isError_getUserInfo?.response.data]);
        }
    }, [isLoading_getUserInfo, data_getUserInfo, isError_getUserInfo, error_getUserInfo]);
    ////
    ////
    ////
    //Todo[QUEARY] Save latest Login User Avater.
    //*API Setup
    const fetchUserAvater = () => {
        return axios.post(getAPI("update-user-avater"), { email: userCredentialData.email, profile_url: userCredentialData.picture }, { headers: { "Content-Type": "application/json", "X-CSRFToken": getCookie("csrftoken") } });
    };

    //*Query Callback
    const { isLoading: isLoading_updateUserAvater, data: data_updateUserAvater, isError: isError_updateUserAvater, error: error_updateUserAvater, isFetching: isFetching_updateUserAvater, refetch: refetch_updateUserAvater } = useQuery("update-user-avater-UNIQE-1", fetchUserAvater, { enabled: false });

    //*Query Response Actions
    useEffect(() => {
        if (isLoading_updateUserAvater) {
            logPrint("🔍   updateUserAvater  ➤  🔄");
        } else if (data_updateUserAvater?.data) {
            logPrint("🔍   updateUserAvater  ➤  🟢", data_updateUserAvater?.data);
            refetch_getUserInfo();
        } else if (isError_updateUserAvater) {
            logPrint("🔍   updateUserAvater  ➤  ⚠️", [isError_updateUserAvater?.message, isError_updateUserAvater?.response.data]);
        }
    }, [isLoading_updateUserAvater, data_updateUserAvater, isError_updateUserAvater, error_updateUserAvater]);
    // ////
    // ////
    // ////

    // // const navigate = useNavigate();
    const location = useLocation();
    // // console.log("location :", location);
    logPrint("Location", location);

    return (
        <Box>
            {!isLogin ? (
                <Box className="full-display">
                    <Box className="poster">
                        <div className="Title-Text" style={{ fontSize: "32px", fontWeight: "bolder", marginTop: "0px" }}>
                            Welcome to ProSync Lite
                        </div>
                        <div className="title-context">Manage your project and task at one click</div>
                        {!isNewLogin ? (
                            <Box style={{ marginTop: "30px" }}>
                                <LoginPage onLoginSuccess={onLoginSuccess} /> {/* //todo LOG  IN PAGE */}
                            </Box>
                        ) : (
                            <NewUserForm setLogin={setLogin} userCredentialData={userCredentialData} />
                        )}
                    </Box>
                </Box>
            ) : (
                <Box display="flex" flexDirection="column" height="100dvh" width="100vw" overflow="hidden">
                    <Navbar />
                    <Stack direction="row" flex="1" overflow="hidden">
                        <ShortLeftNavBar vertical={true} />
                        <Box sx={{ width: "100%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", height: `calc(100vh -65px)`, overflow: "auto" }}>{location.pathname === "/quickaid" || location.pathname === "/quickaid/" ? <HomePage /> : <Outlet />}</Box>
                    </Stack>
                    <ShortLeftNavBar vertical={false} />
                </Box>
            )}
        </Box>
    );

    // return (
    //     <Box display="flex" flexDirection="column" height="100dvh" width="100vw" overflow="hidden">
    //         <Navbar />
    //         <Stack direction="row" flex="1" overflow="hidden">
    //             <ShortLeftNavBar vertical={true} />
    //             <Box sx={{ width: "100%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", height: `calc(100vh -65px)`, overflow: "auto" }}>{location.pathname === "/quickaid" || location.pathname === "/quickaid/" ? <HomePage /> : <Outlet />}</Box>
    //         </Stack>
    //         <ShortLeftNavBar vertical={false} />
    //     </Box>
    // );
};

export default AppStructure;

const a = `

 <Box>
            {!isLogin ? (
                <Box className="full-display">
                    <Box className="poster">
                        <div className="Title-Text" style={{ fontSize: "32px", fontWeight: "bolder", marginTop: "0px" }}>
                            Welcome to ProSync Lite
                        </div>
                        <div className="title-context">Manage your project and task at one click</div>
                        {!isNewLogin ? (
                            <Box style={{ marginTop: "30px" }}>
                                <LoginPage onLoginSuccess={onLoginSuccess} /> {/* //todo LOG  IN PAGE */}
                            </Box>
                        ) : (
                            <NewUserForm setLogin={setLogin} userCredentialData={userCredentialData} />
                        )}
                    </Box>
                </Box>
            ) : (
                <Box display="flex" flexDirection="column" height="100vh" width="100vw" overflow="hidden">
                    <Navbar />
                    <Stack direction="row" flex="1" overflow="hidden">
                        {/* <Leftbar /> */}
                        <ShortLeftNavBar />
                        {/* <Mainbody /> */}
                        {/* MAIN BODY */}
                        <Box flex="1" sx={{ display: "flex", flexDirection: "column", alignItems: "center", position: "relative" }} overflow="auto">
                            {location.pathname === "/prosync" || location.pathname === "/prosync/" ? <Home /> : <Outlet />}
                        </Box>
                        {/* <Rightbar /> */}
                    </Stack>
                    {/* <Navbar2 /> */}
                </Box>
            )}
        </Box>

`;
