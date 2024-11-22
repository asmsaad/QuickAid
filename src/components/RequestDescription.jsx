import { CaretRightOutlined, EditOutlined, MedicineBoxOutlined, SisternodeOutlined, UserAddOutlined } from "@ant-design/icons";
import { Box } from "@mui/material";
import { Breadcrumb, Button, Card, Modal, Select, Skeleton, Tag, Timeline, Typography } from "antd";
import React, { useEffect, useState } from "react";

import "../All_Styles/Scrollbar.css";
import { ProfileCardXL, ProfileCardXS } from "../components/ProfileCard";
import { CalendarRegular, ClockRegular, HistoryFilled } from "@fluentui/react-icons";
import TextArea from "antd/es/input/TextArea";
import { Outlet, Link, useNavigate, useLocation, useParams } from "react-router-dom";
import { LoadingFullScreen } from "./DoodlingMessage";

//*---------------------------------------------------------------------
import { useQuery } from "react-query"; //* React Query                 |
import axios from "axios"; //* React Query                              |
import { getAPI } from "../apis/apis"; //*                              |
import { getLoginUserID } from "../authentication/localStorage"; //*    |
import { logPrint } from "../authentication/logPrint"; //*              |
import { convertTimestamp, getCookie } from "../utility"; //*                             |
//*---------------------------------------------------------------------

import CommentRoundedIcon from "@mui/icons-material/CommentRounded";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";

const { Text } = Typography;

const RequestTimeline = (props) => {
    const { timeline_data } = props;

    // Object.keys(timeline_data).map((index) => {
    //     return {
    //         color: timeline_data[index]["status"]["color"],
    //         children: <TimeLineContent status_info={timeline_data[index]} />,
    //     };
    // });

    return (
        <div>
            <Timeline
                // pending="Updgrade in progress..."
                reverse={true}
                items={Object.keys(timeline_data).map((index) => {
                    return {
                        color: timeline_data[index]["status"]["color"],
                        children: <TimeLineContent status_info={timeline_data[index]} />,
                    };
                })}
                // items={[
                //     {
                //         color: "#FFA500",
                //         children: <TimeLineContent color={"#FFA500"} step_name="Requested" profile_info={{ name: "A S M Mehedi Hasan Sad" }} />,
                //     },
                //     {
                //         color: "#FFD700",
                //         children: <TimeLineContent color={"#FFD700"} step_name="Reviewed" profile_info={{ name: "Hafizur Rahaman" }} />,
                //     },
                //     {
                //         color: "#32CD32",
                //         children: <TimeLineContent color={"#32CD32"} step_name="Assigned" profile_info={{ name: "Anamul Huq", name_2: "Hafizur Rahaman" }} />,
                //     },
                //     {
                //         color: "#FFD700",
                //         children: <TimeLineContent color={"#FFD700"} step_name="Reviewed" profile_info={{ name: "Anamul Huq" }} />,
                //     },
                //     {
                //         color: "#1E90FF",
                //         children: <TimeLineContent step_name="Visited" profile_info={{ name: "Anamul Huq" }} />,
                //     },
                //     {
                //         color: "#6A5ACD",
                //         children: <TimeLineContent color={"#6A5ACD"} step_name="Picked" profile_info={{ name: "Anamul Huq" }} />,
                //     },

                //     {
                //         color: "#FF69B4",
                //         children: <TimeLineContent color={"#FF69B4"} step_name="Refered" profile_info={{ name: "Adnan Ahamed", name_2: "Anamul Huq" }} />,
                //     },
                //     {
                //         color: "#FF4500",
                //         children: <TimeLineContent color={"#FF4500"} step_name="Handovered" profile_info={{ name: "Adnan Ahamed", name_2: "Anamul Huq" }} />,
                //     },
                //     {
                //         color: "#00FA9A",
                //         children: <TimeLineContent color={"#00FA9A"} step_name="Solved" profile_info={{ name: "Adnan Ahamed" }} />,
                //     },
                //     {
                //         color: "#FF6347",
                //         children: <TimeLineContent color={"#FF6347"} step_name="Returned" profile_info={{ name: "Adnan Ahamed" }} />,
                //     },

                //     {
                //         color: "#808080",
                //         children: <TimeLineContent color={"#808080"} step_name="Closed" profile_info={{ name: "A S M Mehedi Hasan Sad" }} />,
                //     },
                //     {
                //         children: "Send to upgrade",
                //     },
                // ]}
            />
        </div>
    );
};

