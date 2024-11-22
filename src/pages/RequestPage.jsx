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

const RequestPage = () => {
    //Todo[QUEARY] Get all ticket by empid
    //*API Setup
    const fetchAllAccessabnleTicketsByEmpID = () => {
        return axios.post(getAPI("get-accessible-requests"), { empid: getLoginUserID() }, { headers: { "Content-Type": "application/json", "X-CSRFToken": getCookie("csrftoken") } });
    };

    //*Query Callback
    const {
        isLoading: isLoading_getAllAccessabnleTicketsByEmpID,
        data: data_getAllAccessabnleTicketsByEmpID,
        isError: isError_getAllAccessabnleTicketsByEmpID,
        error: error_getAllAccessabnleTicketsByEmpID,
        isFetching: isFetching_getAllAccessabnleTicketsByEmpID,
        refetch: refetch_getAllAccessabnleTicketsByEmpID,
    } = useQuery("get-accessible-requests-UNIQUE-1", fetchAllAccessabnleTicketsByEmpID, {
        enabled: true,
    });

    //*Query Response Actions
    useEffect(() => {
        if (isLoading_getAllAccessabnleTicketsByEmpID) {
            logPrint("🔍   getAllAccessabnleTicketsByEmpID  ➤  🔄");
        } else if (data_getAllAccessabnleTicketsByEmpID?.data) {
            logPrint("🔍   getAllAccessabnleTicketsByEmpID  ➤  🟢", data_getAllAccessabnleTicketsByEmpID?.data);
        } else if (isError_getAllAccessabnleTicketsByEmpID) {
            logPrint("🔍   getAllAccessabnleTicketsByEmpID  ➤  ⚠️", [error_getAllAccessabnleTicketsByEmpID?.message, error_getAllAccessabnleTicketsByEmpID?.response.data]);
        }
    }, [isLoading_getAllAccessabnleTicketsByEmpID, data_getAllAccessabnleTicketsByEmpID, isError_getAllAccessabnleTicketsByEmpID, error_getAllAccessabnleTicketsByEmpID]);



    

    return (
        <Box sx={{ width: "100%", height: "100%", display: "flex" }}>
            <TicketViewerPageStructure isLoading_getAllTicketsByEmpID={isLoading_getAllAccessabnleTicketsByEmpID} data_getAllTicketsByEmpID={data_getAllAccessabnleTicketsByEmpID} isError_getAllTicketsByEmpID={isError_getAllAccessabnleTicketsByEmpID} error_getAllTicketsByEmpID={error_getAllAccessabnleTicketsByEmpID} />
        </Box>
    );
};


export default RequestPage;
