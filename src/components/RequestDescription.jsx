import { CaretRightOutlined, EditOutlined, LoadingOutlined, MedicineBoxOutlined, SisternodeOutlined, UserAddOutlined } from "@ant-design/icons";
import { Box } from "@mui/material";
import { Breadcrumb, Button, Card, Modal, Rate, Select, Skeleton, Tag, Timeline, Typography } from "antd";
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
import { AvatarGroup } from "./AppAvatar";
import { Rating, RatingDisplay } from "@fluentui/react-components";
import { Reviews } from "@mui/icons-material";

const { Text } = Typography;

//
//
const statusProperty = {
    Requested: { color: "#d4380d", field: { assign_to: false, note: false } },
    // Reviewed: { color: "" },
    Assigned: { color: "#1d39c4", field: { assign_to: true, note: false } },
    Visited: { color: "#08979c", field: { assign_to: true, note: true } },
    Picked: { color: "#d48806", field: { assign_to: true, note: true } },
    Refered: { color: "#531dab", field: { assign_to: true, note: true } },
    Handovered: { color: "#0958d9", field: { assign_to: true, note: true } },
    Solved: { color: "#389e0d", field: { assign_to: true, note: true } },
    Unsolved: { color: "#cf1322", field: { assign_to: true, note: true } },
    Returned: { color: "#7cb305", field: { assign_to: true, note: false } },
    Closed: { color: "#c3c3c3", field: { assign_to: true, note: true } },
};

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
                        color: statusProperty[timeline_data[index]["status"]["status"]]["color"],
                        children: <TimeLineContent status_info={timeline_data[index]} />,
                    };
                })}
            />
        </div>
    );
};

const allStatusInfo = {};

const EditModal = (props) => {
    const { isChangeingStatusLoading, data_getCoMemberOfSubDomain, current_status, ticketID, statusChangedInfo, setStatusChangedInfo, availableStatus, isLoading_getAllTicketStatus } = props;

    return (
        <Modal width={350} title="Update ticket status" open={props.isModalOpen} onOk={props.handleOk} onCancel={props.handleCancel} footer={null} maskClosable={false}>
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
                            console.log(selectedObject, "-------AAS------");
                            setStatusChangedInfo({ ...statusChangedInfo, status_id: value ? value : undefined, status_name: selectedObject?.label ? selectedObject?.label : undefined });
                        }}
                        options={availableStatus[current_status]}
                    />
                )}
            </Box>

            {["Assigned", "Refered", "Handovered"].includes(statusChangedInfo?.status_name || "") && (
                <Box sx={{ width: "100%", marginTop: "10px" }}>
                    <Select
                        placeholder="Search by name or employee ID."
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
            )}

            {["Visited", "Picked", "Delivered", "Returned", "Solved", "Closed"].includes(statusChangedInfo?.status_name || "") && (
                <Box sx={{ width: "100%", marginTop: "10px", marginBottom: "25px" }}>
                    <TextArea size="medium" placeholder="Make a clear, concise, and understandable note." showCount maxLength={1024} rows={3} value={statusChangedInfo.note} onChange={(e) => setStatusChangedInfo({ ...statusChangedInfo, note: e.target.value })} disabled={statusChangedInfo.status_id ? false : true} />
                </Box>
            )}

            {/* {console.log(,  ["Assigned", "Refered", "Handovered"].includes(statusChangedInfo?.status_name || ""),'====++++==')} */}
            <Box sx={{ width: "100%", marginTop: "10px", marginBottom: "25px", display: "flex", justifyContent: "flex-end" }}>
                <Button type="primary" loading={isChangeingStatusLoading[0]} onClick={() => props.handleOk()} disabled={isChangeingStatusLoading[0] || (["Assigned", "Refered", "Handovered"].includes(statusChangedInfo?.status_name) ? !statusChangedInfo?.assign_to : false)}>
                    Change
                </Button>
            </Box>
        </Modal>
    );
};