const allStatusInfo = {};

const EditModal = (props) => {
    const { data_getCoMemberOfSubDomain, current_status, ticketID, statusChangedInfo, setStatusChangedInfo, availableStatus, isLoading_getAllTicketStatus } = props;

    return (
        <Modal width={350} title="Edit Action!" open={props.isModalOpen} onOk={props.handleOk} onCancel={props.handleCancel}>
            <Box sx={{ width: "100%" }}>
                {/* <Select showSearch style={{ width: "100%" }} placeholder="Select Action" optionFilterProp="label" filterSort={(optionA, optionB) => (optionA?.label ?? "").toLowerCase().localeCompare((optionB?.label ?? "").toLowerCase())} options={availableStatus["Handovered"]} /> */}
                {isLoading_getAllTicketStatus ? (
                    <Skeleton.Input block={true} active={true} size={"default"} />
                ) : (
                    <Select
                        placeholder="Select a status"
                        showSearch
                        allowClear
                        size="medium"
                        style={{ width: "100%" }}
                        optionFilterProp="label"
                        filterSort={(optionA, optionB) => (optionA?.label ?? "").toLowerCase().localeCompare((optionB?.label ?? "").toLowerCase())}
                        value={statusChangedInfo.status_id}
                        onChange={(value, selectedObject) => {
                            setStatusChangedInfo({ ...statusChangedInfo, status_id: value ? value : undefined });
                        }}
                        options={availableStatus[current_status]}
                    />
                )}
            </Box>

            <Box sx={{ width: "100%", marginTop: "10px" }}>
                <Select
                    placeholder="Select a status"
                    showSearch
                    allowClear
                    size="medium"
                    style={{ width: "100%" }}
                    optionFilterProp="label"
                    filterSort={(optionA, optionB) => (optionA?.label ?? "").toLowerCase().localeCompare((optionB?.label ?? "").toLowerCase())}
                    value={statusChangedInfo.assign_to}
                    onChange={(value, selectedObject) => {
                        setStatusChangedInfo({ ...statusChangedInfo, assign_to: value ? value : undefined });
                    }}
                    options={Object.keys(data_getCoMemberOfSubDomain || {}).map((index) => {
                        return { value: data_getCoMemberOfSubDomain[index]["empid"], label: data_getCoMemberOfSubDomain[index]["name"] + ` (${data_getCoMemberOfSubDomain[index]["empid"]})` };
                    })}
                />
            </Box>

            <Box sx={{ width: "100%", marginTop: "10px", marginBottom: "15px" }}>
                <TextArea size="medium" showCount maxLength={1024} rows={3} value={statusChangedInfo.note} onChange={(e) => setStatusChangedInfo({ ...statusChangedInfo, note: e.target.value })} disabled={statusChangedInfo.status_id ? false : true} />
            </Box>
        </Modal>
    );
};

