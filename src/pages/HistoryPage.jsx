import { CaretRightOutlined, MedicineBoxOutlined, SisternodeOutlined, UserAddOutlined } from "@ant-design/icons";
import { Box } from "@mui/material";
import { Breadcrumb, Button, Card, Modal, Select, Tag, Timeline, Typography } from "antd";
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
import { TicketViewerPageStructure } from "../segments/TicketViewerStructure";

const { Text } = Typography;

const HistoryPage = () => {
    //Todo[QUEARY] Get all ticket by empid
    //*API Setup
    const fetchAllTicketsByEmpID = () => {
        return axios.post(getAPI("get-all-ticket-by-empid"), { empid: getLoginUserID() }, { headers: { "Content-Type": "application/json", "X-CSRFToken": getCookie("csrftoken") } });
    };

    //*Query Callback
    const {
        isLoading: isLoading_getAllTicketsByEmpID,
        data: data_getAllTicketsByEmpID,
        isError: isError_getAllTicketsByEmpID,
        error: error_getAllTicketsByEmpID,
        isFetching: isFetching_getAllTicketsByEmpID,
        refetch: refetch_getAllTicketsByEmpID,
    } = useQuery("get-all-ticket-by-empid-UNIQUE-1", fetchAllTicketsByEmpID, {
        enabled: true,
    });

    //*Query Response Actions
    useEffect(() => {
        if (isLoading_getAllTicketsByEmpID) {
            logPrint("🔍   getAllTicketsByEmpID  ➤  🔄");
        } else if (data_getAllTicketsByEmpID?.data) {
            logPrint("🔍   getAllTicketsByEmpID  ➤  🟢", data_getAllTicketsByEmpID?.data);
        } else if (isError_getAllTicketsByEmpID) {
            logPrint("🔍   getAllTicketsByEmpID  ➤  ⚠️", [error_getAllTicketsByEmpID?.message, error_getAllTicketsByEmpID?.response.data]);
        }
    }, [isLoading_getAllTicketsByEmpID, data_getAllTicketsByEmpID, isError_getAllTicketsByEmpID, error_getAllTicketsByEmpID]);

    return (
        <Box sx={{ width: "100%", height: "100%", display: "flex" }}>
            <TicketViewerPageStructure isLoading_getAllTicketsByEmpID={isLoading_getAllTicketsByEmpID} data_getAllTicketsByEmpID={data_getAllTicketsByEmpID?.data} isError_getAllTicketsByEmpID={isError_getAllTicketsByEmpID} error_getAllTicketsByEmpID={error_getAllTicketsByEmpID} />
        </Box>
    );
};


export default HistoryPage;
