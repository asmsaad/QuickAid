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
import { message, Tag } from "antd";
//*---------------------------------------------------------------------

// Configure global settings for message notifications
message.config({
    top: 400, // Set the position of the message to be 100px from the top
    // duration: 2,    // Each message will be visible for 2 seconds
    // maxCount: 3,    // Maximum of 3 messages can be shown at once
    // rtl: true,      // Enable right-to-left mode for the message layout
    // prefixCls: 'my-message' // Customize the CSS class prefix for the message component
});

const IssueTab = () => {
    const [messageApi, contextHolder] = message.useMessage();
    const [dependentQueryRun, setDependentQueryRun] = useState(false); //! This state is for reloading data in real-time after adding any domain, which can then be found in the subdomain.
    return (
        <Box sx={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", gap: "20px" }}>
            {contextHolder} {/* Pop Up Message */}
            <DoaminTable messageApi={messageApi} setDependentQueryRun={setDependentQueryRun} />
            <SubDomainTable messageApi={messageApi} dependentQueryRun={dependentQueryRun} setDependentQueryRun={setDependentQueryRun} />
        </Box>
    );
};

const DoaminTable = (props) => {
    const { messageApi, setDependentQueryRun } = props;
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
        domain: null, //                                                                           |
        members: null, //                                                                          |
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
    const [modalBodyConfig, setModalBodyConfig] = useState({
        domain: {
            //? ---------------------------- BASIC------------------------------------------------+
            title: "Domain", // Field title text                                                  |
            fieldType: "InputSuggetion", // Field type                                              |
            dataVariable: "domain", // Variable to store data                                     |
            dataStoragePath: newEntryInputData.domain, // Path to store the data                  |
            placeholderText: "Place your domain name", // Placeholder text for the entry field    |
            //? ------------------------ SCEARCH SUGGETIONS---------------------------------------+
            ignoreSuggestions: true, // If true, ignore suggestions                              |
            suggestionsList: [], // List of suggestions/values                                    |
            //? ---------- FIELD DISABLE CONDITIONS & RESPECT TO VARIABLE ------------------------+
            isFieldDisabled: false, // If true, disables the field based on provided data         |
            disableDataVar: [], // Data used to determine if the field is disabled                |
            disableCheckDataField: null, // Data used to determine if the field is disabled       |
            //? ------------------------ MODAL BUTTON DEPENDENCY ---------------------------------+
            disableOkayButtonIfEmpty: true, // Disables the Okay button if no value is provided   |
        }, //                                                                                     |
        //----------------------------------------------------------------------------------------+
        //
        //
        //
        members: {
            //? ---------------------------- BASIC------------------------------------------------+
            title: "Members", // Field title text                                                  |
            fieldType: "SelectMultiple", // Field type                                              |
            dataVariable: "members", // Variable to store data                                     |
            dataStoragePath: newEntryInputData.members, // Path to store the data                  |
            placeholderText: null, // Placeholder text for the entry field    |
            //? ------------------------ SCEARCH SUGGETIONS---------------------------------------+
            ignoreSuggestions: false, // If true, ignore suggestions                              |
            suggestionsList: [], // List of suggestions/values                                    |
            //? ---------- FIELD DISABLE CONDITIONS & RESPECT TO VARIABLE ------------------------+
            isFieldDisabled: true, // If true, disables the field based on provided data         |
            disableDataVar: "domain", // Data used to determine if the field is disabled                |
            disableCheckDataField: "InputSuggetion", // Data used to determine if the field is disabled       |
            //? ------------------------ MODAL BUTTON DEPENDENCY ---------------------------------+
            disableOkayButtonIfEmpty: true, // Disables the Okay button if no value is provided   |
        }, //                                                                                     |
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
    const [isModalOpen, setIsModalOpen] = useState(false); // Controll modal open/close          |
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
        //!Copy below code to the query error and sucess block
        // setTimeout(() => {
        //     setIsModalOpen(false);
        // }, 1500);
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
            messageApi.open({ key: 1, type: "loading", content: "Fetching domain table data" }); //Message
        } else if (data_getAvailableDomainsWithMembers?.data) {
            logPrint("🔍   getAvailableDomainsWithMembers  ➤  🟢", data_getAvailableDomainsWithMembers?.data);
            messageApi.open({ key: 1, type: "loading", content: "Fetching domain table data" }); //Message

            setModalBodyConfig({
                ...modalBodyConfig,
                domain: {
                    ...modalBodyConfig["domain"],
                    suggestionsList: Object.keys(data_getAvailableDomainsWithMembers?.data).map((domain_Idx) => {
                        return {
                            value: domain_Idx,
                            label: data_getAvailableDomainsWithMembers?.data[domain_Idx]["domain_name"],
                        };
                    }),
                },
            });
            setTableData(
                Object.keys(data_getAvailableDomainsWithMembers?.data).map((domain_Idx, index) => {
                    const individual_data = data_getAvailableDomainsWithMembers?.data[domain_Idx];
                    return {
                        key: index + 1,
                        domain: individual_data["domain_name"],
                        members: (
                            <Box>
                                {Object.keys(individual_data["users"] || {}).map((empid, index) => (
                                    <Tag key={index} style={{ margin: "2px" }}>{`${individual_data["users"][empid]["name"]} (${empid})`}</Tag>
                                ))}
                            </Box>
                        ),
                    };
                })
            );

            setTimeout(() => messageApi.destroy(1), 1000); // Message
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
                    suggestionsList: Object.keys(data_getAllEmployee?.data).map((empid) => {
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
        return axios.post(getAPI("create-new-domain"), { empid: getLoginUserID(), domain_name: newEntryInputData.domain, empid_list: newEntryInputData.members }, { headers: { "Content-Type": "application/json", "X-CSRFToken": getCookie("csrftoken") } });
    };

    //*Query Callback
    const {
        isLoading: isLoading_getAddNewDomainWithMembers,
        data: data_getAddNewDomainWithMembers,
        isError: isError_getAddNewDomainWithMembers,
        error: error_getAddNewDomainWithMembers,
        isFetching: isFetching_getAddNewDomainWithMembers,
        refetch: refetch_getAddNewDomainWithMembers,
    } = useQuery("create-new-domain-UNIQUE-1", fetchAddNewDomainWithMembers, {
        enabled: false,
    });

    //*Query Response Actions
    useEffect(() => {
        if (isLoading_getAddNewDomainWithMembers) {
            logPrint("🔍   getAddNewDomainWithMembers  ➤  🔄");
        } else if (data_getAddNewDomainWithMembers?.data) {
            logPrint("🔍   getAddNewDomainWithMembers  ➤  🟢", data_getAddNewDomainWithMembers?.data);
            messageApi.open({ key: 1, type: "success", content: "Domain created successfully!" });
            setTimeout(() => messageApi.destroy(1), 1000); // Message

            setDependentQueryRun(true); //? This is only for this table to signal other queries outside the scope that need to update when a new domain is added. Essentially, it facilitates subdomain creation without reloading.
            refetch_getAvailableDomainsWithMembers(); //!Refatch data afte creating new

            setTimeout(() => setOnOkayLoading([0]), 1500); //------------------------------------------+
            setTimeout(() => setIsModalOpen(false), 1500); //   STOP ADD BTN LOADER AND MODAL CLOSE    |
            //-----------------------------------------------------------------------------------------+
        } else if (isError_getAddNewDomainWithMembers) {
            logPrint("🔍   getAddNewDomainWithMembers  ➤  ⚠️", [error_getAddNewDomainWithMembers?.message, error_getAddNewDomainWithMembers?.response.data]);
            setTimeout(() => setOnOkayLoading([0]), 1500); //------------------------------------------+
            setTimeout(() => setIsModalOpen(false), 1500); //   STOP ADD BTN LOADER AND MODAL CLOSE    |
            //-----------------------------------------------------------------------------------------+
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
        <Box sx={{ width: "100%", display: "flex", flexDirection: "column" }}>
            <CustomModal newEntryInputData={newEntryInputData} setNewEntryInputData={setNewEntryInputData} okayBtnLoading={{ onOkayLoading, setOnOkayLoading }} modalBodyConfig={modalBodyConfig} title={"Add new Doamin"} isModalOpen={isModalOpen} handleOk={handleOk} handleCancel={handleCancel} />
            <DataViewTable table_title="Doamin Table" showModalOnAddBtnClick={showModal} columns={columns} tableData={tableData} />
        </Box>
    );
};

////
////
////
////
////
////
////
////
////
////
////
////
////
////
////
////
////
////
////
////
////
////
////
////

const SubDomainTable = (props) => {
    const { messageApi, dependentQueryRun, setDependentQueryRun } = props;
    //*------------------------------------------------------------------------------------------+
    //*                                  TABLE CONFIGURATION                                     |
    //*------------------------------------------------------------------------------------------+
    //                                                                                           |
    const columns = {
        1: { title: "Domain", width: "250px" },
        2: { title: "Sub Domain", width: "250px" },
        3: { title: "Members", width: "" },
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
        subdomain: "", //                                                                           |
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
    //                                                                                           |
    const [modalBodyConfig, setModalBodyConfig] = useState({
        domain: {
            //? ---------------------------- BASIC------------------------------------------------+
            title: "Domain", // Field title text                                                  |
            fieldType: "SelectSingle", // Field type                                              |
            dataVariable: "domain", // Variable to store data                                     |
            dataStoragePath: newEntryInputData.domain, // Path to store the data                  |
            placeholderText: "Place your domain name", // Placeholder text for the entry field    |
            //? ------------------------ SCEARCH SUGGETIONS---------------------------------------+
            ignoreSuggestions: false, // If true, ignore suggestions                              |
            suggestionsList: [], // List of suggestions/values                                    |
            //? ---------- FIELD DISABLE CONDITIONS & RESPECT TO VARIABLE ------------------------+
            isFieldDisabled: false, // If true, disables the field based on provided data         |
            disableDataVar: [], // Data used to determine if the field is disabled                |
            disableCheckDataField: null, // Data used to determine if the field is disabled       |
            //? ------------------------ MODAL BUTTON DEPENDENCY ---------------------------------+
            disableOkayButtonIfEmpty: true, // Disables the Okay button if no value is provided   |
        }, //                                                                                     |
        //----------------------------------------------------------------------------------------+
        //
        //
        //
        subdomain: {
            //? ---------------------------- BASIC------------------------------------------------+
            title: "Sub-Domain", // Field title text                                              |
            fieldType: "InputSuggetion", // Field type                                                     |
            dataVariable: "subdomain", // Variable to store data                                  |
            dataStoragePath: newEntryInputData.subdomain, // Path to store the data               |
            placeholderText: "Place your subdomain name ..", // Placeholder text for the entry field
            //? ------------------------ SCEARCH SUGGETIONS---------------------------------------+
            ignoreSuggestions: true, // If true, ignore suggestions                              |
            suggestionsList: [], // List of suggestions/values                                    |
            //? ---------- FIELD DISABLE CONDITIONS & RESPECT TO VARIABLE ------------------------+
            isFieldDisabled: true, // If true, disables the field based on provided data          |
            disableDataVar: "domain", // Data used to determine if the field is disabled          |
            disableCheckDataField: "SelectSingle", // Data used to determine if the field is disabled
            //? ------------------------ MODAL BUTTON DEPENDENCY ---------------------------------+
            disableOkayButtonIfEmpty: true, // Disables the Okay button if no value is provided   |
        }, //                                                                                     |
        //----------------------------------------------------------------------------------------+
        //
        //
        //
        members: {
            //? ---------------------------- BASIC------------------------------------------------+
            title: "Members", // Field title text                                                 |
            fieldType: "SelectMultiple", // Field type                                            |
            dataVariable: "members", // Variable to store data                                    |
            dataStoragePath: newEntryInputData.members, // Path to store the data                 |
            placeholderText: null, // Placeholder text for the entry field                        |
            //? ------------------------ SCEARCH SUGGETIONS---------------------------------------+
            ignoreSuggestions: false, // If true, ignore suggestions                              |
            suggestionsList: [], // List of suggestions/values                                    |
            //? ---------- FIELD DISABLE CONDITIONS & RESPECT TO VARIABLE ------------------------+
            isFieldDisabled: true, // If true, disables the field based on provided data          |
            disableDataVar: "subdomain", // Data used to determine if the field is disabled       |
            disableCheckDataField: "Input", // Data used to determine if the field is disabled    |
            //? ------------------------ MODAL BUTTON DEPENDENCY ---------------------------------+
            disableOkayButtonIfEmpty: true, // Disables the Okay button if no value is provided   |
        }, //                                                                                     |
    }); //                                                                                        |
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
    const [isModalOpen, setIsModalOpen] = useState(false); // Controll modal open/close          |
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
        refetch_getAddNewSubdomainUnderDomainWithMembers(); //*Trigred add domain with members query
        console.log("press on okay");
        //!Copy below code to the query error and sucess block
        // setTimeout(() => {
        //     setIsModalOpen(false);
        //     setOnOkayLoading([0])
        // }, 1500);
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
    const fetchAvailableSubDomainsUnderDomainsWithMembers = () => {
        return axios.post(getAPI("get-subdomain-users-by-domain"), { empid: getLoginUserID(), domain_ids: [] }, { headers: { "Content-Type": "application/json", "X-CSRFToken": getCookie("csrftoken") } });
    };

    //*Query Callback
    const {
        isLoading: isLoading_getAvailableSubDomainsUnderDomainsWithMembers,
        data: data_getAvailableSubDomainsUnderDomainsWithMembers,
        isError: isError_getAvailableSubDomainsUnderDomainsWithMembers,
        error: error_getAvailableSubDomainsUnderDomainsWithMembers,
        isFetching: isFetching_getAvailableSubDomainsUnderDomainsWithMembers,
        refetch: refetch_getAvailableSubDomainsUnderDomainsWithMembers,
    } = useQuery("get-subdomain-users-by-domain-UNIQUE-1", fetchAvailableSubDomainsUnderDomainsWithMembers, {
        enabled: true,
    });

    //*Query Response Actions
    useEffect(() => {
        if (isLoading_getAvailableSubDomainsUnderDomainsWithMembers) {
            logPrint("🔍   getAvailableSubDomainsUnderDomainsWithMembers  ➤  🔄");
            messageApi.open({ key: 3, type: "loading", content: "Fetching sub-domain table data" }); // Message
        } else if (data_getAvailableSubDomainsUnderDomainsWithMembers?.data) {
            logPrint("🔍   getAvailableSubDomainsUnderDomainsWithMembers  ➤  🟢", data_getAvailableSubDomainsUnderDomainsWithMembers?.data);
            messageApi.open({ key: 3, type: "loading", content: "Fetching sub-domain table data" }); // Message

            setModalBodyConfig({
                ...modalBodyConfig,
                domain: {
                    ...modalBodyConfig["domain"],
                    suggestionsList: Object.keys(data_getAvailableSubDomainsUnderDomainsWithMembers?.data).map((domain_Idx) => {
                        console.log(data_getAvailableSubDomainsUnderDomainsWithMembers?.data[domain_Idx]["domain_name"], "GHGHG");
                        return {
                            value: domain_Idx,
                            label: data_getAvailableSubDomainsUnderDomainsWithMembers?.data[domain_Idx]["domain_name"],
                        };
                    }),
                },
            });

            const arranged_data = Object.keys(data_getAvailableSubDomainsUnderDomainsWithMembers?.data || {})
                .map((domain_Idx) => {
                    const domain_name = data_getAvailableSubDomainsUnderDomainsWithMembers?.data[domain_Idx]["domain_name"];
                    const all_subdomain_data = data_getAvailableSubDomainsUnderDomainsWithMembers?.data[domain_Idx]["subdomains"];

                    return Object.keys(all_subdomain_data || {}).map((subdomain_idx) => {
                        const individuals_subdomain_data = all_subdomain_data[subdomain_idx];
                        const subdomain_name = individuals_subdomain_data["subdomain_name"];

                        // Debugging individual user data
                        (individuals_subdomain_data["users"] || []).forEach((individuals_data) => {
                            console.log(individuals_data, "GGHHJJKKLL");
                        });

                        // Returning structured data
                        return {
                            key: subdomain_idx,
                            domain: domain_name,
                            sub_domain: subdomain_name,
                            members: (
                                <Box>
                                    {(individuals_subdomain_data["users"] || []).map((individuals_data, index) => {
                                        return <Tag key={index} style={{ margin: "2px" }}>{`${individuals_data["name"]} (${individuals_data["empid"]})`}</Tag>;
                                    })}
                                </Box>
                            ),
                        };
                    });
                })
                .flat();

            setTableData(arranged_data);
            setTimeout(() => messageApi.destroy(3), 1000); // Message
        } else if (isError_getAvailableSubDomainsUnderDomainsWithMembers) {
            logPrint("🔍   getAvailableSubDomainsUnderDomainsWithMembers  ➤  ⚠️", [error_getAvailableSubDomainsUnderDomainsWithMembers?.message, error_getAvailableSubDomainsUnderDomainsWithMembers?.response.data]);
        }
    }, [isLoading_getAvailableSubDomainsUnderDomainsWithMembers, data_getAvailableSubDomainsUnderDomainsWithMembers, isError_getAvailableSubDomainsUnderDomainsWithMembers, error_getAvailableSubDomainsUnderDomainsWithMembers]);

    //
    //--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    //

    //Todo[QUEARY] Get all employees respective to the domain name for suggesting additions to subdomain members [This API calls the domain table API].
    //*API Setup
    const fetchAvailableDomainsWithMembers = () => {
        setDependentQueryRun(false); //! This query needs to update when a new domain is added from another table component. After execution, it should stop to prevent nesting. This will be true only if the domain contains new data.
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
    } = useQuery("get-user-for-domain-UNIQUE-2", fetchAvailableDomainsWithMembers, {
        enabled: true,
    });

    //*Query Response Actions
    useEffect(() => {
        if (isLoading_getAvailableDomainsWithMembers) {
            logPrint("🔍   getAvailableDomainsWithMembers  ➤  🔄");
        } else if (data_getAvailableDomainsWithMembers?.data) {
            logPrint("🔍   getAvailableDomainsWithMembers  ➤  🟢", data_getAvailableDomainsWithMembers?.data);
        } else if (isError_getAvailableDomainsWithMembers) {
            logPrint("🔍   getAvailableDomainsWithMembers  ➤  ⚠️", [error_getAvailableDomainsWithMembers?.message, error_getAvailableDomainsWithMembers?.response.data]);
        }
    }, [isLoading_getAvailableDomainsWithMembers, data_getAvailableDomainsWithMembers, isError_getAvailableDomainsWithMembers, error_getAvailableDomainsWithMembers]);

    //
    //--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    //

    //Todo[QUEARY] ADD NEW ENTRY
    //*API Setup
    const fetchAddNewSubdomainUnderDomainWithMembers = () => {
        console.log({ empid: getLoginUserID(), domain_id: newEntryInputData.domain, sub_domain_name: newEntryInputData.subdomain, empid_list: newEntryInputData.members }, "AM1MAR");
        return axios.post(getAPI("create-new-sub-domain"), { empid: getLoginUserID(), domain_id: newEntryInputData.domain, sub_domain_name: newEntryInputData.subdomain, empid_list: newEntryInputData.members }, { headers: { "Content-Type": "application/json", "X-CSRFToken": getCookie("csrftoken") } });
    };

    //*Query Callback
    const {
        isLoading: isLoading_getAddNewSubdomainUnderDomainWithMembers,
        data: data_getAddNewSubdomainUnderDomainWithMembers,
        isError: isError_getAddNewSubdomainUnderDomainWithMembers,
        error: error_getAddNewSubdomainUnderDomainWithMembers,
        isFetching: isFetching_getAddNewSubdomainUnderDomainWithMembers,
        refetch: refetch_getAddNewSubdomainUnderDomainWithMembers,
    } = useQuery("create-new-sub-domain-UNIQUE-1", fetchAddNewSubdomainUnderDomainWithMembers, {
        enabled: false,
    });

    //*Query Response Actions
    useEffect(() => {
        if (isLoading_getAddNewSubdomainUnderDomainWithMembers) {
            logPrint("🔍   getAddNewSubdomainUnderDomainWithMembers  ➤  🔄");
        } else if (data_getAddNewSubdomainUnderDomainWithMembers?.data) {
            logPrint("🔍   getAddNewSubdomainUnderDomainWithMembers  ➤  🟢", data_getAddNewSubdomainUnderDomainWithMembers?.data);
            messageApi.open({ key: 1, type: "success", content: "Subdomain created successfully!" });
            setTimeout(() => messageApi.destroy(1), 1000); // Message
            refetch_getAvailableSubDomainsUnderDomainsWithMembers(); //!Refatch data afte creating new
            setTimeout(() => setOnOkayLoading([0]), 1500); //------------------------------------------+
            setTimeout(() => setIsModalOpen(false), 1500); //   STOP ADD BTN LOADER AND MODAL CLOSE    |
            //-----------------------------------------------------------------------------------------+
        } else if (isError_getAddNewSubdomainUnderDomainWithMembers) {
            logPrint("🔍   getAddNewSubdomainUnderDomainWithMembers  ➤  ⚠️", [error_getAddNewSubdomainUnderDomainWithMembers?.message, error_getAddNewSubdomainUnderDomainWithMembers?.response.data]);
            setTimeout(() => setOnOkayLoading([0]), 1500); //------------------------------------------+
            setTimeout(() => setIsModalOpen(false), 1500); //   STOP ADD BTN LOADER AND MODAL CLOSE    |
            //-----------------------------------------------------------------------------------------+
        }
    }, [isLoading_getAddNewSubdomainUnderDomainWithMembers, data_getAddNewSubdomainUnderDomainWithMembers, isError_getAddNewSubdomainUnderDomainWithMembers, error_getAddNewSubdomainUnderDomainWithMembers]);

    //
    //--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    //                                     END QUERY
    //--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    //
    // Check Entries data -----------------------------------------------------------------------+
    useEffect(() => {
        if (newEntryInputData.domain !== "" && data_getAvailableSubDomainsUnderDomainsWithMembers?.data && data_getAvailableDomainsWithMembers?.data) {
            const selected_domain_Idx = newEntryInputData.domain;
            const selected_domain_info = data_getAvailableSubDomainsUnderDomainsWithMembers?.data[selected_domain_Idx]?.["subdomains"];
            const selected_domain_members = data_getAvailableDomainsWithMembers?.data[selected_domain_Idx]?.["users"];

            setModalBodyConfig({
                ...modalBodyConfig,
                subdomain: {
                    ...modalBodyConfig["subdomain"],
                    suggestionsList: Object.keys(selected_domain_info || {}).map((subdomain_idx) => {
                        return {
                            value: subdomain_idx,
                            label: selected_domain_info[subdomain_idx]["subdomain_name"],
                        };
                    }),
                },
                members: {
                    ...modalBodyConfig["members"],
                    suggestionsList: Object.keys(selected_domain_members || {}).map((empid) => ({
                        value: empid,
                        label: `${selected_domain_members[empid]["name"]} (${empid})`,
                    })),
                },
            });
        } //                                                                                     |
    }, [newEntryInputData, data_getAvailableSubDomainsUnderDomainsWithMembers, data_getAvailableDomainsWithMembers]); //                                                                  |
    //-------------------------------------------------------------------------------------------+
    ////
    // ---------------------- DEPENDENT ON TOPBLOCK TO TRIGGER QUERY ----------------------------+
    //? If a new domain name is added, it will trigger the query. After triggering, the value    |
    //? of the triggering query will be set to false.                                            |
    useEffect(() => {
        if (dependentQueryRun) {
            refetch_getAvailableDomainsWithMembers();
        } //                                                                                     |
    }, [dependentQueryRun]); //                                                                  |
    //-------------------------------------------------------------------------------------------+

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
            console.log(JSON.stringify(newEntryInputData), "MODAL DATA 1STORAGE << UPDATE"); //                       |
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
    // Check Modal data structure ---------------------------------------------------------------+
    useEffect(() => {
        if (tableData) {
            console.log(tableData, "Table data -- getAvailableSubDomainsUnderDomainsWithMembers"); //                                      |
        } //                                                                                     |
    }, [tableData]); //                                                                    |
    //-------------------------------------------------------------------------------------------+
    ////
    ////
    ////
    ////
    return (
        <Box sx={{ width: "100%", display: "flex", flexDirection: "column" }}>
            <CustomModal newEntryInputData={newEntryInputData} setNewEntryInputData={setNewEntryInputData} okayBtnLoading={{ onOkayLoading, setOnOkayLoading }} modalBodyConfig={modalBodyConfig} title={"Add new Doamin"} isModalOpen={isModalOpen} handleOk={handleOk} handleCancel={handleCancel} />
            <DataViewTable table_title="Sub-Domain Table" showModalOnAddBtnClick={showModal} columns={columns} tableData={tableData} />
        </Box>
    );
};

export default IssueTab;