const TimeLineContent = (props) => {
    const { date_time, profile_info, note, status_info } = props;

    const step_name = status_info["status"]["status"];
    const color = status_info["status"]["color"];
    const updated_on = convertTimestamp(status_info["update_on"]);

    return (
        <Box sx={{ width: "100%", maxWidth: "446px" }}>
            <Box sx={{ width: "100%", marginBottom: "10px" }}>
                <Box sx={{ width: "100%" }}>
                    <Text style={{ color: color }} strong>
                        {step_name}
                    </Text>
                </Box>
                <Box sx={{ width: "100%", display: "flex", alignItems: "center", lineHeight: "1.3" }}>
                    {/* <CalendarRegular style={{ color: "gray", margin: "0 0 0 0", lineHeight: "1.3" }} /> */}
                    <CalendarMonthRoundedIcon fontSize="16px" style={{ margin: "0 2px 0 0", color: "#b5b5b5" }} />
                    <Text type="secondary" style={{ lineHeight: "1.3" }}>
                        {updated_on.date}
                    </Text>
                    <AccessTimeOutlinedIcon fontSize="16px" style={{ margin: "0 2px 0 10px", color: "#a1a1a1" }} />
                    {/* <ClockRegular style={{ color: "gray", , lineHeight: "1.3" }} /> */}
                    <Text type="secondary" style={{ lineHeight: "1.3" }}>
                        {updated_on.time}
                    </Text>
                </Box>
            </Box>

            {(step_name === "Requested" || step_name === "Reviewed" || step_name === "Visited" || step_name === "Picked" || step_name === "Delivered" || step_name === "Returned" || step_name === "Solved" || step_name === "Closed") && (
                <Box sx={{ display: "flex", marginTop: "10px", width: "100%" }}>
                    <Box sx={{ height: "calc(56px - 20px)", minWidth: "calc(56px - 20px)", maxWidth: "calc(56px - 20px)", bgcolor: "#fbfbfb", borderRadius: "10px", padding: "10px", margin: "0 8px 0 0", display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <Text style={{ fontSize: "14px" }}>By</Text>
                    </Box>
                    <Box sx={{ width: `calc(100% - 65px)` }}>
                        <ProfileCardXS info={status_info.updated_by.name} />
                    </Box>
                </Box>
            )}

            {(step_name === "Assigned" || step_name === "Refered" || step_name === "Handovered") && (
                <Box sx={{ width: "100%" }}>
                    {/* <Box sx={{ width: "400px" }}>
                        <ProfileCardXS info={profile_info.name} />
                    </Box> */}
                    <Box sx={{ display: "flex" }}>
                        <Box sx={{ height: "calc(56px - 20px)", minWidth: "calc(56px - 20px)", maxWidth: "calc(56px - 20px)", bgcolor: "#fbfbfb", borderRadius: "10px", padding: "10px", margin: "0 8px 0 0", display: "flex", justifyContent: "center", alignItems: "center" }}>
                            <Text style={{ fontSize: "14px" }}>To</Text>
                        </Box>
                        <Box sx={{ width: `calc(100% - 65px)` }}>
                            <ProfileCardXS info={status_info.assign_to.name} />
                        </Box>
                    </Box>

                    <Box sx={{ display: "flex", marginTop: "10px" }}>
                        <Box sx={{ height: "calc(56px - 20px)", minWidth: "calc(56px - 20px)", maxWidth: "calc(56px - 20px)", bgcolor: "#fbfbfb", borderRadius: "10px", padding: "10px", margin: "0 8px 0 0", display: "flex", justifyContent: "center", alignItems: "center" }}>
                            <Text style={{ fontSize: "14px" }}>{step_name === "Handovered" ? "From" : "By"}</Text>
                        </Box>
                        <Box sx={{ width: `calc(100% - 65px)` }}>
                            {/*//! <ProfileCardXS info={profile_info.name_2} /> */}
                            <ProfileCardXS info={status_info.updated_by.name} />
                        </Box>
                    </Box>
                </Box>
            )}

            {(step_name === "Visited" || step_name === "Picked" || step_name === "Delivered" || step_name === "Returned" || step_name === "Solved" || step_name === "Closed") && (
                <Box sx={{ width: `calc(100% - 20px)`, marginTop: "10px", textAlign: "justify", border: "0.5px solid #e2e2e2", borderRadius: "5px", padding: "10px" }}>
                    <Text type="secondary">
                        {/* <span style={{ backgroundColor: "red" , margin:"20px" }}>
                            
                        </span> */}
                        <CommentRoundedIcon style={{ fontSize: "16px" }} /> {status_info.note}
                        {/* There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form,. */}
                    </Text>
                </Box>
            )}
        </Box>
    );
};

const noStyle = {
    textDecoration: "none",
    color: "inherit",
    all: "unset",
    height: "fit-content",
};

export const RequestDescription = () => {
    const params = useParams();
    const ticketID = params.ticketID;

    const [isActiveLoading, setActiveLoading] = useState(true);
    const [availableStatus, setAvailableStatus] = useState([]);
    const [statusChangedInfo, setStatusChangedInfo] = useState({ status_id: undefined, note: undefined, assign_to: undefined });

    //Todo[QUEARY] Get Ticket Header Info
    //*API Setup
    const fetchTicketHeaderInfo = () => {
        return axios.post(getAPI("get_ticket_header_info"), { empid: getLoginUserID(), ticket_id: ticketID }, { headers: { "Content-Type": "application/json", "X-CSRFToken": getCookie("csrftoken") } });
    };

    //*Query Callback
    const {
        isLoading: isLoading_getTicketHeaderInfo,
        data: data_getTicketHeaderInfo,
        isError: isError_getTicketHeaderInfo,
        error: error_getTicketHeaderInfo,
        isFetching: isFetching_getTicketHeaderInfo,
        refetch: refetch_getTicketHeaderInfo,
    } = useQuery("get_ticket_header_info-UNIQUE-1", fetchTicketHeaderInfo, {
        enabled: false,
    });

    //*Query Response Actions
    useEffect(() => {
        if (isLoading_getTicketHeaderInfo) {
            logPrint("🔍   getTicketHeaderInfo  ➤  🔄");
        } else if (data_getTicketHeaderInfo?.data) {
            logPrint("🔍   getTicketHeaderInfo  ➤  🟢", data_getTicketHeaderInfo?.data);

            //!if data loade then loader turn off after 1.5 sec
            setTimeout(() => {
                setActiveLoading(false);
                refetch_getCoMemberOfSubDomain(); //* Triger when get the subdomian id
            }, 1500);
        } else if (isError_getTicketHeaderInfo) {
            logPrint("🔍   getTicketHeaderInfo  ➤  ⚠️", [error_getTicketHeaderInfo?.message, error_getTicketHeaderInfo?.response.data]);
        }
    }, [isLoading_getTicketHeaderInfo, data_getTicketHeaderInfo, isError_getTicketHeaderInfo, error_getTicketHeaderInfo]);

    //Todo[QUEARY] Update Ticket Status
    //*API Setup
    const fetchUpdateTicketStatus = () => {
        return axios.post(
            getAPI("update-ticket-status"),
            {
                empid: getLoginUserID(),
                ticket_id: ticketID,
                status_id: statusChangedInfo.status_id,
                note: statusChangedInfo.note,
                assign_to: statusChangedInfo.assign_to,
                updated_by: getLoginUserID(),
            },
            { headers: { "Content-Type": "application/json", "X-CSRFToken": getCookie("csrftoken") } }
        );
    };

    //*Query Callback
    const {
        isLoading: isLoading_updateTicketStatus,
        data: data_updateTicketStatus,
        isError: isError_updateTicketStatus,
        error: error_updateTicketStatus,
        isFetching: isFetching_updateTicketStatus,
        refetch: refetch_updateTicketStatus,
    } = useQuery("update-ticket-status-UNIQUE-1", fetchUpdateTicketStatus, {
        enabled: false,
    });

    //*Query Response Actions
    useEffect(() => {
        if (isLoading_updateTicketStatus) {
            logPrint("🔍   updateTicketStatus  ➤  🔄");
        } else if (data_updateTicketStatus?.data) {
            logPrint("🔍   updateTicketStatus  ➤  🟢", data_updateTicketStatus?.data);
            refetch_getTicketStatusTimeline(); //!update time line on changes but nedd to add skelatopn loader
        } else if (isError_updateTicketStatus) {
            logPrint("🔍   updateTicketStatus  ➤  ⚠️", [error_updateTicketStatus?.message, error_updateTicketStatus?.response.data]);
        }
    }, [isLoading_updateTicketStatus, data_updateTicketStatus, isError_updateTicketStatus, error_updateTicketStatus]);

    //Todo[QUEARY] Get All Ticket Status Timeline
    //*API Setup
    const fetchTicketStatusTimeline = () => {
        return axios.post(getAPI("ticket-status-flow-by-id"), { empid: getLoginUserID(), ticket_id: ticketID }, { headers: { "Content-Type": "application/json", "X-CSRFToken": getCookie("csrftoken") } });
    };

    //*Query Callback
    const {
        isLoading: isLoading_getTicketStatusTimeline,
        data: data_getTicketStatusTimeline,
        isError: isError_getTicketStatusTimeline,
        error: error_getTicketStatusTimeline,
        isFetching: isFetching_getTicketStatusTimeline,
        refetch: refetch_getTicketStatusTimeline,
    } = useQuery("ticket-status-flow-by-id-UNIQUE-1", fetchTicketStatusTimeline, {
        enabled: false,
    });

    //*Query Response Actions
    useEffect(() => {
        if (isLoading_getTicketStatusTimeline) {
            logPrint("🔍   getTicketStatusTimeline  ➤  🔄");
        } else if (data_getTicketStatusTimeline?.data) {
            logPrint("🔍   getTicketStatusTimeline  ➤  🟢", data_getTicketStatusTimeline?.data);
        } else if (isError_getTicketStatusTimeline) {
            logPrint("🔍   getTicketStatusTimeline  ➤  ⚠️", [error_getTicketStatusTimeline?.message, error_getTicketStatusTimeline?.response.data]);
        }
    }, [isLoading_getTicketStatusTimeline, data_getTicketStatusTimeline, isError_getTicketStatusTimeline, error_getTicketStatusTimeline]);

    //Todo[QUEARY] Get All Ticket Status
    //*API Setup
    const fetchAllTicketStatus = () => {
        return axios.post(getAPI("get-all-ticket-status"), { empid: getLoginUserID() }, { headers: { "Content-Type": "application/json", "X-CSRFToken": getCookie("csrftoken") } });
    };

    //*Query Callback
    const {
        isLoading: isLoading_getAllTicketStatus,
        data: data_getAllTicketStatus,
        isError: isError_getAllTicketStatus,
        error: error_getAllTicketStatus,
        isFetching: isFetching_getAllTicketStatus,
        refetch: refetch_getAllTicketStatus,
    } = useQuery("get-all-ticket-status-UNIQUE-1", fetchAllTicketStatus, {
        enabled: true,
    });

    //*Query Response Actions
    useEffect(() => {
        if (isLoading_getAllTicketStatus) {
            logPrint("🔍   getAllTicketStatus  ➤  🔄");
        } else if (data_getAllTicketStatus?.data) {
            logPrint("🔍   getAllTicketStatus  ➤  🟢", data_getAllTicketStatus?.data);
        } else if (isError_getAllTicketStatus) {
            logPrint("🔍   getAllTicketStatus  ➤  ⚠️", [error_getAllTicketStatus?.message, error_getAllTicketStatus?.response.data]);
        }
    }, [isLoading_getAllTicketStatus, data_getAllTicketStatus, isError_getAllTicketStatus, error_getAllTicketStatus]);

    //Todo[QUEARY] Get mentionable user by sub-Domain
    //*API Setup
    const fetchCoMemberOfSubDomain = () => {
        return axios.post(getAPI("get-assign-to-user-by-subDomain"), { empid: getLoginUserID(), sub_domain_id: data_getTicketHeaderInfo?.data["issue_catagory"]["id"] }, { headers: { "Content-Type": "application/json", "X-CSRFToken": getCookie("csrftoken") } });
    };

    //*Query Callback
    const {
        isLoading: isLoading_getCoMemberOfSubDomain,
        data: data_getCoMemberOfSubDomain,
        isError: isError_getCoMemberOfSubDomain,
        error: error_getCoMemberOfSubDomain,
        isFetching: isFetching_getCoMemberOfSubDomain,
        refetch: refetch_getCoMemberOfSubDomain,
    } = useQuery("get-assign-to-user-by-subDomain-UNIQUE-1", fetchCoMemberOfSubDomain, {
        enabled: false,
    });

    //*Query Response Actions
    useEffect(() => {
        if (isLoading_getCoMemberOfSubDomain) {
            logPrint("🔍   getCoMemberOfSubDomain  ➤  🔄");
        } else if (data_getCoMemberOfSubDomain?.data) {
            logPrint("🔍   getCoMemberOfSubDomain  ➤  🟢", data_getCoMemberOfSubDomain?.data);
        } else if (isError_getCoMemberOfSubDomain) {
            logPrint("🔍   getCoMemberOfSubDomain  ➤  ⚠️", [error_getCoMemberOfSubDomain?.message, error_getCoMemberOfSubDomain?.response.data]);
        }
    }, [isLoading_getCoMemberOfSubDomain, data_getCoMemberOfSubDomain, isError_getCoMemberOfSubDomain, error_getCoMemberOfSubDomain]);

    useEffect(() => {
        if (data_getAllTicketStatus) {
            data_getAllTicketStatus?.data.map((individual_status) => {
                allStatusInfo[individual_status["name"]] = {
                    color: individual_status["color"],
                    status_id: individual_status["status_id"],
                };
            });
            //todo  Update Staus API Will be here
            //! Here, all available statuses are structured and nested. Which one is under which?
            //! These statuses are available in the dropdown of the "Select Status" option.

            const statusList = Object.keys(allStatusInfo);
            // const statusList = ["Requested", "Reviewed", "Assigned", "Visited", "Picked", "Refered", "Handovered", "Solved", "Unsolved", "Returned", "Closed"];
            const status = {
                Requested: statusList
                    .filter((item) => !["Requested", "Reviewed", "Handovered", "Solved", "Unsolved", "Returned", "Refered"].includes(item))
                    .map((status) => {
                        return { value: allStatusInfo[status]["status_id"], label: status };
                    }),
                Reviewed: statusList
                    .filter((item) => !["Requested", "Reviewed", "Handovered", "Solved", "Unsolved", "Returned"].includes(item))
                    .map((status) => {
                        return { value: allStatusInfo[status]["status_id"], label: status };
                    }),
                Assigned: statusList
                    .filter((item) => !["Requested", "Reviewed", "Picked", "Solved", "Unsolved", "Returned", "Closed"].includes(item))
                    .map((status) => {
                        return { value: allStatusInfo[status]["status_id"], label: status };
                    }),
                Visited: statusList
                    .filter((item) => !["Requested", "Reviewed", "Visited", "Handovered", "Returned"].includes(item))
                    .map((status) => {
                        return { value: allStatusInfo[status]["status_id"], label: status };
                    }),
                Picked: statusList
                    .filter((item) => !["Requested", "Reviewed", "Picked", "Visited"].includes(item))
                    .map((status) => {
                        return { value: allStatusInfo[status]["status_id"], label: status };
                    }),
                Refered: statusList
                    .filter((item) => !["Requested", "Reviewed", "Refered"].includes(item))
                    .map((status) => {
                        return { value: allStatusInfo[status]["status_id"], label: status };
                    }),
                Handovered: statusList
                    .filter((item) => !["Requested", "Reviewed", "Handovered", "Visited", "Picked"].includes(item))
                    .map((status) => {
                        return { value: allStatusInfo[status]["status_id"], label: status };
                    }),
                Solved: statusList
                    .filter((item) => !statusList.includes(item))
                    .map((status) => {
                        return { value: allStatusInfo[status]["status_id"], label: status };
                    }),
                UnSolved: statusList
                    .filter((item) => !statusList.includes(item))
                    .map((status) => {
                        return { value: allStatusInfo[status]["status_id"], label: status };
                    }),
                Returned: statusList
                    .filter((item) => !["Requested", "Reviewed", "Returned", "Assigned", "Visited", "Picked", "Refered", "Handovered"].includes(item))
                    .map((status) => {
                        return { value: allStatusInfo[status]["status_id"], label: status };
                    }),
                Closed: statusList
                    .filter((item) => !statusList.includes(item))
                    .map((status) => {
                        return { value: allStatusInfo[status]["status_id"], label: status };
                    }),
            };

            console.log(status, "------->>");
            setAvailableStatus(status);
        }
    }, [data_getAllTicketStatus]);

    useEffect(() => {
        console.log(statusChangedInfo, "--------***-----------");
    }, [statusChangedInfo]);

    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setStatusChangedInfo({ status_id: undefined, note: undefined, assign_to: undefined });
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
        refetch_updateTicketStatus(); //!Update status need to add loader and error handeling and conformation message
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    //!For now it delay 1500 afttrer query add then it will be dependent on Query
    useEffect(() => {
        setActiveLoading(true);

        refetch_getTicketHeaderInfo();
        refetch_getTicketStatusTimeline();
    }, [ticketID]);

    return (
        <Box sx={{ width: "100%", height: "100%" }}>
            {/* HEADER */}
            <Box sx={{ width: "calc(100% - 20px)", borderRadius: "7px", bgcolor: "#f6f6f6", display: "flex", justifyContent: "space-between", gap: "5px", padding: "10px" }}>
                <Box sx={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "5px" }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: "5px" , flexWrap: "wrap"}}>
                        <Box sx={{ display: { xs: "flex", md: "none" } }}>
                            <Link to="/quickaid/history" style={{ ...noStyle, cursor: "pointer" }}>
                                <Box sx={{ padding: "3px 5px", bgcolor: "#ececec", borderRadius: "5px", display: "flex", alignItems: "center" }}>
                                    <HistoryFilled style={{ color: "gray" }} />
                                    <Text type="secondary">History</Text>
                                </Box>
                            </Link>
                        </Box>

                        {!isActiveLoading ? (
                            <Box sx={{ padding: "3px 5px", bgcolor: "#ececec", borderRadius: "5px" }}>
                                <Text type="secondary">{ticketID}</Text>
                            </Box>
                        ) : (
                            <Skeleton.Input active={isActiveLoading} size={"small"} />
                        )}
                    </Box>

                    <Box sx={{ display: "flex", alignItems: "center", gap: "5px" , flexWrap: "wrap"}}>
                        {!isActiveLoading ? (
                            <Box sx={{ padding: "3px 5px", bgcolor: "#ececec", borderRadius: "5px" }}>
                                <Text type="secondary">
                                    {data_getTicketHeaderInfo?.data["domain"]["name"]}-{data_getTicketHeaderInfo?.data["issue_catagory"]["name"]}
                                </Text>
                            </Box>
                        ) : (
                            <Skeleton.Input active={isActiveLoading} size={"small"} />
                        )}

                        <Box sx={{ padding: "3px 5px", bgcolor: "#ececec", borderRadius: "5px" }}>
                            <CaretRightOutlined style={{ color: "gray" }} />
                        </Box>

                        {!isActiveLoading ? (
                            <Box sx={{ padding: "3px 5px", bgcolor: "#ececec", borderRadius: "5px" }}>
                                <Text type="secondary">{data_getTicketHeaderInfo?.data["issue_sub_category"]["name"]}</Text>
                            </Box>
                        ) : (
                            <Skeleton.Input active={isActiveLoading} size={"small"} />
                        )}
                    </Box>
                </Box>

                {/* If no status is available, the edit button will not be shown. */}
                {(availableStatus[data_getTicketHeaderInfo?.data["current_status"]["name"]] || []).length !== 0 && (
                    <Box sx={{ marginRight: "10px" }}>
                        <Button size="small" type="primary" onClick={showModal} style={{height:"28px"}}>
                            Change Status
                        </Button>
                    </Box>
                )}
            </Box>

            {!isActiveLoading ? (
                <Box>
                    <Box sx={{ marginTop: "10px" }}>
                        <ProfileCardXL empid={data_getTicketHeaderInfo?.data ? data_getTicketHeaderInfo?.data["requestor"]["empid"] : false} />
                    </Box>

                    {/* Modal Component */}
                    <EditModal data_getCoMemberOfSubDomain={data_getCoMemberOfSubDomain?.data} current_status={data_getTicketHeaderInfo?.data["current_status"]["name"]} isLoading_getAllTicketStatus={isLoading_getAllTicketStatus} availableStatus={availableStatus} statusChangedInfo={statusChangedInfo} setStatusChangedInfo={setStatusChangedInfo} ticketID={ticketID} isModalOpen={isModalOpen} handleOk={handleOk} handleCancel={handleCancel} />

                    {/* DESCRIPTION */}
                    <Box sx={{ textAlign: "justify", color: "grey", padding: "5px 3px", width: "100%" }}>
                        {data_getTicketHeaderInfo?.data["note"]}
                        {/* There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc. */}
                        <EditOutlined />
                    </Box>

                    {/* Timeline */}
                    <Box sx={{ marginTop: "20px" }}>
                        <RequestTimeline timeline_data={data_getTicketStatusTimeline?.data} />
                    </Box>
                </Box>
            ) : (
                <LoadingFullScreen />
            )}
        </Box>
    );
};
