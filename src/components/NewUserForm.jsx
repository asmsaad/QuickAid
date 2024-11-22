import { RightCircleOutlined } from "@ant-design/icons";
import { Box } from "@mui/material";
import { Button, Input, Select } from "antd";
import React, { useState, useEffect } from "react";

import { useQuery } from "react-query"; //* React Query
import axios from "axios"; //* React Query
import { getAPI } from "../apis/apis";
import { logPrint } from "../authentication/logPrint";
import { saveDataToLocalStorage } from "../authentication/localStorage";
import { getCookie } from "../utility";

// import "./../Component-Styles/PageLayout.css";
// import "./../Component-Styles/Home.css";

const registerData = {};

const NewUserForm = (props) => {
    const userCredentialData = props.userCredentialData;
    const setLogin = props.setLogin;
    // const useInputData = props.useInputData
    // const setUserInputData = props.setUserInputData
    // const useInputStatusData = props.useInputStatusData
    // const setUserInputStatusData = props.setUserInputStatusData

    const [useInputData, setUserInputData] = useState({
        empid: "",
        department: [],
        designation: "",
    });
    const [useInputStatusData, setUserInputStatusData] = useState({
        empid: "",
        department: "",
        designation: "",
    });

    const [allDepartments, setAllDepartments] = useState([]);
    const [allDesignation, setAllDesignation] = useState([]);
    const [userRegistrationData, setUserRegistrationData] = useState({});

    //Todo[QUEARY] Get all Availabel Department
    //*API Setup
    const fetcAvailableDepartments = () => {
        return axios.post(getAPI("all-departments"), { email: userCredentialData.email }, { headers: { "Content-Type": "application/json", "X-CSRFToken": getCookie("csrftoken") } });
    };

    //*Query Callback
    const {
        isLoading: isLoading_allAvailableDepartment,
        data: data_allAvailableDepartment,
        isError: isError_allAvailableDepartment,
        error: error_allAvailableDepartment,
        isFetching: isFetching_allAvailableDepartment,
        refetch: refetch_allAvailableDepartment,
    } = useQuery("all-departments-UNIQE-1", fetcAvailableDepartments, {
        enabled: true,
    });

    //*Query Response Actions
    useEffect(() => {
        if (isLoading_allAvailableDepartment) {
            logPrint("🔍   availableDepartment  ➤  🔄");
        } else if (data_allAvailableDepartment?.data) {
            logPrint("🔍   availableDepartment  ➤  🟢", data_allAvailableDepartment?.data);

            setAllDepartments(
                Object.keys(data_allAvailableDepartment.data).map((data) => ({
                    value: data,
                    label: data_allAvailableDepartment.data[data],
                }))
            );
        } else if (isError_allAvailableDepartment) {
            logPrint("🔍   availableDepartment  ➤  ⚠️", [error_allAvailableDepartment.message, error_allAvailableDepartment.response.data]);
        }
    }, [isLoading_allAvailableDepartment, data_allAvailableDepartment, isError_allAvailableDepartment, error_allAvailableDepartment]);

    //Todo[QUEARY] Available All designations
    //*API Setup
    const fetcAvailableDesignation = () => {
        return axios.post(getAPI("all-designations"), {}, { headers: { "Content-Type": "application/json", "X-CSRFToken": getCookie("csrftoken") } });
    };

    //*Query Callback
    const {
        isLoading: isLoading_availableDesignation,
        data: data_availableDesignation,
        isError: isError_availableDesignation,
        error: error_availableDesignation,
        isFetching: isFetching_availableDesignation,
        refetch: refetch_availableDesignation,
    } = useQuery("all-designations-UNIQUE-1", fetcAvailableDesignation, {
        enabled: true,
    });

    //*Query Response Actions
    useEffect(() => {
        if (isLoading_availableDesignation) {
            logPrint("🔍   availableDesignation  ➤  🔄");
        } else if (data_availableDesignation?.data) {
            logPrint("🔍   availableDesignation  ➤  🟢", data_availableDesignation?.data);
            const a = Object.keys(data_availableDesignation?.data).map((data) => ({
                value: data,
                label: data_availableDesignation?.data[data],
            }));

            setAllDesignation(a);
        } else if (isError_availableDesignation) {
            logPrint("🔍   availableDesignation  ➤  ⚠️", [error_availableDesignation.message, error_availableDesignation.response.data]);
        }
    }, [isLoading_availableDesignation, data_availableDesignation, isError_availableDesignation, error_availableDesignation]);

    //Todo[QUEARY] Create New user
    //*API Setup
    const fetcRegisterUser = () => {
        return axios.post(getAPI("register-user"), JSON.stringify({ ...userCredentialData, ...registerData }), { headers: { "Content-Type": "application/json", "X-CSRFToken": getCookie("csrftoken") } });
    };

    //*Query Callback
    const {
        isLoading: isLoading_regiserNewUser,
        data: data_regiserNewUser,
        isError: isError_regiserNewUser,
        error: error_regiserNewUser,
        isFetching: isFetching_regiserNewUser,
        refetch: refetch_regiserNewUser,
    } = useQuery("register-user-UNIQUE-1", fetcRegisterUser, {
        enabled: false,
    });

    //*Query Response Actions
    useEffect(() => {
        if (isLoading_regiserNewUser) {
            logPrint("🔍   regiserNewUser  ➤  🔄");
        } else if (data_regiserNewUser?.data) {
            logPrint("🔍   regiserNewUser  ➤  🟢", data_regiserNewUser?.data);
            setLogin(true); //!This is loging user now
            // save data to local storage for future use
            saveDataToLocalStorage("user-credential", { ...userCredentialData, ...registerData });
        } else if (isError_regiserNewUser) {
            logPrint("🔍   regiserNewUser  ➤  ⚠️", [error_regiserNewUser.message, error_regiserNewUser.response.data]);
        }
    }, [isLoading_regiserNewUser, data_regiserNewUser, isError_regiserNewUser, error_regiserNewUser]);

    //******************* CALLBACK's *******************
    //* DEPARTMENT NAME
    const handleDepartmentChange = (value) => {
        if (value) {
            const selectedDepartmentName = useInputData;
            selectedDepartmentName.department = [value];
            setUserInputData(selectedDepartmentName);
            registerData.dept_id = [value];

            if (useInputStatusData.department === "error") {
                let newUseInputStatusData = { ...useInputStatusData };
                newUseInputStatusData.department = "";
                setUserInputStatusData(newUseInputStatusData);
            }
            // console.log("After *: ", useInputData.department);
        }
    };

    //* DESIGNATION NAME
    const handleDesignationChange = (value) => {
        if (value) {
            const selectedDesignationName = useInputData;
            selectedDesignationName.designation = value;
            setUserInputData(selectedDesignationName);
            registerData.designation_id = value;

            if (useInputStatusData.designation === "error") {
                let newUseInputStatusData = { ...useInputStatusData };
                newUseInputStatusData.designation = "";
                setUserInputStatusData(newUseInputStatusData);
            }
            // console.log("After *: ", useInputData.designation);
        }
    };

    //* EMPLOYEE ID
    const handleEmployeeIDChange = (e) => {
        if (e.target.value) {
            const selectedEmployeeIDName = useInputData;
            selectedEmployeeIDName.empid = e.target.value;
            setUserInputData(selectedEmployeeIDName);
            registerData.empid = e.target.value;

            if (useInputStatusData.empid === "error") {
                let newUseInputStatusData = { ...useInputStatusData };
                newUseInputStatusData.empid = "";
                setUserInputStatusData(newUseInputStatusData);
            }
            // console.log("After *: ", useInputData.empid);
        }
    };

    //* CREATE BUTTON ACTION
    const onClickContinueBtn = () => {
        var isTriggeredAPI = true;

        // Create a copy of the status object to avoid direct mutation
        let newUseInputStatusData = { ...useInputStatusData };
        // console.log(useInputData, "+++______________________++++");

        if (useInputData.empid.trim() === "") {
            newUseInputStatusData.empid = "error";
            isTriggeredAPI = false;
        }
        if (useInputData.department.length !== 1) {
            newUseInputStatusData.department = "error";
            isTriggeredAPI = false;
        }
        if (useInputData.designation.trim() === "") {
            newUseInputStatusData.designation = "error";
            isTriggeredAPI = false;
        }

        // Update state with a new object reference to trigger re-render
        setUserInputStatusData(newUseInputStatusData);

        // console.log(useInputData, useInputStatusData);

        if (isTriggeredAPI) {
            logPrint("onClickRegisterNewUser", [{ ...userCredentialData, ...registerData }, JSON.stringify({ ...userCredentialData, ...registerData })]);
            refetch_regiserNewUser(); //todo Trigger creating Team API
        }
    };

    return (
        <Box sx={{ width: "350px", height: "500px", boxShadow: "rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px", borderRadius: "10px", marginTop: "40px", bgcolor: "#e9ecef" }}>
            <Box sx={{ width: "100%", marginTop: "20px", textAlign: "center", fontSize: "18px", color: "grey" }}>Please Fill Up Form To Continue </Box>

            <Box sx={{ padding: "0 20px", margin: "20px 0 5px 0" }}>
                {" "}
                <div style={{ marginBottom: "5px" }}> Name </div> <Input value={userCredentialData.name} disabled />{" "}
            </Box>

            <Box sx={{ padding: "0 20px", margin: "10px 0 5px 0" }}>
                {" "}
                <div style={{ marginBottom: "5px" }}> Email </div> <Input value={userCredentialData.email} disabled />{" "}
            </Box>

            <Box sx={{ padding: "0 20px", margin: "10px 0 5px 0" }}>
                {" "}
                <div style={{ marginBottom: "5px" }}> Employee ID </div> <Input showCount maxLength={6} placeholder="xx xx xx" onChange={handleEmployeeIDChange} />{" "}
            </Box>

            <Box sx={{ padding: "0 20px", margin: "10px 0 5px 0" }}>
                {" "}
                <div style={{ marginBottom: "5px" }}> Department </div>
                <Select showSearch style={{ width: "100%" }} placeholder="Search to Select" optionFilterProp="label" filterSort={(optionA, optionB) => (optionA?.label ?? "").toLowerCase().localeCompare((optionB?.label ?? "").toLowerCase())} status={useInputStatusData.department} options={allDepartments} onChange={handleDepartmentChange} />
            </Box>
            <Box sx={{ padding: "0 20px", margin: "10px 0 5px 0" }}>
                {" "}
                <div style={{ marginBottom: "5px" }}> Designation </div> <Select showSearch style={{ width: "100%" }} placeholder="Search to Select" optionFilterProp="label" filterSort={(optionA, optionB) => (optionA?.label ?? "").toLowerCase().localeCompare((optionB?.label ?? "").toLowerCase())} status={useInputStatusData.designation} onChange={handleDesignationChange} options={allDesignation} />{" "}
            </Box>

            <Box sx={{ display: "flex", justifyContent: "center", marginTop: "30px" }}>
                {" "}
                <Button type="primary" onClick={onClickContinueBtn}>
                    Continue <RightCircleOutlined />{" "}
                </Button>{" "}
            </Box>
        </Box>
    );
};

export default NewUserForm;
