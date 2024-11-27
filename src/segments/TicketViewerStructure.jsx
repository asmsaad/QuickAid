import { CaretRightOutlined, MedicineBoxOutlined, SisternodeOutlined, UserAddOutlined } from "@ant-design/icons";
import { Box } from "@mui/material";
import { Badge, Breadcrumb, Button, Card, Divider, Input, Modal, Select, Tag, Timeline, Typography } from "antd";
import React, { useEffect, useState } from "react";

import "../All_Styles/Scrollbar.css";
import { ProfileCard, ProfileCardXS } from "../components/ProfileCard";
import { CalendarRegular, ClockRegular } from "@fluentui/react-icons";
import TextArea from "antd/es/input/TextArea";
import { NoTicketSelected } from "../components/DoodlingMessage";

//*---------------------------------------------------------------------
import { useQuery } from "react-query"; //* React Query                 |
import axios from "axios"; //* React Query                              |
import { getAPI } from "../apis/apis"; //*                              |
import { getLoginUserID } from "../authentication/localStorage"; //*    |
import { logPrint } from "../authentication/logPrint"; //*              |
import { convertTimestamp, getCookie, reactLinkStyleRemove } from "../utility"; //*                             |
//*---------------------------------------------------------------------

import { Outlet, Link, useNavigate, useLocation, useParams } from "react-router-dom";

import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";

const { Text } = Typography;

