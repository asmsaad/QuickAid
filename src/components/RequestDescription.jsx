import { CaretRightOutlined, EditOutlined, MedicineBoxOutlined, SisternodeOutlined, UserAddOutlined } from "@ant-design/icons";
import { Box } from "@mui/material";
import { Breadcrumb, Button, Card, Modal, Select, Skeleton, Tag, Timeline, Typography } from "antd";
import React, { useEffect, useState } from "react";

import "../All_Styles/Scrollbar.css";
import { ProfileCard, ProfileCardXS } from "../components/ProfileCard";
import { CalendarRegular, ClockRegular, HistoryFilled } from "@fluentui/react-icons";
import TextArea from "antd/es/input/TextArea";
import { Outlet, Link, useNavigate, useLocation, useParams } from "react-router-dom";
import { LoadingFullScreen } from "./DoodlingMessage";

import CommentRoundedIcon from "@mui/icons-material/CommentRounded";

const { Text } = Typography;

const RequestTimeline = () => {
    return (
        <div>
            <Timeline
                pending="Updgrade in progress..."
                reverse={true}
                items={[
                    {
                        color: "#FFA500",
                        children: <TimeLineContent color={"#FFA500"} step_name="Requested" profile_info={{ name: "A S M Mehedi Hasan Sad" }} />,
                    },
                    {
                        color: "#FFD700",
                        children: <TimeLineContent color={"#FFD700"} step_name="Reviewed" profile_info={{ name: "Hafizur Rahaman" }} />,
                    },
                    {
                        color: "#32CD32",
                        children: <TimeLineContent color={"#32CD32"} step_name="Assigned" profile_info={{ name: "Anamul Huq", name_2: "Hafizur Rahaman" }} />,
                    },
                    {
                        color: "#FFD700",
                        children: <TimeLineContent color={"#FFD700"} step_name="Reviewed" profile_info={{ name: "Anamul Huq" }} />,
                    },
                    {
                        color: "#1E90FF",
                        children: <TimeLineContent step_name="Visited" profile_info={{ name: "Anamul Huq" }} />,
                    },
                    {
                        color: "#6A5ACD",
                        children: <TimeLineContent color={"#6A5ACD"} step_name="Picked" profile_info={{ name: "Anamul Huq" }} />,
                    },

                    {
                        color: "#FF69B4",
                        children: <TimeLineContent color={"#FF69B4"} step_name="Refered" profile_info={{ name: "Adnan Ahamed", name_2: "Anamul Huq" }} />,
                    },
                    {
                        color: "#FF4500",
                        children: <TimeLineContent color={"#FF4500"} step_name="Handovered" profile_info={{ name: "Adnan Ahamed", name_2: "Anamul Huq" }} />,
                    },
                    {
                        color: "#00FA9A",
                        children: <TimeLineContent color={"#00FA9A"} step_name="Solved" profile_info={{ name: "Adnan Ahamed" }} />,
                    },
                    {
                        color: "#FF6347",
                        children: <TimeLineContent color={"#FF6347"} step_name="Returned" profile_info={{ name: "Adnan Ahamed" }} />,
                    },

                    {
                        color: "#808080",
                        children: <TimeLineContent color={"#808080"} step_name="Closed" profile_info={{ name: "A S M Mehedi Hasan Sad" }} />,
                    },
                    {
                        children: "Send to upgrade",
                    },
                ]}
            />
        </div>
    );
};

