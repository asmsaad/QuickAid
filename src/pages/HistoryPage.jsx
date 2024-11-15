import { MedicineBoxOutlined, SisternodeOutlined, UserAddOutlined } from "@ant-design/icons";
import { Box } from "@mui/material";
import { Breadcrumb, Button, Card, Tag, Timeline, Typography } from "antd";
import React, { useState } from "react";

import "../All_Styles/Scrollbar.css";
import { ProfileCard, ProfileCardXS } from "../components/ProfileCard";
import { CalendarRegular, ClockRegular } from "@fluentui/react-icons";

const { Text, Link } = Typography;

const items = [
    {
        title: "IT",
    },
    {
        title: "Laptop",
    },
];

const HistoryPage = () => {
    return (
        <Box sx={{ width: "100%", height: "100%", display: "flex" }}>
            <HistoryPageStucture />
        </Box>
    );
};

const RequestCard = () => {
    return (
        <Box sx={{ width: `calc(100% - 30px)`, maxWidth: "400px", marginRight: "5px", height: "120px", borderRadius: "10px", border: "0.5px solid #ededed", "&:hover": { border: "1px dashed grey", cursor: "pointer" }, padding: "5px 10px", bgcolor: "#FCFCFC" }}>
            {/* HEADER */}
            <Box sx={{ width: "100%", display: "flex", justifyContent: "space-between" }}>
                <Box>
                    {" "}
                    <Breadcrumb items={items} />{" "}
                </Box>
                <Box>
                    {" "}
                    <Tag style={{ margin: "0" }}>Accepted</Tag>{" "}
                </Box>
            </Box>

            {/* DESCRIPTION */}
            <Box sx={{ width: "100%", textAlign: "justify", display: "-webkit-box", overflow: "hidden", WebkitBoxOrient: "vertical", WebkitLineClamp: 2, color: "grey", lineHeight: 1.1, fontSize: "12px", margin: "5px 0 3px 0" }}>When an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</Box>

            {/* FOOTER INFO */}
            <Box sx={{ width: "100%", display: "flex", justifyContent: "space-between" }}>
                <Box sx={{ display: "flex", flexDirection: "column", fontSize: "12px", justifyContent: "flex-end" }}>
                    {" "}
                    <Box sx={{ fontSize: "11px", color: "grey" }}>10 Oct 24, 12:15 pm</Box>{" "}
                </Box>

                <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-end", fontSize: "12px" }}>
                    {" "}
                    <Box>
                        {" "}
                        <UserAddOutlined /> Ammar Azad Khan{" "}
                    </Box>{" "}
                </Box>
            </Box>
        </Box>
    );
};

const TimeLineContent = (props) => {
    const { step_name, date_time, profile_info, note, color } = props;
    return (
        <Box sx={{ width: "100%" }}>
            <Box sx={{ width: "400px", marginBottom: "10px" }}>
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
                // <Box sx={{ width: "400px" }}>
                //     <ProfileCardXS info={profile_info.name} />
                // </Box>

                <Box sx={{ display: "flex", marginTop: "10px" }}>
                    <Box sx={{ height: "calc(56px - 20px)", width: "calc(56px - 20px)", bgcolor: "#fbfbfb", borderRadius: "10px", padding: "10px", margin: "0 10px 0 0", display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <Text style={{ fontSize: "14px" }}>By</Text>
                    </Box>
                    <Box sx={{ width: "400px" }}>
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
                        <Box sx={{ height: "calc(56px - 20px)", width: "calc(56px - 20px)", bgcolor: "#fbfbfb", borderRadius: "10px", padding: "10px", margin: "0 10px 0 0", display: "flex", justifyContent: "center", alignItems: "center" }}>
                            <Text style={{ fontSize: "14px" }}>To</Text>
                        </Box>
                        <Box sx={{ width: "400px" }}>
                            <ProfileCardXS info={profile_info.name} />
                        </Box>
                    </Box>

                    <Box sx={{ display: "flex", marginTop: "10px" }}>
                        <Box sx={{ height: "calc(56px - 20px)", width: "calc(56px - 20px)", bgcolor: "#fbfbfb", borderRadius: "10px", padding: "10px", margin: "0 10px 0 0", display: "flex", justifyContent: "center", alignItems: "center" }}>
                            <Text style={{ fontSize: "14px" }}>{step_name === "Handovered" ? "From" : "By"}</Text>
                        </Box>
                        <Box sx={{ width: "400px" }}>
                            <ProfileCardXS info={profile_info.name_2} />
                        </Box>
                    </Box>
                </Box>
            )}

            {(step_name === "Visited" || step_name === "Picked" || step_name === "Delivered" || step_name === "Returned" || step_name === "Solved" || step_name === "Closed") && (
                <Box sx={{ width: "446px", marginTop: "10px", textAlign: "justify", border: "0.5px solid #e2e2e2", borderRadius: "5px", padding: "10px" }}>
                    <Text type="secondary"> There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form,.</Text>
                </Box>
            )}
        </Box>
    );
};

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

const RequestDescription = () => {
    return (
        <Box sx={{ width: "100%", height: "100%" }}>
            {/* HEADER */}
            <Box sx={{ width: "100%", height: "50px", borderRadius: "7px", bgcolor: "#f6f6f6", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Box sx={{ marginLeft: "10px" }}>
                    {" "}
                    <Breadcrumb items={items} />{" "}
                </Box>
                <Box sx={{ marginRight: "10px" }}>
                    {" "}
                    <Button type="primary">Edit</Button>{" "}
                </Box>
            </Box>

            <Box sx={{ marginTop: "10px" }}>
                <ProfileCard />
            </Box>

            {/* DESCRIPTION */}
            <Box sx={{ textAlign: "justify", color: "grey", padding: "0 3px" }}>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.</Box>

            {/* Timeline */}
            <Box sx={{ marginTop: "20px" }}>
                <RequestTimeline />
            </Box>
        </Box>
    );
};

const HistoryPageStucture = () => {
    return (
        <Box sx={{ display: "flex", gap: "10px", width: "100%" }}>
            <Box className="custom-scrollbar" sx={{ width: { xs: "100%", md: "400px" }, height: "100%", display: "flex", flexDirection: "column", gap: "5px", overflowY: "scroll", alignItems: { xs: "center", md: "flex-start" } }}>
                <RequestCard />
                <RequestCard />
                <RequestCard />
                <RequestCard />
                <RequestCard />
                <RequestCard />
                <RequestCard />
                <RequestCard />
                <RequestCard />
                <RequestCard />
                <RequestCard />
            </Box>

            <Box sx={{ flex: "1", height: "100%", display: { xs: "none", md: "flex" } }}>
                <RequestDescription />
            </Box>
        </Box>
    );
};

export default HistoryPage;
