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
    const doaminName = ["Cat", "Camel", "Bad", "Bat"].map((name) => {
        return { value: name, label: name };
    });

    ////
    ////
    ////
    ////

    //* TABLE CONFIGURATION ---------------------------------------------------------------------+
    const columns = {
        1: { title: "Domain", width: "250px" }, //                                               |
        2: { title: "Members", width: "" }, //                                                   |
    }; //                                                                                        |
    //-------------------------------------------------------------------------------------------+

    ////
    ////
    ////
    ////

    //* MODAL FORM STRUCTURE AND CONDITIONS -----------------------------------------------------+
    // Inital From Entries values ---------------------------------------------------------------+
    const initial_entryInputData = {
        domain: "", //                                                                           |
        members: [], //                                                                          |
    }; //                                                                                        |
    // Entries values ---------------------------------------------------------------------------+
    const [newEntryInputData, setNewEntryInputData] = useState(initial_entryInputData); //       |
    const [modalBodyConfig, setModalBodyConfig] = useState({
        doamin: {
            title: "Domain",
            field: "InputSuggetion",
            field_suggetions: doaminName,
            field_suggetions_ignore: true,
            data_update_at: { newEntryInputData, setNewEntryInputData },
            data_update_var: "domain",
            value_update_var: newEntryInputData.domain,
            okay_button_disable_at_empty: true,
        },
        members: {
            title: "Members",
            field: "SelectMultiple",
            field_suggetions: doaminName,
            field_suggetions_ignore: false,
            data_update_at: { newEntryInputData, setNewEntryInputData },
            data_update_var: "members",
            value_update_var: newEntryInputData.members,
            okay_button_disable_at_empty: true,
        },
    });

    ////
    ////
    ////
    ////
    ////
    //* CREATE FORM @ MODAL SETUP AND FUNCTIONALITY ---------------------------------------------+
    const [onOkayLoading, setOnOkayLoading] = useState([0]); // For modal okay button loading    |
    const [isModalOpen, setIsModalOpen] = useState(false); // Controll modal open/close           |
    // Show Modal -------------------------------------------------------------------------------+
    const showModal = () => {
        setIsModalOpen(true); //                                                                 |
    }; //                                                                                        |
    // Handel OK --------------------------------------------------------------------------------+
    const handleOk = () => {
        refetch_getAddNewDomainWithMembers(); //*Trigred add domain with members query            |
        console.log("press on okay"); //                                                         |
        setTimeout(() => {
            setIsModalOpen(false); //                                                            |
        }, 1500); //                                                                             |
    }; //
    // Handel Candel ----------------------------------------------------------------------------+                                                                                        |
    const handleCancel = () => {
        //                                                                                       |
        setIsModalOpen(false); //                                                                |
    }; //                                                                                        |
    //-------------------------------------------------------------------------------------------+

    ////
    ////
    ////
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

            setModalBodyConfig({
                ...modalBodyConfig,
                field_suggetions: Object.keys(data_getAvailableDomainsWithMembers?.data).map((domain_Idx) => {
                    return {
                        value: domain_Idx,
                        label: data_getAvailableDomainsWithMembers?.data[domain_Idx]["domain_name"],
                    };
                }),
            });
            setTableData(
                Object.keys(data_getAvailableDomainsWithMembers?.data).map((domain_Idx, index) => {
                    const individual_data = data_getAvailableDomainsWithMembers?.data[domain_Idx];
                    console.log("****************", individual_data["users"]);
                    return {
                        key: index + 1,
                        domain: individual_data["domain_name"],
                        members: (
                            <Box>
                                {/* <Tag>a</Tag> <Tag>b</Tag> */}
                                {Object.keys(individual_data["users"] || {}).map((empid,index) => (
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
            console.log(JSON.stringify(newEntryInputData), "HI Hi Hi"); //                       |
        } //                                                                                     |
    }, [newEntryInputData]); //                                                                  |
    //-------------------------------------------------------------------------------------------+

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
