// rafce
import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import DataViewTable from "../../components/DataViewTable";
import { CustomModal } from "../../components/DataAddModal";
import { Search } from "@mui/icons-material";

//*---------------------------------------------------------------------
import { useQuery } from "react-query"; //* React Query                 |
import axios from "axios"; //* React Query                              |
import { getAPI } from "../../apis/apis"; //*                           |
import { getLoginUserID } from "../../authentication/localStorage"; //* |
import { logPrint } from "../../authentication/logPrint"; //*           |
import { getCookie } from "../../utility"; //*                          |
import { Tag } from "antd";
//*---------------------------------------------------------------------

const IssueTab = () => {
    // const domainName___ = ["Cat", "Camel", "Bad", "Bat"].map((name) => {
    //     return { value: name, label: name };
    // });
    ////
    ////
    ////
    ////
    //*------------------------------------------------------------------------------------------+
    //*                                  TABLE CONFIGURATION                                     |
    //*------------------------------------------------------------------------------------------+
    //                                                                                           |
    const columns = {
        1: { title: "Domain", width: "250px" },
        2: { title: "Members", width: "" },
    };
    //                                                                                           |
    //-------------------------------------------------------------------------------------------+

    ////
    ////
    ////

    //*------------------------------------------------------------------------------------------+
    //*                                 MODAL FORM DATA STORAGE                                  |
    //*------------------------------------------------------------------------------------------+
    //--------------------------------Inital From Entries values --------------------------------+
    const initial_entryInputData = {
        domain: "", //                                                                           |
        members: [], //                                                                          |
    }; //                                                                                        |
    //*------------------------------------ Entries values --------------------------------------+
    const [newEntryInputData, setNewEntryInputData] = useState(initial_entryInputData); //       |
    //-------------------------------------------------------------------------------------------+

    ////
    ////
    ////

    //*------------------------------------------------------------------------------------------+
    //*                              MODAL BODAY ENTRY CONFIGURATION                             |
    //*------------------------------------------------------------------------------------------+
    //                                                                                            |
    // const modalBodyConfig__ = {
    //     domain: {
    //         title: "Domain",
    //         field: "InputSuggetion",
    //         placeholder: "",
    //         field_suggetions: [],
    //         field_suggetions_ignore: true,
    //         data_update_at: { newEntryInputData, setNewEntryInputData },
    //         data_update_var: "domain",
    //         value_update_var: newEntryInputData.domain,
    //         okay_button_disable_at_empty: true,
    //     },
    //     members: {
    //         title: "Members",
    //         field: "SelectMultiple",
    //         placeholder: "",
    //         field_suggetions: [],
    //         field_suggetions_ignore: false,
    //         data_update_at: { newEntryInputData, setNewEntryInputData },
    //         data_update_var: "members",
    //         value_update_var: newEntryInputData.members,
    //         okay_button_disable_at_empty: true,
    //     },
    // };

    // const [modalBodyConfig, setModalBodyConfig] = useState(modalBodyConfig__);

    const [modalBodyConfig, setModalBodyConfig] = useState({
        // domain: {
        //     title: "Domain",
        //     field: "InputSuggetion",
        //     placeholder: "",
        //     field_suggetions: [],
        //     field_suggetions_ignore: true,
        //     data_update_at: { newEntryInputData, setNewEntryInputData },
        //     data_update_var: "domain",
        //     value_update_var: newEntryInputData.domain,
        //     okay_button_disable_at_empty: true,
        // },
        members: {
            title: "Members", // Field title text
            fieldType: "SelectMultiple", // Field type
            placeholderText: "", // Placeholder text for the entry field

            ignoreSuggestions: false, // If true, ignore suggestions
            suggestionsList: [], // List of suggestions/values
            isFieldDisabled: true, // If true, disables the field based on provided data
            disableData: [], // Data used to determine if the field is disabled

            dataVariable: "members", // Variable to store data
            dataStoragePath: newEntryInputData.members, // Path to store the data

            getModalData: newEntryInputData, // Function or object to get modal data
            setModalData: setNewEntryInputData, // Function to set modal data

            disableOkayButtonIfEmpty: true, // Disables the Okay button if no value is provided
        },
    });
    //                                                                                            |
    //--------------------------------------------------------------------------------------------+

    ////
    ////
    ////

    //*------------------------------------------------------------------------------------------+
    //*                      CREATE FORM @ MODAL SETUP AND FUNCTIONALITY                         |
    //*------------------------------------------------------------------------------------------+
    //                                                                                           |
    const [onOkayLoading, setOnOkayLoading] = useState([0]); // For modal okay button loading    |
    const [isModalOpen, setIsModalOpen] = useState(true); // Controll modal open/close          |
    //                                                                                           |
    //------------------------------------- Show Modal ------------------------------------------+
    //                                                                                           |
    const showModal = () => {
        setIsModalOpen(true);
    };
    //                                                                                           |
    //------------------------------------ Handel Okay ------------------------------------------+
    //                                                                                           |
    const handleOk = () => {
        refetch_getAddNewDomainWithMembers(); //*Trigred add domain with members query
        console.log("press on okay");
        setTimeout(() => {
            setIsModalOpen(false);
        }, 1500);
    };
    //                                                                                           |
    //------------------------------------ Handel Candel ----------------------------------------+
    //                                                                                           |                                                                                    |
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    //                                                                                           |
    //-------------------------------------------------------------------------------------------+

    ////
    ////
    ////

    //
    //*--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    //*                                     START QUERY
    //*--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    //
    const [tableData, setTableData] = useState([]);

    //Todo[QUEARY] SYNC ALL AVAIABLE DATA
    //*API Setup
    const fetchAvailableDomainsWithMembers = () => {
        return axios.post(getAPI("get-user-for-domain"), { empid: getLoginUserID() }, { headers: { "Content-Type": "application/json", "X-CSRFToken": getCookie("csrftoken") } });
    };

    //*Query Callback
    const {
        isLoading: isLoading_getAvailableDomainsWithMembers,
        data: data_getAvailableDomainsWithMembers,
        isError: isError_getAvailableDomainsWithMembers,
        error: error_getAvailableDomainsWithMembers,
        isFetching: isFetching_getAvailableDomainsWithMembers,
        refetch: refetch_getAvailableDomainsWithMembers,
    } = useQuery("get-user-for-domain-UNIQUE-1", fetchAvailableDomainsWithMembers, {
        enabled: true,
    });

    //*Query Response Actions
    useEffect(() => {
        if (isLoading_getAvailableDomainsWithMembers) {
            logPrint("🔍   getAvailableDomainsWithMembers  ➤  🔄");
        } else if (data_getAvailableDomainsWithMembers?.data) {
            logPrint("🔍   getAvailableDomainsWithMembers  ➤  🟢", data_getAvailableDomainsWithMembers?.data);

            // const domainName = ["Rose", "Romesis", "Nice", "Bad"].map((name) => {
            //     return { value: name, label: name };
            // });

            // setModalBodyConfig({
            //     ...modalBodyConfig,
            //     domain: {
            //         ...modalBodyConfig["domain"],
            //         field_suggetions: Object.keys(data_getAvailableDomainsWithMembers?.data).map((domain_Idx) => {
            //             return {
            //                 value: domain_Idx,
            //                 label: data_getAvailableDomainsWithMembers?.data[domain_Idx]["domain_name"],
            //             };
            //         }),
            //     },
            // });
            setTableData(
                Object.keys(data_getAvailableDomainsWithMembers?.data).map((domain_Idx, index) => {
                    const individual_data = data_getAvailableDomainsWithMembers?.data[domain_Idx];
                    return {
                        key: index + 1,
                        domain: individual_data["domain_name"],
                        members: (
                            <Box>
                                {/* <Tag>a</Tag> <Tag>b</Tag> */}
                                {Object.keys(individual_data["users"] || {}).map((empid, index) => (
                                    <Tag key={index}>{`${individual_data["users"][empid]["name"]} (${empid})`}</Tag>
                                ))}
                            </Box>
                        ),
                    };
                })
            );
        } else if (isError_getAvailableDomainsWithMembers) {
            logPrint("🔍   getAvailableDomainsWithMembers  ➤  ⚠️", [error_getAvailableDomainsWithMembers?.message, error_getAvailableDomainsWithMembers?.response.data]);
        }
    }, [isLoading_getAvailableDomainsWithMembers, data_getAvailableDomainsWithMembers, isError_getAvailableDomainsWithMembers, error_getAvailableDomainsWithMembers]);

    //
    //--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    //

    //Todo[QUEARY] Get all Employee for suggest to add on domain member
    //*API Setup
    const fetchAllEmployee = () => {
        return axios.post(getAPI("get-all-employee-info"), { empid: getLoginUserID() }, { headers: { "Content-Type": "application/json", "X-CSRFToken": getCookie("csrftoken") } });
    };

    //*Query Callback
    const {
        isLoading: isLoading_getAllEmployee,
        data: data_getAllEmployee,
        isError: isError_getAllEmployee,
        error: error_getAllEmployee,
        isFetching: isFetching_getAllEmployee,
        refetch: refetch_getAllEmployee,
    } = useQuery("get-all-employee-info-UNIQUE-2", fetchAllEmployee, {
        enabled: true,
    });

    //*Query Response Actions
    useEffect(() => {
        if (isLoading_getAllEmployee) {
            logPrint("🔍   getAllEmployee  ➤  🔄");
        } else if (data_getAllEmployee?.data) {
            logPrint("🔍   getAllEmployee  ➤  🟢", data_getAllEmployee?.data);
            setModalBodyConfig({
                ...modalBodyConfig,
                members: {
                    ...modalBodyConfig["members"],
                    field_suggetions: Object.keys(data_getAllEmployee?.data).map((empid) => {
                        return {
                            value: empid,
                            label: `${data_getAllEmployee?.data[empid]["name"]} (${empid})`,
                        };
                    }),
                },
            });
        } else if (isError_getAllEmployee) {
            logPrint("🔍   getAllEmployee  ➤  ⚠️", [error_getAllEmployee?.message, error_getAllEmployee?.response.data]);
        }
    }, [isLoading_getAllEmployee, data_getAllEmployee, isError_getAllEmployee, error_getAllEmployee]);

    //
    //--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    //

    //Todo[QUEARY] ADD NEW ENTRY
    //*API Setup
    const fetchAddNewDomainWithMembers = () => {
        return axios.post(getAPI("get-request-by-mention"), { empid: getLoginUserID() }, { headers: { "Content-Type": "application/json", "X-CSRFToken": getCookie("csrftoken") } });
    };

    //*Query Callback
    const {
        isLoading: isLoading_getAddNewDomainWithMembers,
        data: data_getAddNewDomainWithMembers,
        isError: isError_getAddNewDomainWithMembers,
        error: error_getAddNewDomainWithMembers,
        isFetching: isFetching_getAddNewDomainWithMembers,
        refetch: refetch_getAddNewDomainWithMembers,
    } = useQuery("get-request-by-mention-UNIQUE-1", fetchAddNewDomainWithMembers, {
        enabled: false,
    });

    //*Query Response Actions
    useEffect(() => {
        if (isLoading_getAddNewDomainWithMembers) {
            logPrint("🔍   getAddNewDomainWithMembers  ➤  🔄");
        } else if (data_getAddNewDomainWithMembers?.data) {
            logPrint("🔍   getAddNewDomainWithMembers  ➤  🟢", data_getAddNewDomainWithMembers?.data);
            refetch_getAvailableDomainsWithMembers(); //!Refatch data afte creating new
        } else if (isError_getAddNewDomainWithMembers) {
            logPrint("🔍   getAddNewDomainWithMembers  ➤  ⚠️", [error_getAddNewDomainWithMembers?.message, error_getAddNewDomainWithMembers?.response.data]);
        }
    }, [isLoading_getAddNewDomainWithMembers, data_getAddNewDomainWithMembers, isError_getAddNewDomainWithMembers, error_getAddNewDomainWithMembers]);

    //
    //--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    //                                     END QUERY
    //--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    //

    ////
    ////
    ////
    ////
    ////
    ////
    ////
    ////

    // Check Entries data -----------------------------------------------------------------------+
    useEffect(() => {
        if (newEntryInputData) {
            console.log(JSON.stringify(newEntryInputData), "MODAL DATA STORAGE << UPDATE"); //                       |
        } //                                                                                     |
    }, [newEntryInputData]); //                                                                  |
    //-------------------------------------------------------------------------------------------+
    ////
    ////
    ////
    ////
    // Check Modal data structure ---------------------------------------------------------------+
    useEffect(() => {
        if (modalBodyConfig) {
            console.log(modalBodyConfig, "MODAL CONFIG << UPDATE"); //                                      |
        } //                                                                                     |
    }, [modalBodyConfig]); //                                                                    |
    //-------------------------------------------------------------------------------------------+
    ////
    ////
    ////
    ////
    return (
        <Box sx={{ width: "calc(100% - 10px)", margin: "0 0 10px 10px", display: "flex", bgcolor: "white" }}>
            <Box sx={{ display: "flex", justifyContent: "center", flexDirection: "column" }}>
                <CustomModal okayBtnLoading={{ onOkayLoading, setOnOkayLoading }} modalBodyConfig={modalBodyConfig} title={"Add new Doamin"} isModalOpen={isModalOpen} handleOk={handleOk} handleCancel={handleCancel} />
                <DataViewTable table_title="Doamin Table" showModalOnAddBtnClick={showModal} columns={columns} tableData={tableData} />
            </Box>
        </Box>
    );
};

export default IssueTab;