export const TicketViewerPageStructure = (props) => {
    const { isLoading_getAllTicketsByEmpID, data_getAllTicketsByEmpID, isError_getAllTicketsByEmpID, error_getAllTicketsByEmpID } = props;

    // console.log(data_getAllTicketsByEmpID, "=======================================");

    const [selectedTicket, setSelectedTicket] = useState(null);

    const location = useLocation(); // This gives the current URL
    const original_loc = location.pathname.endsWith("/") ? location.pathname.slice(0, -1) : location.pathname;
    // console.log(original_loc.split("/").length, "===>>>");

    ////
    ////

    //* The URL changes to update the ticket if the ticket ID is available in the URL.
    useEffect(() => {
        const original_loc_split = original_loc.split("/");
        if (original_loc_split.length > 2) {
            setSelectedTicket(original_loc_split[3]);
        }
    }, [original_loc]);

    ////
    ////

    //* Scroll to the selected ticket if the URL contains the ticket ID (For first time).
    useEffect(() => {
        if (data_getAllTicketsByEmpID) {
            const original_loc_split = original_loc.split("/");
            if (original_loc_split.length > 2) {
                const element = document.getElementById(`ticket-${original_loc_split[3]}`);
                // console.log(`ticket-${original_loc_split[3]}`, "<<< FFG ***");
                // console.log(element, "<<< FFG ###");

                if (element) {
                    element.scrollIntoView({ behavior: "smooth", block: "center" }); // Scroll to the element
                }
            }
        }
    }, [data_getAllTicketsByEmpID]);

    ////
    ////
    ////
    ////

    const filterCategory = ["Employee", "Issue", "Sub-Issue", "Department", "Floor", "Status", "Urgency", "Rating"];

    return (
        <Box sx={{ display: "flex", width: "100%" }}>
            {/* ///// */}
            {/* AVAILABLE TICKET LIST */}

            <Box sx={{ width: { xs: "100%", md: "400px" }, height: `calc(100% - 20px)`, display: { xs: original_loc.split("/").length > 3 ? "none" : "flex", md: "flex" }, flexDirection: "column", gap: "5px", overflowY: "hidden", alignItems: "center", padding: "10px 0 0 0" }}>
                {/* <Box sx={{ width: "100%", display:"flex", flexDirection:"column", gap:"5px" }}>
                    
                </Box> */}

                {/* <Box sx={{ width: "calc(100% - 10px)", display: "flex", flexDirection: "column", padding: "0 10px" }}> */}
                <Box sx={{ width: "calc(100% - 20px)", display: "flex", flexDirection: "column", gap: "5px", padding: "0 10px" }}>
                    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                        <Select
                            mode="multiple"
                            placeholder="Searce entity"
                            showSearch
                            allowClear
                            size="medium"
                            style={{ width: "calc(65% - 5px)" }}
                            optionFilterProp="label"
                            filterSort={(optionA, optionB) => (optionA?.label ?? "").toLowerCase().localeCompare((optionB?.label ?? "").toLowerCase())}
                            // value={selectedData.acknowledged_person}
                            // onChange={(value, selectedObject) => {
                            //     setSelectedData({ ...selectedData, acknowledged_person: value ? value : [] });
                            // }}
                            // options={Object.keys(data_getAllEmployee?.data || {}).map((empid) => {
                            //     return { value: empid, label: data_getAllEmployee?.data[empid]["name"] + ` (${empid})` };
                            // })}
                        />
                        <Select
                            placeholder="Filter Category"
                            showSearch
                            allowClear
                            size="medium"
                            style={{ width: "calc(35% - 5px)" }}
                            optionFilterProp="label"
                            filterSort={(optionA, optionB) => (optionA?.label ?? "").toLowerCase().localeCompare((optionB?.label ?? "").toLowerCase())}
                            // value={selectedData.issue_category}
                            // onChange={(value, selectedObject) => {
                            //     setSelectedData({ ...selectedData, issue_category: value ? value : undefined });
                            // }}
                            // options={Object.keys(data_getAllSubDomain?.data || {}).map((sub_domain_idx) => {
                            //     return { value: sub_domain_idx, label: data_getAllSubDomain?.data[sub_domain_idx] };
                            // })}
                            options={filterCategory.map((each_category) => {
                                return { value: each_category, label: each_category };
                            })}
                        />
                    </Box>
                </Box>

                <Box className="custom-scrollbar" sx={{ width: "100%", flex: 1, flexDirection: "column", gap: "5px", overflowY: "scroll", alignItems: "center", padding: "10px 0" }}>
                    {Object.keys(data_getAllTicketsByEmpID || {}).map((index, index_) => {
                        const ticket_id = data_getAllTicketsByEmpID[index]["ticket_id"];
                        // console.log(`ticket-${ticket_id}`, "<<< FFG");
                        return (
                            <Box key={ticket_id}>
                                {index_ !== 0 && <Divider style={{ width: "50%", margin: "0", padding: "0" }} />}
                                <Link id={`ticket-${ticket_id}`} key={ticket_id} to={`${ticket_id}`} style={{ ...reactLinkStyleRemove, width: "100%" }}>
                                    <RequestCard ticket_info={data_getAllTicketsByEmpID[index]} ticket_id={ticket_id} selectedTicket={selectedTicket} />
                                </Link>
                            </Box>
                        );
                    })}
                </Box>
            </Box>

            {/* ///// */}
            {/* TICKET DETAILS */}
            <Box className="custom-scrollbar" sx={{ flex: "1", height: `calc(100% - 20px)`, display: { xs: original_loc.split("/").length > 3 ? "flex" : "none", md: "flex" }, overflowY: "scroll", padding: "10px" }}>
                {original_loc.split("/").length > 3 ? <Outlet /> : <NoTicketSelected status={false} subTitle={"No ticket has been selected; please choose one to view its details."} />}
            </Box>
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

const RequestCard = (props) => {
    const { ticket_info, ticket_id, selectedTicket } = props;

    return (
        <Box sx={{ width: `calc(100% - 30px)`, maxWidth: { xs: "calc(100% - 30px)", xl: "400px" }, height: "fit-content", borderRadius: "10px", border: "0.5px solid #fdfdfd", "&:hover": { border: "1px dashed grey", cursor: "pointer" }, padding: "5px 10px", bgcolor: selectedTicket == ticket_id ? "#f6f6f6" : null }}>
            {/* ///// */}
            {/* HEADER */}
            <Box sx={{ minWidth: "100%", display: "flex", justifyContent: "space-between" }}>
                <Box sx={{ display: "flex", gap: "5px" }}>
                    {!ticket_info.read && <Badge color={"red"} />}
                    <Tag style={{ margin: "0" }} bordered={false}>
                        {ticket_info["domain"]["name"]}-{ticket_info["issue_catagory"]["name"]}
                    </Tag>

                    <Tag style={{ margin: "0" }} bordered={false}>
                        <CaretRightOutlined style={{ color: "gray" }} />
                    </Tag>
                    <Tag style={{ margin: "0" }} bordered={false}>
                        {ticket_info["issue_sub_category"]["name"]}
                    </Tag>
                </Box>
                <Box>
                    <Tag style={{ margin: "0" }} color={ticket_info.status.color}>
                        {ticket_info.status.name}
                    </Tag>
                </Box>
            </Box>
            {/* ///// */}
            {/* DESCRIPTION */}
            {/* When an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. */}
            {/* <Box sx={{ width: "100%", height: "32px", textAlign: "justify", display: "-webkit-box", overflow: "hidden", WebkitBoxOrient: "vertical", WebkitLineClamp: 2, color: "grey", lineHeight: 1.3, fontSize: "12px", margin: "5px 0 3px 0" }}>{ticket_info.note}</Box> */}
            {/* ///// */}
            {/* FOOTER INFO */}
            <Box sx={{ width: "100%", display: "flex", justifyContent: "space-between" }}>
                <Box sx={{ display: "flex", flexDirection: "column", fontSize: "12px", justifyContent: "flex-end" }}>
                    <Box sx={{ fontSize: "12px", color: "grey", display: "flex", alignItems: "center" }}>
                        <CalendarMonthRoundedIcon fontSize="16px" style={{ margin: "0 2px 0 0", color: "#b5b5b5" }} />
                        {convertTimestamp(ticket_info.time).date}
                        <AccessTimeOutlinedIcon fontSize="16px" style={{ margin: "0 2px 0 5px", color: "#b5b5b5" }} />
                        {convertTimestamp(ticket_info.time).time}
                    </Box>
                </Box>

                <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-end", fontSize: "12px" }}>
                    <Box sx={{ fontSize: "12px", color: "grey", display: "flex", alignItems: "center" }}>
                        <PersonRoundedIcon fontSize="16px" style={{ margin: "0 2px 0 0px", color: "#b5b5b5" }} />
                        {/* <AccessTimeOutlinedIcon fontSize="16px" style={{ margin: "0 2px 0 10px", color: "#b5b5b5" }} /> */}
                        {ticket_info.requestor.name}
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};