const TimeLineContent = (props) => {
    const { date_time, profile_info, note, status_info } = props;

    const step_name = status_info["status"]["status"];
    // const color = status_info["status"]["color"];
    const color = statusProperty[step_name]["color"];

    const updated_on = convertTimestamp(status_info["update_on"]);

    return (
        <Box sx={{ width: "100%", maxWidth: "446px" }}>
            {/*//* HEADER */}
            <Box sx={{ width: "100%", marginBottom: "10px" }}>
                {/* STATUS NAME */}
                <Box sx={{ width: "100%" }}>
                    <Text style={{ color: color }} strong>
                        {step_name}
                    </Text>
                </Box>

                {/*STATUS UPDATE DATE TIME */}
                <Box sx={{ width: "100%", display: "flex", alignItems: "center", lineHeight: "1.3" }}>
                    <CalendarMonthRoundedIcon fontSize="16px" style={{ margin: "0 2px 0 0", color: "#b5b5b5" }} />
                    {/* DATE */}
                    <Text type="secondary" style={{ lineHeight: "1.3" }}>
                        {updated_on.date}
                    </Text>
                    {/* TIME */}
                    <AccessTimeOutlinedIcon fontSize="16px" style={{ margin: "0 2px 0 10px", color: "#a1a1a1" }} />
                    <Text type="secondary" style={{ lineHeight: "1.3" }}>
                        {updated_on.time}
                    </Text>
                </Box>
            </Box>
            {/* {(step_name === "Requested" || step_name === "Reviewed" || step_name === "Visited" || step_name === "Picked" || step_name === "Delivered" || step_name === "Returned" || step_name === "Solved" || step_name === "Closed") && (
                <Box sx={{ display: "flex", marginTop: "10px", width: "100%" }}>
                    <Box sx={{ height: "calc(56px - 20px)", minWidth: "calc(56px - 20px)", maxWidth: "calc(56px - 20px)", bgcolor: "#fbfbfb", borderRadius: "10px", padding: "10px", margin: "0 8px 0 0", display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <Text style={{ fontSize: "14px" }}>By</Text>
                    </Box>
                    <Box sx={{ width: `calc(100% - 65px)` }}>
                        <ProfileCardXS info={status_info.updated_by.name} />
                    </Box>
                </Box>
            )} */}
            <Box sx={{ width: "100%" }}>
                {/* 2nd PERSON */}

                {["Assigned", "Refered", "Handovered"].includes(step_name) && (
                    <Box sx={{ display: "flex" }}>
                        <Box sx={{ height: "calc(56px - 20px)", minWidth: "calc(56px - 20px)", maxWidth: "calc(56px - 20px)", bgcolor: "#e2e2e2", borderRadius: "10px", padding: "10px", margin: "0 8px 0 0", display: "flex", justifyContent: "center", alignItems: "center" }}>
                            <Text style={{ fontSize: "14px" }}>To</Text>
                        </Box>
                        <Box sx={{ width: `calc(100% - 65px)` }}>
                            <ProfileCardXS info={status_info.assign_to.name} />
                        </Box>
                    </Box>
                )}

                {/* 1st PERSON */}
                <Box sx={{ display: "flex", marginTop: "10px" }}>
                    <Box sx={{ height: "calc(56px - 20px)", minWidth: "calc(56px - 20px)", maxWidth: "calc(56px - 20px)", bgcolor: "#e2e2e2", borderRadius: "10px", padding: "10px", margin: "0 8px 0 0", display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <Text style={{ fontSize: "14px" }}>{step_name === "Handovered" ? "From" : "By"}</Text>
                    </Box>
                    <Box sx={{ width: `calc(100% - 65px)` }}>
                        <ProfileCardXS info={status_info.updated_by.name} />
                    </Box>
                </Box>
            </Box>

            {["Visited", "Picked", "Delivered", "Returned", "Solved", "Closed"].includes(step_name) && (status_info.note || "").trim() !== "" && (
                <Box sx={{ width: `calc(100% - 20px)`, marginTop: "10px", textAlign: "justify", border: "0.5px solid #e2e2e2", borderRadius: "5px", padding: "10px", lineHeight: "1" }}>
                    <CommentRoundedIcon sx={{ fontSize: "14px", color: "gray", margin: "0 2px  0 0" }} />
                    <Text type="secondary" style={{ lineHeight: "1.1" }}>
                        {status_info.note}
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

    const [isChangeingStatusLoading, setChangeingStatusLoading] = useState([0]);
    const [isActiveLoading, setActiveLoading] = useState(true);
    const [availableStatus, setAvailableStatus] = useState([]);
    const [statusChangedInfo, setStatusChangedInfo] = useState({ status_id: undefined, note: undefined, assign_to: undefined });

    //Todo[QUEARY] Get All Ticket Status Timeline
    //*API Setup
    const fetchViewedTickedByUser = () => {
        return axios.post(getAPI("get_viewer_by_request"), { empid: getLoginUserID(), ticket_id: ticketID }, { headers: { "Content-Type": "application/json", "X-CSRFToken": getCookie("csrftoken") } });
    };

    //*Query Callback
    const {
        isLoading: isLoading_getViewedTickedByUser,
        data: data_getViewedTickedByUser,
        isError: isError_getViewedTickedByUser,
        error: error_getViewedTickedByUser,
        isFetching: isFetching_getViewedTickedByUser,
        refetch: refetch_getViewedTickedByUser,
    } = useQuery("get_viewer_by_request-UNIQUE-1", fetchViewedTickedByUser, {
        enabled: true,
    });

    //*Query Response Actions
    useEffect(() => {
        if (isLoading_getViewedTickedByUser) {
            logPrint("🔍   getViewedTickedByUser  ➤  🔄");
        } else if (data_getViewedTickedByUser?.data) {
            logPrint("🔍   getViewedTickedByUser  ➤  🟢", data_getViewedTickedByUser?.data);
            //!Every 30s it will be updated
            setTimeout(() => {
                refetch_getViewedTickedByUser();
            }, 30000);
        } else if (isError_getViewedTickedByUser) {
            logPrint("🔍   getViewedTickedByUser  ➤  ⚠️", [error_getViewedTickedByUser?.message, error_getViewedTickedByUser?.response.data]);
        }
    }, [isLoading_getViewedTickedByUser, data_getViewedTickedByUser, isError_getViewedTickedByUser, error_getViewedTickedByUser]);

    //Todo[QUEARY] Get All Ticket Status Timeline
    //*API Setup
    const fetchRegisterTicketViewedByUser = () => {
        return axios.post(getAPI("update-request-viewed-users"), { empid: getLoginUserID(), ticket_id: ticketID }, { headers: { "Content-Type": "application/json", "X-CSRFToken": getCookie("csrftoken") } });
    };

    //*Query Callback
    const {
        isLoading: isLoading_saveTicketViewedByUser,
        data: data_saveTicketViewedByUser,
        isError: isError_saveTicketViewedByUser,
        error: error_saveTicketViewedByUser,
        isFetching: isFetching_saveTicketViewedByUser,
        refetch: refetch_saveTicketViewedByUser,
    } = useQuery("update-request-viewed-users-UNIQUE-1", fetchRegisterTicketViewedByUser, {
        enabled: false,
    });

    //*Query Response Actions
    useEffect(() => {
        if (isLoading_saveTicketViewedByUser) {
            logPrint("🔍   saveTicketViewedByUser  ➤  🔄");
        } else if (data_saveTicketViewedByUser?.data) {
            logPrint("🔍   saveTicketViewedByUser  ➤  🟢", data_saveTicketViewedByUser?.data);
        } else if (isError_saveTicketViewedByUser) {
            logPrint("🔍   saveTicketViewedByUser  ➤  ⚠️", [error_saveTicketViewedByUser?.message, error_saveTicketViewedByUser?.response.data]);
        }
    }, [isLoading_saveTicketViewedByUser, data_saveTicketViewedByUser, isError_saveTicketViewedByUser, error_saveTicketViewedByUser]);

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
            setTimeout(() => {
                setChangeingStatusLoading([0]);
            }, 1000);
            setTimeout(() => {
                setIsModalOpen(false);
            }, 1500);
        } else if (isError_updateTicketStatus) {
            logPrint("🔍   updateTicketStatus  ➤  ⚠️", [error_updateTicketStatus?.message, error_updateTicketStatus?.response.data]);
            setTimeout(() => {
                setChangeingStatusLoading([0]);
            }, 1000);
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

            // console.log(status, "------->>");
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
        setChangeingStatusLoading([1]);
        refetch_updateTicketStatus(); //!Update status need to add loader and error handeling and conformation message
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    //!For now it delay 1500 afttrer query add then it will be dependent on Query
    useEffect(() => {
        setActiveLoading(true);

        setTimeout(() => {
            refetch_saveTicketViewedByUser();
        }, 1500);

        refetch_getTicketHeaderInfo();
        refetch_getTicketStatusTimeline();
    }, [ticketID]);

    return (
        <Box sx={{ width: "100%", height: "100%" }}>
            {/* HEADER */}
            <Box sx={{ width: "calc(100% - 20px)", borderRadius: "7px", bgcolor: "#f6f6f6", display: "flex", justifyContent: "space-between", gap: "5px", padding: "10px" }}>
                <Box sx={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "5px" }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: "5px", flexWrap: "wrap" }}>
                        <Box sx={{ display: { xs: "flex", md: "none" } }}>
                            <Link to="/quickaid/history" style={{ ...noStyle, cursor: "pointer" }}>
                                <Box sx={{ height: "22px", padding: "5px 10px", fontSize: "16px", bgcolor: "#d4d4d4", borderRadius: "5px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                                    {/* <Box sx={{ padding: "3px 5px", bgcolor: "#d4d4d4", borderRadius: "5px", display: "flex", alignItems: "center" }}> */}
                                    <HistoryFilled style={{ color: "#6c6c6c" }} />
                                    <Text type="secondary" style={{ color: "#6c6c6c" }}>
                                        History
                                    </Text>
                                </Box>
                            </Link>
                        </Box>

                        {!isActiveLoading ? (
                            <Box sx={{ height: "22px", padding: "5px 10px", fontSize: "16px", bgcolor: "#ececec", borderRadius: "5px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                                <Text type="secondary">{ticketID}</Text>
                            </Box>
                        ) : (
                            <Skeleton.Input active={isActiveLoading} size={"default"} />
                        )}
                    </Box>

                    <Box sx={{ display: "flex", alignItems: "center", gap: "5px", flexWrap: "wrap" }}>
                        {!isActiveLoading ? (
                            <Box sx={{ height: "22px", padding: "5px 10px", fontSize: "16px", bgcolor: "#ececec", borderRadius: "5px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                                <Text type="secondary">
                                    {data_getTicketHeaderInfo?.data["domain"]["name"]}-{data_getTicketHeaderInfo?.data["issue_catagory"]["name"]}
                                </Text>
                            </Box>
                        ) : (
                            <Skeleton.Input active={isActiveLoading} size={"default"} />
                        )}

                        <Box sx={{ height: "22px", padding: "5px 10px", fontSize: "16px", bgcolor: "#ececec", borderRadius: "5px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                            <CaretRightOutlined style={{ color: "gray" }} />
                        </Box>

                        {!isActiveLoading ? (
                            <Box sx={{ height: "22px", padding: "5px 10px", fontSize: "16px", bgcolor: "#ececec", borderRadius: "5px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                                <Text type="secondary">{data_getTicketHeaderInfo?.data["issue_sub_category"]["name"]}</Text>
                            </Box>
                        ) : (
                            <Skeleton.Input active={isActiveLoading} size={"default"} />
                        )}
                    </Box>
                </Box>

                {/* If no status is available, the edit button will not be shown. */}
                {(availableStatus[data_getTicketHeaderInfo?.data["current_status"]["name"]] || []).length !== 0 && (
                    <Box sx={{ marginRight: "10px" }}>
                        {!isActiveLoading ? (
                            <Button type="primary" size="default" onClick={showModal} style={{ height: "32px", fontSize: "16px" }}>
                                Change Status
                            </Button>
                        ) : (
                            <Skeleton.Button active={isActiveLoading} size={"default"} style={{ width: "105px" }} />
                        )}
                    </Box>
                )}
            </Box>

            {!isActiveLoading ? (
                <Box sx={{ margin: "10px 0" }}>
                    <Box sx={{ marginTop: "" }}>
                        <ProfileCardXL empid={data_getTicketHeaderInfo?.data ? data_getTicketHeaderInfo?.data["requestor"]["empid"] : false} />
                    </Box>

                    {/* Modal Component */}
                    {console.log(data_getTicketStatusTimeline?.data[Object.keys(data_getTicketStatusTimeline?.data || {}).slice(-1)]["status"]["status"], "XXXX")}
                    <EditModal isChangeingStatusLoading={isChangeingStatusLoading} data_getCoMemberOfSubDomain={data_getCoMemberOfSubDomain?.data} current_status={data_getTicketStatusTimeline?.data[Object.keys(data_getTicketStatusTimeline?.data || {}).slice(-1)]["status"]["status"]} isLoading_getAllTicketStatus={isLoading_getAllTicketStatus} availableStatus={availableStatus} statusChangedInfo={statusChangedInfo} setStatusChangedInfo={setStatusChangedInfo} ticketID={ticketID} isModalOpen={isModalOpen} handleOk={handleOk} handleCancel={handleCancel} />
                    {/* <EditModal isChangeingStatusLoading={isChangeingStatusLoading} data_getCoMemberOfSubDomain={data_getCoMemberOfSubDomain?.data} current_status={data_getTicketHeaderInfo?.data["current_status"]["name"]} isLoading_getAllTicketStatus={isLoading_getAllTicketStatus} availableStatus={availableStatus} statusChangedInfo={statusChangedInfo} setStatusChangedInfo={setStatusChangedInfo} ticketID={ticketID} isModalOpen={isModalOpen} handleOk={handleOk} handleCancel={handleCancel} /> */}

                    {/* Mentioned and viewed by */}
                    <Box sx={{ textAlign: "justify", color: "grey", padding: "10px", width: "calc(100% - 20px)", bgcolor: "#fbfbfb", margin: "10px 0", borderRadius: "10px" }}>
                        <AvatarGroup layout="spread" size={20} data={data_getViewedTickedByUser?.data} show_more_display_side="right" />
                    </Box>

                    {/* DESCRIPTION */}
                    <Box sx={{ textAlign: "justify", color: "grey", padding: "10px", width: "calc(100% - 20px)", bgcolor: "#fbfbfb", margin: "10px 0", borderRadius: "10px" }}>
                        {data_getTicketHeaderInfo?.data["note"]}
                        {/* There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc. */}
                        <EditOutlined />
                    </Box>

                    {/* Timeline */}
                    {console.log(data_getTicketStatusTimeline?.data[Object.keys(data_getTicketStatusTimeline?.data || {}).slice(-1)]["updated_by"]["empid"], "777777")}
                    <Box sx={{ marginTop: "10px", display: "flex", flexDirection: { xs: "column", xl: "row" }, gap: "10px" }}>
                        {data_getTicketStatusTimeline?.data[Object.keys(data_getTicketStatusTimeline?.data || {}).slice(-1)]["status"]["status"] === "Closed" && (
                            <Box sx={{ width: "fit-content" }}>
                                <RatingBox ticketID={ticketID} isTicketRequester={data_getTicketStatusTimeline?.data[Object.keys(data_getTicketStatusTimeline?.data || {}).slice(-1)]["updated_by"]["empid"] === getLoginUserID() ? true : false} />
                            </Box>
                        )}

                        <Box sx={{ width: "calc(492px - 20px)", borderRadius: "10px", bgcolor: "#fbfbfb", padding: "10px" }}>
                            <Box sx={{ marginBottom: "10px" }}>
                                <Text style={{ fontSize: "15px" }}>Timelien</Text>
                            </Box>

                            <RequestTimeline timeline_data={data_getTicketStatusTimeline?.data} />
                        </Box>
                    </Box>
                </Box>
            ) : (
                <LoadingFullScreen />
            )}
        </Box>
    );
};

////
////
////
////

const RatingBox = (props) => {
    const { ticketID, isTicketRequester } = props;

    const [ratingInfo, setRatingInfo] = useState({ rating: { exprience: null }, comment: "" });
    const [postBtnLoading, setPostBtnLoading] = useState([0]);

    //Todo[QUEARY] Get Ticket Review by Requester After Closing
    //*API Setup
    const fetchTicketRatingsAndComments = () => {
        return axios.post(getAPI("get-rating-by-ticketid"), { empid: getLoginUserID(), ticket_id: ticketID }, { headers: { "Content-Type": "application/json", "X-CSRFToken": getCookie("csrftoken") } });
    };

    //*Query Callback
    const {
        isLoading: isLoading_getTicketRatingsAndComments,
        data: data_getTicketRatingsAndComments,
        isError: isError_getTicketRatingsAndComments,
        error: error_getTicketRatingsAndComments,
        isFetching: isFetching_getTicketRatingsAndComments,
        refetch: refetch_getTicketRatingsAndComments,
    } = useQuery("get-rating-by-ticketid-UNIQUE-1", fetchTicketRatingsAndComments, {
        enabled: true,
    });

    //*Query Response Actions
    useEffect(() => {
        if (isLoading_getTicketRatingsAndComments) {
            logPrint("🔍   getTicketRatingsAndComments  ➤  🔄");
        } else if (data_getTicketRatingsAndComments?.data) {
            logPrint("🔍   getTicketRatingsAndComments  ➤  🟢", data_getTicketRatingsAndComments?.data);
            setRatingInfo({ rating: { exprience: data_getTicketRatingsAndComments?.data?.rating?.exprience || null }, comment: data_getTicketRatingsAndComments?.data?.comment === null ? "" : data_getTicketRatingsAndComments?.data?.comment });
        } else if (isError_getTicketRatingsAndComments) {
            logPrint("🔍   getTicketRatingsAndComments  ➤  ⚠️", [error_getTicketRatingsAndComments?.message, error_getTicketRatingsAndComments?.response.data]);
        }
    }, [isLoading_getTicketRatingsAndComments, data_getTicketRatingsAndComments, isError_getTicketRatingsAndComments, error_getTicketRatingsAndComments]);

    ////
    ////
    ////

    //Todo[QUEARY] Update Ticket Rating
    //*API Setup
    const fetchUpdateTicketRatingByRequeser = () => {
        return axios.post(getAPI("submit-ticket-exprience-rating"), { empid: getLoginUserID(), ticket_id: ticketID, ...ratingInfo }, { headers: { "Content-Type": "application/json", "X-CSRFToken": getCookie("csrftoken") } });
    };

    //*Query Callback
    const {
        isLoading: isLoading_getUpdateTicketRatingByRequeser,
        data: data_getUpdateTicketRatingByRequeser,
        isError: isError_getUpdateTicketRatingByRequeser,
        error: error_getUpdateTicketRatingByRequeser,
        isFetching: isFetching_getUpdateTicketRatingByRequeser,
        refetch: refetch_getUpdateTicketRatingByRequeser,
    } = useQuery("submit-ticket-exprience-rating-UNIQUE-1", fetchUpdateTicketRatingByRequeser, {
        enabled: false,
    });

    //*Query Response Actions
    useEffect(() => {
        if (isLoading_getUpdateTicketRatingByRequeser) {
            logPrint("🔍   getUpdateTicketRatingByRequeser  ➤  🔄");
            setPostBtnLoading([1]);
        } else if (data_getUpdateTicketRatingByRequeser?.data) {
            logPrint("🔍   getUpdateTicketRatingByRequeser  ➤  🟢", data_getUpdateTicketRatingByRequeser?.data);
            setTimeout(() => {
                setPostBtnLoading([0]);
                refetch_getTicketRatingsAndComments();
            }, 1500);
        } else if (isError_getUpdateTicketRatingByRequeser) {
            logPrint("🔍   getUpdateTicketRatingByRequeser  ➤  ⚠️", [error_getUpdateTicketRatingByRequeser?.message, error_getUpdateTicketRatingByRequeser?.response.data]);
            setPostBtnLoading([1]);
        }
    }, [isLoading_getUpdateTicketRatingByRequeser, data_getUpdateTicketRatingByRequeser, isError_getUpdateTicketRatingByRequeser, error_getUpdateTicketRatingByRequeser]);

    ////
    ////
    ////

    useEffect(() => {
        console.log(ratingInfo, "TicketRating-----");
    }, [ratingInfo]);

    const rating_value = data_getTicketRatingsAndComments?.data?.rating?.exprience ? data_getTicketRatingsAndComments?.data?.rating?.exprience : null;

    // return(<>A</>)
    return (
        <Box>
            {/*//* CHECKING FOR DATA */}
            {data_getTicketRatingsAndComments?.data !== undefined && (
                <Box sx={{ width: "calc(492px - 20px)", borderRadius: "10px", bgcolor: "#fbfbfb", padding: "10px" }}>
                    {/* ///// */}
                    {/* RATING TITLE */}
                    <Text style={{ fontSize: "15px" }}>{isTicketRequester ? (rating_value !== null ? "Your experience" : "Rate your experience") : "User Experience"}</Text>
                    {/* /////// */}
                    {/* /////// */}
                    {/* /////// */}
                    {/* RATING STARTS */}
                    {!isTicketRequester && rating_value === null ? (
                        <Box>
                            <LoadingOutlined style={{ fontSize: "12px" }} />
                            <Text type="secondary"> Waitng for Feedback</Text>
                        </Box>
                    ) : (
                        <Box>
                            {ratingInfo.rating.exprience === null ? 0 : ratingInfo.rating.exprience}
                            <Rating value={ratingInfo.rating.exprience === null ? 0 : ratingInfo.rating.exprience} onChange={(e) => setRatingInfo({ ...ratingInfo, rating: { ...ratingInfo.rating, exprience: e.target.value } })} color="marigold" style={{ pointerEvents: isTicketRequester && !data_getTicketRatingsAndComments?.data?.rating?.exprience ? "" : "none" }} />
                        </Box>
                    )}
                    {/* /////// */}
                    {/* /////// */}
                    {/* /////// */}
                    {/* /////// */}
                    {/* IF RATING IS  NOT PROVIDE */} {/*//? ONLY FOR REQUEST MAKER */}
                    {isTicketRequester && rating_value === null ? (
                        <Box sx={{ margin: "5px 0 0px 0" }}>
                            <Text>Comment on your experience.</Text>
                            <TextArea size="medium" placeholder="Make a constructive comment. Once you post your experience, you cannot undo or change it." showCount maxLength={1024} rows={3} value={ratingInfo.comment} onChange={(e) => setRatingInfo({ ...ratingInfo, comment: e.target.value })} disabled={ratingInfo?.rating?.exprience ? false : true} />
                            <Box sx={{ width: "100%", display: "flex", justifyContent: "flex-end", marginTop: "20px" }}>
                                <Button type="primary" loading={postBtnLoading[0]} onClick={() => refetch_getUpdateTicketRatingByRequeser()} disabled={ratingInfo.rating?.exprience ? false : true}>
                                    Post
                                </Button>
                            </Box>
                        </Box>
                    ) : (
                        // IF ANY GIVEN COMMENT ARE AVAILABLE THEN DISPLAY COMENTS //?For ALL
                        (data_getTicketRatingsAndComments?.data?.comment || "").trim() !== "" && (
                            <Box sx={{ width: `calc(100% - 20px)`, marginTop: "10px", textAlign: "justify", border: "0.5px solid #e2e2e2", borderRadius: "5px", padding: "10px", lineHeight: "1" }}>
                                <CommentRoundedIcon sx={{ fontSize: "14px", color: "gray", margin: "0 2px 0 0" }} />
                                <Text type="secondary" style={{ lineHeight: "1.1" }}>
                                    {data_getTicketRatingsAndComments?.data?.comment}
                                </Text>
                            </Box>
                        )
                    )}
                </Box>
            )}
        </Box>
    );
};