const EditModal = (props) => {
    //todo  Update Staus API Will be here
    //! Here, all available statuses are structured and nested. Which one is under which?
    //! These statuses are available in the dropdown of the "Select Status" option.

    const statusList = ["Requested", "Reviewed", "Assigned", "Visited", "Picked", "Refered", "Handovered", "Solved", "Unsolved", "Returned", "Closed"];
    const status = {
        Requested: statusList
            .filter((item) => !["Requested", "Reviewed", "Handovered", "Solved", "Unsolved", "Returned", "Refered"].includes(item))
            .map((status) => {
                return { value: status, label: status };
            }),
        Reviewed: statusList
            .filter((item) => !["Requested", "Reviewed", "Handovered", "Solved", "Unsolved", "Returned"].includes(item))
            .map((status) => {
                return { value: status, label: status };
            }),
        Assigned: statusList
            .filter((item) => !["Requested", "Reviewed", "Picked", "Solved", "Unsolved", "Returned", "Closed"].includes(item))
            .map((status) => {
                return { value: status, label: status };
            }),
        Visited: statusList
            .filter((item) => !["Requested", "Reviewed", "Visited", "Handovered", "Returned"].includes(item))
            .map((status) => {
                return { value: status, label: status };
            }),
        Picked: statusList
            .filter((item) => !["Requested", "Reviewed", "Picked", "Visited"].includes(item))
            .map((status) => {
                return { value: status, label: status };
            }),
        Refered: statusList
            .filter((item) => !["Requested", "Reviewed", "Refered"].includes(item))
            .map((status) => {
                return { value: status, label: status };
            }),
        Handovered: statusList
            .filter((item) => !["Requested", "Reviewed", "Handovered", "Visited", "Picked"].includes(item))
            .map((status) => {
                return { value: status, label: status };
            }),
        Solved: statusList
            .filter((item) => !statusList.includes(item))
            .map((status) => {
                return { value: status, label: status };
            }),
        UnSolved: statusList
            .filter((item) => !statusList.includes(item))
            .map((status) => {
                return { value: status, label: status };
            }),
        Returned: statusList
            .filter((item) => !["Requested", "Reviewed", "Returned", "Assigned", "Visited", "Picked", "Refered", "Handovered"].includes(item))
            .map((status) => {
                return { value: status, label: status };
            }),
        Closed: statusList
            .filter((item) => !statusList.includes(item))
            .map((status) => {
                return { value: status, label: status };
            }),
    };

    // console.log(status, "------>>>> >>>");

    return (
        <Modal width={350} title="Edit Action!" open={props.isModalOpen} onOk={props.handleOk} onCancel={props.handleCancel}>
            <Box sx={{ width: "100%" }}>
                <Select showSearch style={{ width: "100%" }} placeholder="Select Action" optionFilterProp="label" filterSort={(optionA, optionB) => (optionA?.label ?? "").toLowerCase().localeCompare((optionB?.label ?? "").toLowerCase())} options={[{ value: "1", label: "Not Identified" }]} options={status.Requested} />
            </Box>

            <Box sx={{ width: "100%", marginTop: "10px" }}>
                <Select showSearch style={{ width: "100%" }} placeholder="Assign to" optionFilterProp="label" filterSort={(optionA, optionB) => (optionA?.label ?? "").toLowerCase().localeCompare((optionB?.label ?? "").toLowerCase())} options={[{ value: "1", label: "Not Identified" }]} />
            </Box>

            <Box sx={{ width: "100%", marginTop: "10px" }}>
                <TextArea rows={3} placeholder="Leave a note!" />
            </Box>
        </Modal>
    );
};

