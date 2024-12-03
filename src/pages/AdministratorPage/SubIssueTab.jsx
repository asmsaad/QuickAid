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

const SubIssueTab = () => {
    const [messageApi, contextHolder] = message.useMessage();
    const [dependentQueryRun, setDependentQueryRun] = useState(false); //! This state is for reloading data in real-time after adding any domain, which can then be found in the subdomain.
    return (
        <Box sx={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", gap: "20px" }}>
            {contextHolder} {/* Pop Up Message */}
            <IssueCategoryTable messageApi={messageApi} setDependentQueryRun={setDependentQueryRun} />
        </Box>
    );
};

const IssueCategoryTable = (props) => {
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
        2: { title: "Subdomain", width: "250px" },
        3: { title: "Issue Category", width: "250px" },
        4: { title: "Members", width: "" },
        5: { title: "Statistics", width: "100px" },
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
        subdomain: null, //                                                                           |
        issueCategory: null, //                                                                           |
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
            fieldType: "SelectSingle", // Field type                                              |
            dataVariable: "domain", // Variable to store data                                     |
            dataStoragePath: newEntryInputData.domain, // Path to store the data                  |
            placeholderText: "Select domain from dorpdown", // Placeholder text for the entry field    |
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
            title: "Subdomain", // Field title text                                                  |
            fieldType: "SelectSingle", // Field type                                              |
            dataVariable: "subdomain", // Variable to store data                                     |
            dataStoragePath: newEntryInputData.subdomain, // Path to store the data                  |
            placeholderText: "Select subdomains from dropdown", // Placeholder text for the entry field    |
            //? ------------------------ SCEARCH SUGGETIONS---------------------------------------+
            ignoreSuggestions: false, // If true, ignore suggestions                              |
            suggestionsList: [], // List of suggestions/values                                    |
            //? ---------- FIELD DISABLE CONDITIONS & RESPECT TO VARIABLE ------------------------+
            isFieldDisabled: true, // If true, disables the field based on provided data         |
            disableDataVar: "domain", // Data used to determine if the field is disabled                |
            disableCheckDataField: "SelectSingle", // Data used to determine if the field is disabled       |
            //? ------------------------ MODAL BUTTON DEPENDENCY ---------------------------------+
            disableOkayButtonIfEmpty: true, // Disables the Okay button if no value is provided   |
        }, //                                                                                     |
        //----------------------------------------------------------------------------------------+
        //
        //
        //
        issueCategory: {
            //? ---------------------------- BASIC------------------------------------------------+
            title: "Issue Category", // Field title text                                                  |
            fieldType: "InputSuggetion", // Field type                                              |
            dataVariable: "issueCategory", // Variable to store data                                     |
            dataStoragePath: newEntryInputData.issueCategory, // Path to store the data                  |
            placeholderText: "Place your domain name", // Placeholder text for the entry field    |
            //? ------------------------ SCEARCH SUGGETIONS---------------------------------------+
            ignoreSuggestions: true, // If true, ignore suggestions                              |
            suggestionsList: [], // List of suggestions/values                                    |
            //? ---------- FIELD DISABLE CONDITIONS & RESPECT TO VARIABLE ------------------------+
            isFieldDisabled: true, // If true, disables the field based on provided data         |
            disableDataVar: "subdomain", // Data used to determine if the field is disabled                |
            disableCheckDataField: "SelectSingle", // Data used to determine if the field is disabled       |
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
            placeholderText: "Select member", // Placeholder text for the entry field    |
            //? ------------------------ SCEARCH SUGGETIONS---------------------------------------+
            ignoreSuggestions: false, // If true, ignore suggestions                              |
            suggestionsList: [], // List of suggestions/values                                    |
            //? ---------- FIELD DISABLE CONDITIONS & RESPECT TO VARIABLE ------------------------+
            isFieldDisabled: true, // If true, disables the field based on provided data         |
            disableDataVar: "issueCategory", // Data used to determine if the field is disabled                |
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
        refetch_getAddNewIssueCategoryWithMembersUnderSubdomain(); //*Trigred add domain with members query
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
    const fetchAllIssueCategoryWithStatistics = () => {
        return axios.post(getAPI("get-all-issue-category-with-summary"), { empid: getLoginUserID() }, { headers: { "Content-Type": "application/json", "X-CSRFToken": getCookie("csrftoken") } });
    };

    //*Query Callback
    const {
        isLoading: isLoading_getAllIssueCategoryWithStatistics,
        data: data_getAllIssueCategoryWithStatistics,
        isError: isError_getAllIssueCategoryWithStatistics,
        error: error_getAllIssueCategoryWithStatistics,
        isFetching: isFetching_getAllIssueCategoryWithStatistics,
        refetch: refetch_getAllIssueCategoryWithStatistics,
    } = useQuery("get-all-issue-category-with-summary-UNIQUE-1", fetchAllIssueCategoryWithStatistics, {
        enabled: true,
    });

    //*Query Response Actions
    useEffect(() => {
        if (isLoading_getAllIssueCategoryWithStatistics) {
            logPrint("🔍   getAllIssueCategoryWithStatistics  ➤  🔄");
            messageApi.open({ key: 1, type: "loading", content: "Fetching issue category table data" }); //Message
        } else if (data_getAllIssueCategoryWithStatistics?.data) {
            logPrint("🔍   getAllIssueCategoryWithStatistics  ➤  🟢", data_getAllIssueCategoryWithStatistics?.data);
            messageApi.open({ key: 1, type: "loading", content: "Fetching issue category table data" }); //Message

            setTableData(
                Object.keys(data_getAllIssueCategoryWithStatistics?.data)
                    .map((domain_idx, index) => {
                        const domain_info = data_getAllIssueCategoryWithStatistics?.data[domain_idx];
                        const domain_name = domain_info["domain_name"];

                        return Object.keys(domain_info["sub_domains"])
                            .map((subdomain_idx, index_) => {
                                const subdomain_info = domain_info["sub_domains"][subdomain_idx];
                                const subdomain_name = subdomain_info["subdomain_name"];
                                return Object.keys(subdomain_info["services"]).map((issue_category_idx, index__) => {
                                    const issue_category_info = subdomain_info["services"][issue_category_idx];

                                    return {
                                        key: `${index}${index_}${index__}`,
                                        domain: domain_name,
                                        subdomain: subdomain_name,
                                        issue_category: issue_category_info["service_name"],
                                        members: (
                                            <Box>
                                                {Object.keys(issue_category_info["members"] || {}).map((empid) => (
                                                    <Tag key={empid} style={{ margin: "2px" }}>{`${issue_category_info["members"][empid]} (${empid})`}</Tag>
                                                ))}
                                            </Box>
                                        ),

                                        statistics: (
                                            <Box>
                                                <Tag>{issue_category_info["total_requests"]}</Tag>
                                                <Tag>{issue_category_info["closed_requests"]}</Tag>
                                            </Box>
                                        ),
                                    };
                                });
                            })
                            .flat();
                    })
                    .flat()
            );

            setTimeout(() => messageApi.destroy(1), 1000); // Message
        } else if (isError_getAllIssueCategoryWithStatistics) {
            logPrint("🔍   getAllIssueCategoryWithStatistics  ➤  ⚠️", [error_getAllIssueCategoryWithStatistics?.message, error_getAllIssueCategoryWithStatistics?.response.data]);
        }
    }, [isLoading_getAllIssueCategoryWithStatistics, data_getAllIssueCategoryWithStatistics, isError_getAllIssueCategoryWithStatistics, error_getAllIssueCategoryWithStatistics]);

    //
    //--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    //

    //Todo[QUEARY] SYNC ALL AVAIABLE FROM SUBDOMAIN TABLE(This is for modal data suggetion)
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
    } = useQuery("get-subdomain-users-by-domain-UNIQUE-2", fetchAvailableSubDomainsUnderDomainsWithMembers, {
        enabled: true,
    });

    //*Query Response Actions
    useEffect(() => {
        if (isLoading_getAvailableSubDomainsUnderDomainsWithMembers) {
            logPrint("🔍   getAvailableSubDomainsUnderDomainsWithMembers  ➤  🔄");
        } else if (data_getAvailableSubDomainsUnderDomainsWithMembers?.data) {
            logPrint("🔍   getAvailableSubDomainsUnderDomainsWithMembers  ➤  🟢", data_getAvailableSubDomainsUnderDomainsWithMembers?.data);

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
        } else if (isError_getAvailableSubDomainsUnderDomainsWithMembers) {
            logPrint("🔍   getAvailableSubDomainsUnderDomainsWithMembers  ➤  ⚠️", [error_getAvailableSubDomainsUnderDomainsWithMembers?.message, error_getAvailableSubDomainsUnderDomainsWithMembers?.response.data]);
        }
    }, [isLoading_getAvailableSubDomainsUnderDomainsWithMembers, data_getAvailableSubDomainsUnderDomainsWithMembers, isError_getAvailableSubDomainsUnderDomainsWithMembers, error_getAvailableSubDomainsUnderDomainsWithMembers]);

    //
    //--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    //

    //Todo[QUEARY] ADD NEW ENTRY
    //*API Setup
    const fetchAddNewIssueCategoryWithMembersUnderSubdomain = () => {
        return axios.post(getAPI("create-new-issue-category"), { empid: getLoginUserID(), sub_domain_id: newEntryInputData.subdomain, service_name: newEntryInputData.issueCategory, empid_list: newEntryInputData.members }, { headers: { "Content-Type": "application/json", "X-CSRFToken": getCookie("csrftoken") } });
    };

    //*Query Callback
    const {
        isLoading: isLoading_getAddNewIssueCategoryWithMembersUnderSubdomain,
        data: data_getAddNewIssueCategoryWithMembersUnderSubdomain,
        isError: isError_getAddNewIssueCategoryWithMembersUnderSubdomain,
        error: error_getAddNewIssueCategoryWithMembersUnderSubdomain,
        isFetching: isFetching_getAddNewIssueCategoryWithMembersUnderSubdomain,
        refetch: refetch_getAddNewIssueCategoryWithMembersUnderSubdomain,
    } = useQuery("create-new-issue-category-UNIQUE-1", fetchAddNewIssueCategoryWithMembersUnderSubdomain, {
        enabled: false,
    });

    //*Query Response Actions
    useEffect(() => {
        if (isLoading_getAddNewIssueCategoryWithMembersUnderSubdomain) {
            logPrint("🔍   getAddNewIssueCategoryWithMembersUnderSubdomain  ➤  🔄");
        } else if (data_getAddNewIssueCategoryWithMembersUnderSubdomain?.data) {
            logPrint("🔍   getAddNewIssueCategoryWithMembersUnderSubdomain  ➤  🟢", data_getAddNewIssueCategoryWithMembersUnderSubdomain?.data);
            messageApi.open({ key: 1, type: "success", content: "Issue category created successfully!" });
            setTimeout(() => messageApi.destroy(1), 1000); // Message

            refetch_getAllIssueCategoryWithStatistics(); //!Refatch data afte creating new

            setTimeout(() => setOnOkayLoading([0]), 1500); //------------------------------------------+
            setTimeout(() => setIsModalOpen(false), 1500); //   STOP ADD BTN LOADER AND MODAL CLOSE    |
            //-----------------------------------------------------------------------------------------+
        } else if (isError_getAddNewIssueCategoryWithMembersUnderSubdomain) {
            logPrint("🔍   getAddNewIssueCategoryWithMembersUnderSubdomain  ➤  ⚠️", [error_getAddNewIssueCategoryWithMembersUnderSubdomain?.message, error_getAddNewIssueCategoryWithMembersUnderSubdomain?.response.data]);
            setTimeout(() => setOnOkayLoading([0]), 1500); //------------------------------------------+
            setTimeout(() => setIsModalOpen(false), 1500); //   STOP ADD BTN LOADER AND MODAL CLOSE    |
            //-----------------------------------------------------------------------------------------+
        }
    }, [isLoading_getAddNewIssueCategoryWithMembersUnderSubdomain, data_getAddNewIssueCategoryWithMembersUnderSubdomain, isError_getAddNewIssueCategoryWithMembersUnderSubdomain, error_getAddNewIssueCategoryWithMembersUnderSubdomain]);

    //
    //--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    //                                     END QUERY
    //--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    //

    ////
    ////
    ////
    ////
    // Check Entries data -----------------------------------------------------------------------+
    useEffect(() => {
        if (newEntryInputData.domain && newEntryInputData.domain !== null && newEntryInputData.domain !== "") {
            setModalBodyConfig({
                ...modalBodyConfig,
                subdomain: {
                    ...modalBodyConfig["subdomain"],
                    suggestionsList: (() => {
                        const domain_Idx = newEntryInputData.domain;
                        console.log(data_getAvailableSubDomainsUnderDomainsWithMembers?.data[domain_Idx]["domain_name"], "GHGHG");
                        const all_subdomain_data = data_getAvailableSubDomainsUnderDomainsWithMembers?.data[domain_Idx]["subdomains"];

                        return Object.keys(all_subdomain_data || {}).map((subdomain_idx) => {
                            const individuals_subdomain_data = all_subdomain_data[subdomain_idx];
                            const subdomain_name = individuals_subdomain_data["subdomain_name"];

                            return {
                                value: subdomain_idx,
                                label: subdomain_name,
                            };
                        });
                    })(), // Immediately invoked function to compute the value
                },
            });
        }

        if (newEntryInputData.domain && newEntryInputData.domain !== null && newEntryInputData.domain !== "" && newEntryInputData.subdomain && newEntryInputData.subdomain !== null && newEntryInputData.subdomain !== "") {
            setModalBodyConfig({
                ...modalBodyConfig,
                issueCategory: {
                    ...modalBodyConfig["issueCategory"],

                    suggestionsList: (() => {
                        const domain_idx = newEntryInputData.domain;
                        const domain_info = data_getAllIssueCategoryWithStatistics?.data[domain_idx];
                        const domain_name = domain_info["domain_name"];

                        const subdomain_idx = newEntryInputData.subdomain;

                        const subdomain_info = domain_info["sub_domains"][subdomain_idx];
                        const subdomain_name = subdomain_info["subdomain_name"];
                        return Object.keys(subdomain_info["services"]).map((issue_category_idx, index__) => {
                            const issue_category_info = subdomain_info["services"][issue_category_idx];

                            return {
                                value: issue_category_idx,
                                label: issue_category_info["service_name"],
                            };
                        });
                    })(), // Immediately invoked function to compute the value
                },
            });
        }

        if (newEntryInputData.issueCategory && newEntryInputData.issueCategory !== null && newEntryInputData.issueCategory !== "" && newEntryInputData.subdomain && newEntryInputData.subdomain !== null && newEntryInputData.subdomain !== "" && newEntryInputData.domain && newEntryInputData.domain !== null && newEntryInputData.domain !== "") {
            setModalBodyConfig({
                ...modalBodyConfig,
                members: {
                    ...modalBodyConfig["members"],
                    suggestionsList: (() => {
                        const domain_Idx = newEntryInputData.domain;
                        const subdomain_idx = newEntryInputData.subdomain;
                        console.log(data_getAvailableSubDomainsUnderDomainsWithMembers?.data[domain_Idx]?.["domain_name"], "GHGHG");
                        const all_subdomain_data = data_getAvailableSubDomainsUnderDomainsWithMembers?.data[domain_Idx]?.["subdomains"];

                        const individuals_subdomain_data = all_subdomain_data[subdomain_idx];

                        // Map over the "users" array and return the transformed objects
                        return (individuals_subdomain_data["users"] || []).map((individuals_data) => ({
                            value: individuals_data["empid"],
                            label: `${individuals_data["name"]} (${individuals_data["empid"]})`,
                        }));
                    })(), // Immediately invoked function to compute the value
                },
            });
        }
    }, [newEntryInputData]);
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
            console.log(modalBodyConfig, "MODAL *CONFIG << UPDATE"); //                                      |
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
            console.log(tableData, "Table data -- TTFFG"); //                                      |
        } //                                                                                     |
    }, [tableData]); //                                                                    |
    //-------------------------------------------------------------------------------------------+
    ////
    ////
    ////
    ////
    return (
        <Box sx={{ width: "100%", display: "flex", flexDirection: "column" }}>
            <CustomModal title={"Add new Issue category"} newEntryInputData={newEntryInputData} setNewEntryInputData={setNewEntryInputData} okayBtnLoading={{ onOkayLoading, setOnOkayLoading }} modalBodyConfig={modalBodyConfig} isModalOpen={isModalOpen} handleOk={handleOk} handleCancel={handleCancel} />
            <DataViewTable table_title={"Issue Category Table"} showModalOnAddBtnClick={showModal} columns={columns} tableData={tableData} />
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

export default SubIssueTab;
