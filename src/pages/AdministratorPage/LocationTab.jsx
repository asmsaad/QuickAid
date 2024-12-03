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

const LocationTab = () => {
    const [messageApi, contextHolder] = message.useMessage();
    const [cityQueryRun, setCityQueryRun] = useState(false); //! This state is for reloading data in real-time after adding any domain, which can then be found in the subdomain.
    return (
        <Box sx={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", gap: "20px" }}>
            {contextHolder} {/* Pop Up Message */}
            <BuildingFloorsTable messageApi={messageApi} setCityQueryRun={setCityQueryRun} cityQueryRun={cityQueryRun} />
            <BuildingsTable messageApi={messageApi} setCityQueryRun={setCityQueryRun} cityQueryRun={cityQueryRun} />
            <CitysTable messageApi={messageApi} setCityQueryRun={setCityQueryRun} />
            {/* <SubDomainTable messageApi={messageApi} dependentQueryRun={dependentQueryRun} setDependentQueryRun={setDependentQueryRun} /> */}
        </Box>
    );
};

const CitysTable = (props) => {
    const { messageApi, setCityQueryRun } = props;
    ////
    ////
    ////
    ////
    //*------------------------------------------------------------------------------------------+
    //*                                  TABLE CONFIGURATION                                     |
    //*------------------------------------------------------------------------------------------+
    //                                                                                           |
    const columns = {
        1: { title: "City", width: "250px" },
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
        city: null, //                                                                           |
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
        city: {
            //? ---------------------------- BASIC------------------------------------------------+
            title: "City", // Field title text                                                  |
            fieldType: "InputSuggetion", // Field type                                              |
            dataVariable: "city", // Variable to store data                                     |
            dataStoragePath: newEntryInputData.city, // Path to store the data                  |
            placeholderText: "Place your city name", // Placeholder text for the entry field    |
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
        refetch_getAddNewCity(); //*Trigred add domain with members query
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
    const fetchAllAvailableCity = () => {
        return axios.post(getAPI("get-all-cities"), { empid: getLoginUserID() }, { headers: { "Content-Type": "application/json", "X-CSRFToken": getCookie("csrftoken") } });
    };

    //*Query Callback
    const {
        isLoading: isLoading_getAllAvailableCity,
        data: data_getAllAvailableCity,
        isError: isError_getAllAvailableCity,
        error: error_getAllAvailableCity,
        isFetching: isFetching_getAllAvailableCity,
        refetch: refetch_getAllAvailableCity,
    } = useQuery("get-all-cities-UNIQUE-1", fetchAllAvailableCity, {
        enabled: true,
    });

    //*Query Response Actions
    useEffect(() => {
        if (isLoading_getAllAvailableCity) {
            logPrint("🔍   getAllAvailableCity  ➤  🔄");
            messageApi.open({ key: 1, type: "loading", content: "Fetching city table data" }); //Message
        } else if (data_getAllAvailableCity?.data) {
            logPrint("🔍   getAllAvailableCity  ➤  🟢", data_getAllAvailableCity?.data);
            messageApi.open({ key: 1, type: "loading", content: "Fetching city table data" }); //Message

            setModalBodyConfig({
                ...modalBodyConfig,
                city: {
                    ...modalBodyConfig["city"],
                    suggestionsList: Object.keys(data_getAllAvailableCity?.data).map((city_idx, index) => {
                        return {
                            value: city_idx,
                            label: data_getAllAvailableCity?.data[city_idx],
                        };
                    }),
                },
            });

            setTableData(
                Object.keys(data_getAllAvailableCity?.data || {}).map((city_idx, index) => {
                    return {
                        key: index + 1,
                        city: data_getAllAvailableCity?.data[city_idx],
                    };
                })
            );

            setTimeout(() => messageApi.destroy(1), 1000); // Message
        } else if (isError_getAllAvailableCity) {
            logPrint("🔍   getAllAvailableCity  ➤  ⚠️", [error_getAllAvailableCity?.message, error_getAllAvailableCity?.response.data]);
        }
    }, [isLoading_getAllAvailableCity, data_getAllAvailableCity, isError_getAllAvailableCity, error_getAllAvailableCity]);

    //
    //--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    //

    //Todo[QUEARY] ADD NEW ENTRY
    //*API Setup
    const fetchAddNewCity = () => {
        return axios.post(getAPI("create-city"), { empid: getLoginUserID(), city_name: newEntryInputData.city }, { headers: { "Content-Type": "application/json", "X-CSRFToken": getCookie("csrftoken") } });
    };

    //*Query Callback
    const {
        isLoading: isLoading_getAddNewCity,
        data: data_getAddNewCity,
        isError: isError_getAddNewCity,
        error: error_getAddNewCity,
        isFetching: isFetching_getAddNewCity,
        refetch: refetch_getAddNewCity,
    } = useQuery("create-city-UNIQUE-1", fetchAddNewCity, {
        enabled: false,
    });

    //*Query Response Actions
    useEffect(() => {
        if (isLoading_getAddNewCity) {
            logPrint("🔍   getAddNewCity  ➤  🔄");
        } else if (data_getAddNewCity?.data) {
            logPrint("🔍   getAddNewCity  ➤  🟢", data_getAddNewCity?.data);
            messageApi.open({ key: 1, type: "success", content: "City added successfully!" }); // Message
            setTimeout(() => {
                messageApi.destroy(1);
                setCityQueryRun(true); //? This is only for this table to signal other queries outside the scope that need to update when a new domain is added. Essentially, it facilitates subdomain creation without reloading.
                refetch_getAllAvailableCity(); //!Refatch data afte creating new
            }, 1000); // Message

            setTimeout(() => setOnOkayLoading([0]), 1000); //------------------------------------------+
            setTimeout(() => setIsModalOpen(false), 1500); //   STOP ADD BTN LOADER AND MODAL CLOSE    |
            //-----------------------------------------------------------------------------------------+
        } else if (isError_getAddNewCity) {
            logPrint("🔍   getAddNewCity  ➤  ⚠️", [error_getAddNewCity?.message, error_getAddNewCity?.response.data]);
            //-----------------------------------------------------------------------------------------+
            setTimeout(() => setOnOkayLoading([0]), 1000); //         STOP ADD BTN LOADER              |
            messageApi.open({ key: 3, type: "error", content: "City added failed!" }); // Message      |
            setTimeout(() => messageApi.destroy(3), 1000); //                                          |
            //-----------------------------------------------------------------------------------------+
        }
    }, [isLoading_getAddNewCity, data_getAddNewCity, isError_getAddNewCity, error_getAddNewCity]);

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
            <CustomModal title={"Add new city"} newEntryInputData={newEntryInputData} setNewEntryInputData={setNewEntryInputData} okayBtnLoading={{ onOkayLoading, setOnOkayLoading }} modalBodyConfig={modalBodyConfig} isModalOpen={isModalOpen} handleOk={handleOk} handleCancel={handleCancel} />
            <DataViewTable table_title={"City Table"} showModalOnAddBtnClick={showModal} columns={columns} tableData={tableData} />
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

const BuildingsTable = (props) => {
    const { messageApi, cityQueryRun, setCityQueryRun } = props;
    ////
    ////
    ////
    ////
    //*------------------------------------------------------------------------------------------+
    //*                                  TABLE CONFIGURATION                                     |
    //*------------------------------------------------------------------------------------------+
    //                                                                                           |
    const columns = {
        1: { title: "City", width: "250px" },
        2: { title: "Building", width: "" },
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
        city: null, //                                                                           |
        building: null, //                                                                           |
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
        city: {
            //? ---------------------------- BASIC------------------------------------------------+
            title: "City", // Field title text                                                  |
            fieldType: "SelectSingle", // Field type                                              |
            dataVariable: "city", // Variable to store data                                     |
            dataStoragePath: newEntryInputData.city, // Path to store the data                  |
            placeholderText: "Place your city name", // Placeholder text for the entry field    |
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
        building: {
            //? ---------------------------- BASIC------------------------------------------------+
            title: "Building", // Field title text                                                  |
            fieldType: "InputSuggetion", // Field type                                              |
            dataVariable: "building", // Variable to store data                                     |
            dataStoragePath: newEntryInputData.building, // Path to store the data                  |
            placeholderText: "Place your building name", // Placeholder text for the entry field    |
            //? ------------------------ SCEARCH SUGGETIONS---------------------------------------+
            ignoreSuggestions: true, // If true, ignore suggestions                              |
            suggestionsList: [], // List of suggestions/values                                    |
            //? ---------- FIELD DISABLE CONDITIONS & RESPECT TO VARIABLE ------------------------+
            isFieldDisabled: true, // If true, disables the field based on provided data         |
            disableDataVar: "city", // Data used to determine if the field is disabled                |
            disableCheckDataField: "SelectSingle", // Data used to determine if the field is disabled       |
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
        refetch_getAddNewBuyilding(); //*Trigred add domain with members query
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
    const fetchAllAvailableBuildingsByCity = () => {
        return axios.post(getAPI("get-all-building"), { empid: getLoginUserID() }, { headers: { "Content-Type": "application/json", "X-CSRFToken": getCookie("csrftoken") } });
    };

    //*Query Callback
    const {
        isLoading: isLoading_getAllAvailableBuildingsByCity,
        data: data_getAllAvailableBuildingsByCity,
        isError: isError_getAllAvailableBuildingsByCity,
        error: error_getAllAvailableBuildingsByCity,
        isFetching: isFetching_getAllAvailableBuildingsByCity,
        refetch: refetch_getAllAvailableBuildingsByCity,
    } = useQuery("get-all-building-UNIQUE-1", fetchAllAvailableBuildingsByCity, {
        enabled: true,
    });

    //*Query Response Actions
    useEffect(() => {
        if (isLoading_getAllAvailableBuildingsByCity) {
            logPrint("🔍   getAllAvailableBuildingsByCity  ➤  🔄");
            messageApi.open({ key: 1, type: "loading", content: "Fetching city table data" }); //Message
        } else if (data_getAllAvailableBuildingsByCity?.data) {
            logPrint("🔍   getAllAvailableBuildingsByCity  ➤  🟢", data_getAllAvailableBuildingsByCity?.data);
            messageApi.open({ key: 1, type: "loading", content: "Fetching city table data" }); //Message

            setTableData(
                Object.keys(data_getAllAvailableBuildingsByCity?.data || {})
                    .map((building_idx, index) => {
                        return Object.keys(data_getAllAvailableBuildingsByCity?.data[building_idx]["city"] || {}).map((city_idx, index) => {
                            return {
                                key: index + 1,
                                building: data_getAllAvailableBuildingsByCity?.data[building_idx]["building_name"],
                                city: data_getAllAvailableBuildingsByCity?.data[building_idx]["city"][city_idx],
                            };
                        });
                    })
                    .flat()
            );

            setTimeout(() => messageApi.destroy(1), 1000); // Message
        } else if (isError_getAllAvailableBuildingsByCity) {
            logPrint("🔍   getAllAvailableBuildingsByCity  ➤  ⚠️", [error_getAllAvailableBuildingsByCity?.message, error_getAllAvailableBuildingsByCity?.response.data]);
        }
    }, [isLoading_getAllAvailableBuildingsByCity, data_getAllAvailableBuildingsByCity, isError_getAllAvailableBuildingsByCity, error_getAllAvailableBuildingsByCity]);

    //
    //--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    //

    //Todo[QUEARY] SYNC City Data for modal suggetion
    //*API Setup
    const fetchAllAvailableCity = () => {
        setCityQueryRun(false);
        return axios.post(getAPI("get-all-cities"), { empid: getLoginUserID() }, { headers: { "Content-Type": "application/json", "X-CSRFToken": getCookie("csrftoken") } });
    };

    //*Query Callback
    const {
        isLoading: isLoading_getAllAvailableCity,
        data: data_getAllAvailableCity,
        isError: isError_getAllAvailableCity,
        error: error_getAllAvailableCity,
        isFetching: isFetching_getAllAvailableCity,
        refetch: refetch_getAllAvailableCity,
    } = useQuery("get-all-cities-UNIQUE-2", fetchAllAvailableCity, {
        enabled: true,
    });

    //*Query Response Actions
    useEffect(() => {
        if (isLoading_getAllAvailableCity) {
            logPrint("🔍   getAllAvailableCity  ➤  🔄");
        } else if (data_getAllAvailableCity?.data) {
            logPrint("🔍   getAllAvailableCity  ➤  🟢", data_getAllAvailableCity?.data);

            setModalBodyConfig({
                ...modalBodyConfig,
                city: {
                    ...modalBodyConfig["city"],
                    suggestionsList: Object.keys(data_getAllAvailableCity?.data).map((city_idx, index) => {
                        return {
                            value: city_idx,
                            label: data_getAllAvailableCity?.data[city_idx],
                        };
                    }),
                },
            });
        } else if (isError_getAllAvailableCity) {
            logPrint("🔍   getAllAvailableCity  ➤  ⚠️", [error_getAllAvailableCity?.message, error_getAllAvailableCity?.response.data]);
        }
    }, [isLoading_getAllAvailableCity, data_getAllAvailableCity, isError_getAllAvailableCity, error_getAllAvailableCity]);

    //
    //--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    //

    //Todo[QUEARY] ADD NEW ENTRY
    //*API Setup
    const fetchAddNewBuyilding = () => {
        return axios.post(getAPI("create-buiding"), { empid: getLoginUserID(), city_id: newEntryInputData.city, building_name: newEntryInputData.building }, { headers: { "Content-Type": "application/json", "X-CSRFToken": getCookie("csrftoken") } });
    };

    //*Query Callback
    const {
        isLoading: isLoading_getAddNewBuyilding,
        data: data_getAddNewBuyilding,
        isError: isError_getAddNewBuyilding,
        error: error_getAddNewBuyilding,
        isFetching: isFetching_getAddNewBuyilding,
        refetch: refetch_getAddNewBuyilding,
    } = useQuery("create-buiding-UNIQUE-1", fetchAddNewBuyilding, {
        enabled: false,
    });

    //*Query Response Actions
    useEffect(() => {
        if (isLoading_getAddNewBuyilding) {
            logPrint("🔍   getAddNewBuyilding  ➤  🔄");
        } else if (data_getAddNewBuyilding?.data) {
            logPrint("🔍   getAddNewBuyilding  ➤  🟢", data_getAddNewBuyilding?.data);
            messageApi.open({ key: 1, type: "success", content: "Building added successfully!" }); // Message
            setTimeout(() => {
                messageApi.destroy(1);
                // setDependentQueryRun(true); //? This is only for this table to signal other queries outside the scope that need to update when a new domain is added. Essentially, it facilitates subdomain creation without reloading.
                refetch_getAllAvailableBuildingsByCity(); //!Refatch data afte creating new
            }, 1000); // Message

            setTimeout(() => setOnOkayLoading([0]), 1000); //------------------------------------------+
            setTimeout(() => setIsModalOpen(false), 1500); //   STOP ADD BTN LOADER AND MODAL CLOSE    |
            //-----------------------------------------------------------------------------------------+
        } else if (isError_getAddNewBuyilding) {
            logPrint("🔍   getAddNewBuyilding  ➤  ⚠️", [error_getAddNewBuyilding?.message, error_getAddNewBuyilding?.response.data]);
            //-----------------------------------------------------------------------------------------+
            setTimeout(() => setOnOkayLoading([0]), 1000); //         STOP ADD BTN LOADER              |
            messageApi.open({ key: 3, type: "error", content: "Building added failed!" }); // Message      |
            setTimeout(() => messageApi.destroy(3), 1000); //                                          |
            //-----------------------------------------------------------------------------------------+
        }
    }, [isLoading_getAddNewBuyilding, data_getAddNewBuyilding, isError_getAddNewBuyilding, error_getAddNewBuyilding]);

    //
    //--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    //                                     END QUERY
    //--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    //

    ////
    ////
    ////
    ////

    //-------------------------------------------------------------------------------------------+
    ////
    // ---------------------- DEPENDENT ON TOPBLOCK TO TRIGGER QUERY ----------------------------+
    //? If a new domain name is added, it will trigger the query. After triggering, the value    |
    //? of the triggering query will be set to false.                                            |
    useEffect(() => {
        if (cityQueryRun) {
            refetch_getAllAvailableCity();
        } //                                                                                     |
    }, [cityQueryRun]); //                                                                  |
    //-------------------------------------------------------------------------------------------+

    // Check Entries data -----------------------------------------------------------------------+
    useEffect(() => {
        if (newEntryInputData.city !== "" && newEntryInputData.city !== null) {
            setModalBodyConfig({
                ...modalBodyConfig,
                building: {
                    ...modalBodyConfig["building"],
                    suggestionsList: Object.keys(data_getAllAvailableBuildingsByCity?.data || {})
                        .map((building_idx, index) => {
                            if (Object.keys(data_getAllAvailableBuildingsByCity?.data[building_idx]["city"] || {}).includes(newEntryInputData.city)) {
                                return {
                                    value: building_idx,
                                    label: data_getAllAvailableBuildingsByCity?.data[building_idx]["building_name"],
                                };
                            }
                        })
                        .flat(),
                },
            });
        } //                                                                                     |
    }, [newEntryInputData]); //                                                                  |
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
            <CustomModal title={"Add new Building"} newEntryInputData={newEntryInputData} setNewEntryInputData={setNewEntryInputData} okayBtnLoading={{ onOkayLoading, setOnOkayLoading }} modalBodyConfig={modalBodyConfig} isModalOpen={isModalOpen} handleOk={handleOk} handleCancel={handleCancel} />
            <DataViewTable table_title={"Building Table"} showModalOnAddBtnClick={showModal} columns={columns} tableData={tableData} />
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
const BuildingFloorsTable = (props) => {
    const { messageApi, cityQueryRun, setCityQueryRun } = props;
    ////
    ////
    ////
    ////
    //*------------------------------------------------------------------------------------------+
    //*                                  TABLE CONFIGURATION                                     |
    //*------------------------------------------------------------------------------------------+
    //                                                                                           |
    const columns = {
        // 1: { title: "City", width: "250px" },
        1: { title: "Building", width: "250px" },
        2: { title: "Floor", width: "250px" },
        3: { title: "Departments", width: "" },
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
        city: null, //                                                                           |
        building: null, //                                                                           |
        floor: null, //                                                                           |
        others: null, //                                                                           |
        departments: null, //                                                                           |
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
        city: {
            //? ---------------------------- BASIC------------------------------------------------+
            title: "City", // Field title text                                                  |
            fieldType: "SelectSingle", // Field type                                              |
            dataVariable: "city", // Variable to store data                                     |
            dataStoragePath: newEntryInputData.city, // Path to store the data                  |
            placeholderText: "Place your city name", // Placeholder text for the entry field    |
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
        building: {
            //? ---------------------------- BASIC------------------------------------------------+
            title: "Building", // Field title text                                                  |
            fieldType: "SelectSingle", // Field type                                              |
            dataVariable: "building", // Variable to store data                                     |
            dataStoragePath: newEntryInputData.building, // Path to store the data                  |
            placeholderText: "Place your building name", // Placeholder text for the entry field    |
            //? ------------------------ SCEARCH SUGGETIONS---------------------------------------+
            ignoreSuggestions: true, // If true, ignore suggestions                              |
            suggestionsList: [], // List of suggestions/values                                    |
            //? ---------- FIELD DISABLE CONDITIONS & RESPECT TO VARIABLE ------------------------+
            isFieldDisabled: true, // If true, disables the field based on provided data         |
            disableDataVar: "city", // Data used to determine if the field is disabled                |
            disableCheckDataField: "SelectSingle", // Data used to determine if the field is disabled       |
            //? ------------------------ MODAL BUTTON DEPENDENCY ---------------------------------+
            disableOkayButtonIfEmpty: true, // Disables the Okay button if no value is provided   |
        }, //                                                                                     |
        floor: {
            //? ---------------------------- BASIC------------------------------------------------+
            title: "Floor", // Field title text                                                  |
            fieldType: "InputSuggetion", // Field type                                              |
            dataVariable: "floor", // Variable to store data                                     |
            dataStoragePath: newEntryInputData.floor, // Path to store the data                  |
            placeholderText: "Place your building name", // Placeholder text for the entry field    |
            //? ------------------------ SCEARCH SUGGETIONS---------------------------------------+
            ignoreSuggestions: false, // If true, ignore suggestions                              |
            suggestionsList: [], // List of suggestions/values                                    |
            //? ---------- FIELD DISABLE CONDITIONS & RESPECT TO VARIABLE ------------------------+
            isFieldDisabled: true, // If true, disables the field based on provided data         |
            disableDataVar: "building", // Data used to determine if the field is disabled                |
            disableCheckDataField: "SelectSingle", // Data used to determine if the field is disabled       |
            //? ------------------------ MODAL BUTTON DEPENDENCY ---------------------------------+
            disableOkayButtonIfEmpty: true, // Disables the Okay button if no value is provided   |
        }, //                                                                                     |
        others: {
            //? ---------------------------- BASIC------------------------------------------------+
            title: "Others", // Field title text                                                  |
            fieldType: "InputSuggetion", // Field type                                              |
            dataVariable: "others", // Variable to store data                                     |
            dataStoragePath: newEntryInputData.others, // Path to store the data                  |
            placeholderText: "Place your building name", // Placeholder text for the entry field    |
            //? ------------------------ SCEARCH SUGGETIONS---------------------------------------+
            ignoreSuggestions: true, // If true, ignore suggestions                              |
            suggestionsList: [], // List of suggestions/values                                    |
            //? ---------- FIELD DISABLE CONDITIONS & RESPECT TO VARIABLE ------------------------+
            isFieldDisabled: true, // If true, disables the field based on provided data         |
            disableDataVar: "floor", // Data used to determine if the field is disabled                |
            disableCheckDataField: "InputSuggetion", // Data used to determine if the field is disabled       |
            //? ------------------------ MODAL BUTTON DEPENDENCY ---------------------------------+
            disableOkayButtonIfEmpty: false, // Disables the Okay button if no value is provided   |
        }, //                                                                                     |
        departments: {
            //? ---------------------------- BASIC------------------------------------------------+
            title: "Departments", // Field title text                                                  |
            fieldType: "SelectMultiple", // Field type                                              |
            dataVariable: "departments", // Variable to store data                                     |
            dataStoragePath: newEntryInputData.departments, // Path to store the data                  |
            placeholderText: "Place your building name", // Placeholder text for the entry field    |
            //? ------------------------ SCEARCH SUGGETIONS---------------------------------------+
            ignoreSuggestions: true, // If true, ignore suggestions                              |
            suggestionsList: [], // List of suggestions/values                                    |
            //? ---------- FIELD DISABLE CONDITIONS & RESPECT TO VARIABLE ------------------------+
            isFieldDisabled: true, // If true, disables the field based on provided data         |
            disableDataVar: "floor", // Data used to determine if the field is disabled                |
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
        refetch_getAddNewFloorWithDepartment(); //*Trigred add domain with members query
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
    const fetchAllAvailableFloorsOfBuildingsByCity = () => {
        return axios.post(getAPI("get-all-loactions"), { empid: getLoginUserID() }, { headers: { "Content-Type": "application/json", "X-CSRFToken": getCookie("csrftoken") } });
    };

    //*Query Callback
    const {
        isLoading: isLoading_getAllAvailableFloorsOfBuildingsByCity,
        data: data_getAllAvailableFloorsOfBuildingsByCity,
        isError: isError_getAllAvailableFloorsOfBuildingsByCity,
        error: error_getAllAvailableFloorsOfBuildingsByCity,
        isFetching: isFetching_getAllAvailableFloorsOfBuildingsByCity,
        refetch: refetch_getAllAvailableFloorsOfBuildingsByCity,
    } = useQuery("get-all-loactions-UNIQUE-1", fetchAllAvailableFloorsOfBuildingsByCity, {
        enabled: true,
    });

    //*Query Response Actions
    useEffect(() => {
        if (isLoading_getAllAvailableFloorsOfBuildingsByCity) {
            logPrint("🔍   getAllAvailableFloorsOfBuildingsByCity  ➤  🔄");
            messageApi.open({ key: 1, type: "loading", content: "Fetching city table data" }); //Message
        } else if (data_getAllAvailableFloorsOfBuildingsByCity?.data) {
            logPrint("🔍   getAllAvailableFloorsOfBuildingsByCity  ➤  🟢", data_getAllAvailableFloorsOfBuildingsByCity?.data);
            messageApi.open({ key: 1, type: "loading", content: "Fetching city table data" }); //Message

            setTableData(
                Object.keys(data_getAllAvailableFloorsOfBuildingsByCity?.data || {}).map((floor_idx, index) => {
                    const floor_info = data_getAllAvailableFloorsOfBuildingsByCity?.data[floor_idx];
                    const floor_name = floor_info["floor"];
                    const other = floor_info["others"];

                    const city = floor_info["city"][Object.keys(floor_info["city"])[0]];
                    const building = floor_info["building"][Object.keys(floor_info["building"])[0]];

                    return {
                        key: `${index}`,
                        building: `${building}, ${city}`,
                        floor: floor_name + (other ? ` [${other}]` : ""),
                        departments: (
                            <Box>
                                {Object.keys(floor_info["department"] || {}).map((department_idx, index_) => {
                                    return <Tag style={{ margin: "2px" }}> {floor_info["department"][department_idx]}</Tag>;
                                })}
                            </Box>
                        ),
                    };
                })
            );

            setTimeout(() => messageApi.destroy(1), 1000); // Message
        } else if (isError_getAllAvailableFloorsOfBuildingsByCity) {
            logPrint("🔍   getAllAvailableFloorsOfBuildingsByCity  ➤  ⚠️", [error_getAllAvailableFloorsOfBuildingsByCity?.message, error_getAllAvailableFloorsOfBuildingsByCity?.response.data]);
        }
    }, [isLoading_getAllAvailableFloorsOfBuildingsByCity, data_getAllAvailableFloorsOfBuildingsByCity, isError_getAllAvailableFloorsOfBuildingsByCity, error_getAllAvailableFloorsOfBuildingsByCity]);

    //
    //--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    //

    //Todo[QUEARY] SYNC Buildings [For modal data suggetions]
    //*API Setup
    const fetchAllAvailableBuildingsByCity = () => {
        return axios.post(getAPI("get-all-building"), { empid: getLoginUserID() }, { headers: { "Content-Type": "application/json", "X-CSRFToken": getCookie("csrftoken") } });
    };

    //*Query Callback
    const {
        isLoading: isLoading_getAllAvailableBuildingsByCity,
        data: data_getAllAvailableBuildingsByCity,
        isError: isError_getAllAvailableBuildingsByCity,
        error: error_getAllAvailableBuildingsByCity,
        isFetching: isFetching_getAllAvailableBuildingsByCity,
        refetch: refetch_getAllAvailableBuildingsByCity,
    } = useQuery("get-all-building-UNIQUE-1", fetchAllAvailableBuildingsByCity, {
        enabled: true,
    });

    //*Query Response Actions
    useEffect(() => {
        if (isLoading_getAllAvailableBuildingsByCity) {
            logPrint("🔍   getAllAvailableBuildingsByCity  ➤  🔄");
        } else if (data_getAllAvailableBuildingsByCity?.data) {
            logPrint("🔍   getAllAvailableBuildingsByCity  ➤  🟢", data_getAllAvailableBuildingsByCity?.data);
        } else if (isError_getAllAvailableBuildingsByCity) {
            logPrint("🔍   getAllAvailableBuildingsByCity  ➤  ⚠️", [error_getAllAvailableBuildingsByCity?.message, error_getAllAvailableBuildingsByCity?.response.data]);
        }
    }, [isLoading_getAllAvailableBuildingsByCity, data_getAllAvailableBuildingsByCity, isError_getAllAvailableBuildingsByCity, error_getAllAvailableBuildingsByCity]);

    //
    //--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    //
    //Todo[QUEARY] SYNC Departments [For modal data suggetions]
    //*API Setup
    const fetchAllAvailableDepartments = () => {
        return axios.post(getAPI("get-all-department"), { empid: getLoginUserID() }, { headers: { "Content-Type": "application/json", "X-CSRFToken": getCookie("csrftoken") } });
    };

    //*Query Callback
    const {
        isLoading: isLoading_getAllAvailableDepartments,
        data: data_getAllAvailableDepartments,
        isError: isError_getAllAvailableDepartments,
        error: error_getAllAvailableDepartments,
        isFetching: isFetching_getAllAvailableDepartments,
        refetch: refetch_getAllAvailableDepartments,
    } = useQuery("get-all-department-UNIQUE-1", fetchAllAvailableDepartments, {
        enabled: true,
    });

    //*Query Response Actions
    useEffect(() => {
        if (isLoading_getAllAvailableDepartments) {
            logPrint("🔍   getAllAvailableDepartments  ➤  🔄");
        } else if (data_getAllAvailableDepartments?.data) {
            logPrint("🔍   getAllAvailableDepartments  ➤  🟢", data_getAllAvailableDepartments?.data);
        } else if (isError_getAllAvailableDepartments) {
            logPrint("🔍   getAllAvailableDepartments  ➤  ⚠️", [error_getAllAvailableDepartments?.message, error_getAllAvailableDepartments?.response.data]);
        }
    }, [isLoading_getAllAvailableDepartments, data_getAllAvailableDepartments, isError_getAllAvailableDepartments, error_getAllAvailableDepartments]);

    //
    //--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    //

    //Todo[QUEARY] SYNC City Data for modal suggetion
    //*API Setup
    const fetchAllAvailableCity = () => {
        setCityQueryRun(false);
        return axios.post(getAPI("get-all-cities"), { empid: getLoginUserID() }, { headers: { "Content-Type": "application/json", "X-CSRFToken": getCookie("csrftoken") } });
    };

    //*Query Callback
    const {
        isLoading: isLoading_getAllAvailableCity,
        data: data_getAllAvailableCity,
        isError: isError_getAllAvailableCity,
        error: error_getAllAvailableCity,
        isFetching: isFetching_getAllAvailableCity,
        refetch: refetch_getAllAvailableCity,
    } = useQuery("get-all-cities-UNIQUE-2", fetchAllAvailableCity, {
        enabled: true,
    });

    //*Query Response Actions
    useEffect(() => {
        if (isLoading_getAllAvailableCity) {
            logPrint("🔍   getAllAvailableCity  ➤  🔄");
        } else if (data_getAllAvailableCity?.data) {
            logPrint("🔍   getAllAvailableCity  ➤  🟢", data_getAllAvailableCity?.data);

            setModalBodyConfig({
                ...modalBodyConfig,
                city: {
                    ...modalBodyConfig["city"],
                    suggestionsList: Object.keys(data_getAllAvailableCity?.data).map((city_idx, index) => {
                        return {
                            value: city_idx,
                            label: data_getAllAvailableCity?.data[city_idx],
                        };
                    }),
                },
            });
        } else if (isError_getAllAvailableCity) {
            logPrint("🔍   getAllAvailableCity  ➤  ⚠️", [error_getAllAvailableCity?.message, error_getAllAvailableCity?.response.data]);
        }
    }, [isLoading_getAllAvailableCity, data_getAllAvailableCity, isError_getAllAvailableCity, error_getAllAvailableCity]);

    //
    //--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    //

    //Todo[QUEARY] ADD NEW ENTRY
    //*API Setup
    const fetchAddNewFloorWithDepartment = () => {
        console.log({ empid: getLoginUserID(), building_id: newEntryInputData.building, floor: newEntryInputData.floor, others: newEntryInputData.others, departments: newEntryInputData.departments }, "getAddNewFloorWithDepartment");
        return axios.post(getAPI("create-location"), { empid: getLoginUserID(), building_id: newEntryInputData.building, floor: newEntryInputData.floor, others: newEntryInputData.others, departments: newEntryInputData.departments }, { headers: { "Content-Type": "application/json", "X-CSRFToken": getCookie("csrftoken") } });
    };

    //*Query Callback
    const {
        isLoading: isLoading_getAddNewFloorWithDepartment,
        data: data_getAddNewFloorWithDepartment,
        isError: isError_getAddNewFloorWithDepartment,
        error: error_getAddNewFloorWithDepartment,
        isFetching: isFetching_getAddNewFloorWithDepartment,
        refetch: refetch_getAddNewFloorWithDepartment,
    } = useQuery("create-location-UNIQUE-1", fetchAddNewFloorWithDepartment, {
        enabled: false,
    });

    //*Query Response Actions
    useEffect(() => {
        if (isLoading_getAddNewFloorWithDepartment) {
            logPrint("🔍   getAddNewFloorWithDepartment  ➤  🔄");
        } else if (data_getAddNewFloorWithDepartment?.data) {
            logPrint("🔍   getAddNewFloorWithDepartment  ➤  🟢", data_getAddNewFloorWithDepartment?.data);
            messageApi.open({ key: 1, type: "success", content: "Building added successfully!" }); // Message
            setTimeout(() => {
                messageApi.destroy(1);
                // setDependentQueryRun(true); //? This is only for this table to signal other queries outside the scope that need to update when a new domain is added. Essentially, it facilitates subdomain creation without reloading.
                refetch_getAllAvailableFloorsOfBuildingsByCity(); //!Refatch data afte creating new
            }, 1000); // Message

            setTimeout(() => setOnOkayLoading([0]), 1000); //------------------------------------------+
            setTimeout(() => setIsModalOpen(false), 1500); //   STOP ADD BTN LOADER AND MODAL CLOSE    |
            //-----------------------------------------------------------------------------------------+
        } else if (isError_getAddNewFloorWithDepartment) {
            logPrint("🔍   getAddNewFloorWithDepartment  ➤  ⚠️", [error_getAddNewFloorWithDepartment?.message, error_getAddNewFloorWithDepartment?.response.data]);
            //-----------------------------------------------------------------------------------------+
            setTimeout(() => setOnOkayLoading([0]), 1000); //         STOP ADD BTN LOADER              |
            messageApi.open({ key: 3, type: "error", content: "Building added failed!" }); // Message      |
            setTimeout(() => messageApi.destroy(3), 1000); //                                          |
            //-----------------------------------------------------------------------------------------+
        }
    }, [isLoading_getAddNewFloorWithDepartment, data_getAddNewFloorWithDepartment, isError_getAddNewFloorWithDepartment, error_getAddNewFloorWithDepartment]);

    //
    //--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    //                                     END QUERY
    //--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    //

    ////
    ////
    ////
    ////

    //-------------------------------------------------------------------------------------------+
    ////
    // ---------------------- DEPENDENT ON TOPBLOCK TO TRIGGER QUERY ----------------------------+
    //? If a new domain name is added, it will trigger the query. After triggering, the value    |
    //? of the triggering query will be set to false.                                            |
    useEffect(() => {
        if (cityQueryRun) {
            refetch_getAllAvailableCity();
        } //                                                                                     |
    }, [cityQueryRun]); //                                                                  |
    //-------------------------------------------------------------------------------------------+

    // Check Entries data -----------------------------------------------------------------------+
    useEffect(() => {
        if (newEntryInputData.city !== "" && newEntryInputData.city !== null) {
            setModalBodyConfig({
                ...modalBodyConfig,
                building: {
                    ...modalBodyConfig["building"],
                    suggestionsList: Object.keys(data_getAllAvailableBuildingsByCity?.data || {})
                        .map((building_idx, index) => {
                            if (Object.keys(data_getAllAvailableBuildingsByCity?.data[building_idx]["city"] || {}).includes(newEntryInputData.city)) {
                                return {
                                    value: building_idx,
                                    label: data_getAllAvailableBuildingsByCity?.data[building_idx]["building_name"],
                                };
                            }
                        })
                        .flat(),
                },
            });
        }
        if (newEntryInputData.city !== "" && newEntryInputData.city !== null && newEntryInputData.building !== "" && newEntryInputData.building !== null) {
            setModalBodyConfig({
                ...modalBodyConfig,
                floor: {
                    ...modalBodyConfig["floor"],
                    suggestionsList: Object.keys(data_getAllAvailableFloorsOfBuildingsByCity?.data || {}).map((floor_idx, index) => {
                        const floor_info = data_getAllAvailableFloorsOfBuildingsByCity?.data[floor_idx];
                        const floor_name = floor_info["floor"];
                        const building = floor_info["building"][Object.keys(floor_info["building"])[0]];
                        if (newEntryInputData.building === Object.keys(floor_info["building"])[0]) {
                            return {
                                value: floor_idx,
                                label: floor_name,
                            };
                        }
                    }),
                },
            });
        }
        //--------------------------------------
        if (newEntryInputData.city !== "" && newEntryInputData.city !== null && newEntryInputData.building !== "" && newEntryInputData.building !== null && newEntryInputData.floor !== "" && newEntryInputData.floor !== null) {
            setModalBodyConfig({
                ...modalBodyConfig,
                departments: {
                    ...modalBodyConfig["departments"],
                    suggestionsList: Object.keys(data_getAllAvailableDepartments?.data).map((department_idx) => {
                        return {
                            value: department_idx,
                            label: data_getAllAvailableDepartments?.data[department_idx],
                        };
                    }),

                    // Object.keys(data_getAllAvailableFloorsOfBuildingsByCity?.data || {}).map((floor_idx, index) => {
                    //     const floor_info = data_getAllAvailableFloorsOfBuildingsByCity?.data[floor_idx];
                    //     const floor_name = floor_info["floor"];
                    //     const building = floor_info["building"][Object.keys(floor_info["building"])[0]];
                    //     if (newEntryInputData.building === Object.keys(floor_info["building"])[0]) {
                    //         return {
                    //             value: floor_idx,
                    //             label: floor_name,
                    //         };
                    //     }
                    // }),
                },
            });
        }

        // {Object.keys(floor_info["department"] || {}).map((department_idx, index_) => {
        //     return <Tag style={{ margin: "2px" }}> {floor_info["department"][department_idx]}</Tag>;
        // })}

        // if (newEntryInputData.city !== "" && newEntryInputData.city !== null && newEntryInputData.building !== "" && newEntryInputData.building !== null && newEntryInputData.floor !== "" && newEntryInputData.floor !== null) {
        //     setModalBodyConfig({
        //         ...modalBodyConfig,
        //         others: {
        //             ...modalBodyConfig["others"],
        //             suggestionsList: () => {

        //             },
        //         },
        //     });
        // }
    }, [newEntryInputData]); //                                                                  |
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
            console.log(tableData, "Table data << UPDATE"); //                                      |
        } //                                                                                     |
    }, [tableData]); //                                                                    |
    //-------------------------------------------------------------------------------------------+
    ////
    ////
    ////
    ////
    return (
        <Box sx={{ width: "100%", display: "flex", flexDirection: "column" }}>
            <CustomModal title={"Add new floors at Building"} newEntryInputData={newEntryInputData} setNewEntryInputData={setNewEntryInputData} okayBtnLoading={{ onOkayLoading, setOnOkayLoading }} modalBodyConfig={modalBodyConfig} isModalOpen={isModalOpen} handleOk={handleOk} handleCancel={handleCancel} />
            <DataViewTable table_title={"Floor Table"} showModalOnAddBtnClick={showModal} columns={columns} tableData={tableData} />
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

export default LocationTab;
