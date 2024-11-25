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

const MentionPage = () => {
    //Todo[QUEARY] Get all ticket by empid
    //*API Setup
    const fetchAllMentionedTicketsByEmpID = () => {
        return axios.post(getAPI("get-request-by-mention"), { empid: getLoginUserID() }, { headers: { "Content-Type": "application/json", "X-CSRFToken": getCookie("csrftoken") } });
    };

    //*Query Callback
    const {
        isLoading: isLoading_getAllMentionedTicketsByEmpID,
        data: data_getAllMentionedTicketsByEmpID,
        isError: isError_getAllMentionedTicketsByEmpID,
        error: error_getAllMentionedTicketsByEmpID,
        isFetching: isFetching_getAllMentionedTicketsByEmpID,
        refetch: refetch_getAllMentionedTicketsByEmpID,
    } = useQuery("get-request-by-mention-UNIQUE-1", fetchAllMentionedTicketsByEmpID, {
        enabled: true,
    });

    //*Query Response Actions
    useEffect(() => {
        if (isLoading_getAllMentionedTicketsByEmpID) {
            logPrint("🔍   getAllMentionedTicketsByEmpID  ➤  🔄");
        } else if (data_getAllMentionedTicketsByEmpID?.data) {
            logPrint("🔍   getAllMentionedTicketsByEmpID  ➤  🟢", data_getAllMentionedTicketsByEmpID?.data);
        } else if (isError_getAllMentionedTicketsByEmpID) {
            logPrint("🔍   getAllMentionedTicketsByEmpID  ➤  ⚠️", [error_getAllMentionedTicketsByEmpID?.message, error_getAllMentionedTicketsByEmpID?.response.data]);
        }
    }, [isLoading_getAllMentionedTicketsByEmpID, data_getAllMentionedTicketsByEmpID, isError_getAllMentionedTicketsByEmpID, error_getAllMentionedTicketsByEmpID]);

    return (
        <Box sx={{ width: "100%", height: "100%", display: "flex" }}>
            <TicketViewerPageStructure isLoading_getAllTicketsByEmpID={isLoading_getAllMentionedTicketsByEmpID} data_getAllTicketsByEmpID={data_getAllMentionedTicketsByEmpID?.data} isError_getAllTicketsByEmpID={isError_getAllMentionedTicketsByEmpID} error_getAllTicketsByEmpID={error_getAllMentionedTicketsByEmpID} />
        </Box>
    );
};


export default MentionPage;