const TimeLineContent = (props) => {
    const { step_name, date_time, profile_info, note, color } = props;
    return (
        <Box sx={{ width: "100%", maxWidth: "446px" }}>
            <Box sx={{ width: "100%", marginBottom: "10px" }}>
                <Box sx={{ width: "100%" }}>
                    <Text style={{ color: color }} strong>
                        {step_name}
                    </Text>
                </Box>
                <Box sx={{ width: "100%", display: "flex", alignItems: "center", lineHeight: "1.3" }}>
                    <CalendarRegular style={{ color: "gray", margin: "0 0 0 0", lineHeight: "1.3" }} />
                    <Text type="secondary" style={{ lineHeight: "1.3" }}>
                        10 Jan, 2024
                    </Text>
                    <ClockRegular style={{ color: "gray", margin: "0 0 0 10px", lineHeight: "1.3" }} />
                    <Text type="secondary" style={{ lineHeight: "1.3" }}>
                        10:12 PM BDT
                    </Text>
                </Box>
            </Box>

            {(step_name === "Requested" || step_name === "Reviewed" || step_name === "Visited" || step_name === "Picked" || step_name === "Delivered" || step_name === "Returned" || step_name === "Solved" || step_name === "Closed") && (
                <Box sx={{ display: "flex", marginTop: "10px", width: "100%" }}>
                    <Box sx={{ height: "calc(56px - 20px)", minWidth: "calc(56px - 20px)", maxWidth: "calc(56px - 20px)", bgcolor: "#fbfbfb", borderRadius: "10px", padding: "10px", margin: "0 8px 0 0", display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <Text style={{ fontSize: "14px" }}>By</Text>
                    </Box>
                    <Box sx={{ width: `calc(100% - 65px)` }}>
                        <ProfileCardXS info={profile_info.name} />
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
                            <ProfileCardXS info={profile_info.name} />
                        </Box>
                    </Box>

                    <Box sx={{ display: "flex", marginTop: "10px" }}>
                        <Box sx={{ height: "calc(56px - 20px)", minWidth: "calc(56px - 20px)", maxWidth: "calc(56px - 20px)", bgcolor: "#fbfbfb", borderRadius: "10px", padding: "10px", margin: "0 8px 0 0", display: "flex", justifyContent: "center", alignItems: "center" }}>
                            <Text style={{ fontSize: "14px" }}>{step_name === "Handovered" ? "From" : "By"}</Text>
                        </Box>
                        <Box sx={{ width: `calc(100% - 65px)` }}>
                            <ProfileCardXS info={profile_info.name_2} />
                        </Box>
                    </Box>
                </Box>
            )}

            {(step_name === "Visited" || step_name === "Picked" || step_name === "Delivered" || step_name === "Returned" || step_name === "Solved" || step_name === "Closed") && (
                <Box sx={{ width: `calc(100% - 20px)`, marginTop: "10px", textAlign: "justify", border: "0.5px solid #e2e2e2", borderRadius: "5px", padding: "10px" }}>
                    <Text type="secondary">
                        <span style={{ backgroundColor:"red"}}>
                            <CommentRoundedIcon style={{ fontSize: "16px"}} />{" "}
                        </span>
                        There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form,.
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

    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const [isActiveLoading, setActiveLoading] = useState(true);

    //!For now it delay 1500 afttrer query add then it will be dependent on Query
    useEffect(() => {
        setActiveLoading(true);
        setTimeout(() => {
            setActiveLoading(false);
        }, 1500);
    }, [ticketID]);

    return (
        <Box sx={{ width: "100%", height: "100%" }}>
            {/* HEADER */}
            <Box sx={{ width: "100%", height: "50px", borderRadius: "7px", bgcolor: "#f6f6f6", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Box sx={{ marginLeft: "10px", display: "flex", alignItems: "center", gap: "5px" }}>
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

                    {!isActiveLoading ? (
                        <Box sx={{ padding: "3px 5px", bgcolor: "#ececec", borderRadius: "5px" }}>
                            <Text type="secondary">IT-Services</Text>
                        </Box>
                    ) : (
                        <Skeleton.Input active={isActiveLoading} size={"small"} />
                    )}

                    <Box sx={{ padding: "3px 5px", bgcolor: "#ececec", borderRadius: "5px" }}>
                        <CaretRightOutlined style={{ color: "gray" }} />
                    </Box>

                    {!isActiveLoading ? (
                        <Box sx={{ padding: "3px 5px", bgcolor: "#ececec", borderRadius: "5px" }}>
                            <Text type="secondary">Laptop flikaring</Text>
                        </Box>
                    ) : (
                        <Skeleton.Input active={isActiveLoading} size={"small"} />
                    )}

                    {/* <Box sx={{ padding: "3px 5px", bgcolor: "#ececec", borderRadius: "5px" }}>{!isActiveLoading ? <Text type="secondary">Laptop flikaring</Text> : <Skeleton.Input active={isActiveLoading} size={"small"} />}</Box> */}
                </Box>
                <Box sx={{ marginRight: "10px" }}>
                    {" "}
                    <Button type="primary" onClick={showModal}>
                        Edit
                    </Button>{" "}
                </Box>
            </Box>

            {!isActiveLoading ? (
                <Box>
                    <Box sx={{ marginTop: "10px" }}>
                        <ProfileCard />
                    </Box>

                    {/* Modal Component */}
                    <EditModal isModalOpen={isModalOpen} handleOk={handleOk} handleCancel={handleCancel} />

                    {/* DESCRIPTION */}
                    <Box sx={{ textAlign: "justify", color: "grey", padding: "0 3px", width: "100%" }}>
                        There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.
                        <EditOutlined />
                    </Box>

                    {/* Timeline */}
                    <Box sx={{ marginTop: "20px" }}>
                        <RequestTimeline />
                    </Box>
                </Box>
            ) : (
                <LoadingFullScreen />
            )}
        </Box>
    );
};
