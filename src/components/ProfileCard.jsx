import { Avatar } from "@fluentui/react-components";
import { BuildingFilled, CalendarWorkWeek28Regular, CallFilled, FlowFilled, LocationFilled, MailRegular, OrganizationFilled } from "@fluentui/react-icons";
import { Box } from "@mui/material";
import { Typography } from "antd";
import React, { useEffect } from "react";

//*---------------------------------------------------------------------
import { useQuery } from "react-query"; //* React Query                 |
import axios from "axios"; //* React Query                              |
import { getAPI } from "../apis/apis"; //*                              |
import { getLoginUserID } from "../authentication/localStorage"; //*    |
import { logPrint } from "../authentication/logPrint"; //*              |
import { getCookie } from "../utility"; //*                             |
//*---------------------------------------------------------------------

const { Text, Link } = Typography;

export const ProfileCardXL = (props) => {
    const { empid } = props;

    //Todo[QUEARY] Get User info by empid
    //*API Setup
    const fetchUserData = () => {
        return axios.post(getAPI("get-user-info-by-empid"), { empid: empid }, { headers: { "Content-Type": "application/json", "X-CSRFToken": getCookie("csrftoken") } });
    };

    //*Query Callback
    const {
        isLoading: isLoading_getUserData,
        data: data_getUserData,
        isError: isError_getUserData,
        error: error_getUserData,
        isFetching: isFetching_getUserData,
        refetch: refetch_getUserData,
    } = useQuery("get-user-info-by-empid-UNIQUE-1", fetchUserData, {
        enabled: empid ? true : false,
    });

    //*Query Response Actions
    useEffect(() => {
        if (isLoading_getUserData) {
            logPrint("🔍   getUserData  ➤  🔄");
        } else if (data_getUserData?.data) {
            logPrint("🔍   getUserData  ➤  🟢", data_getUserData?.data);
        } else if (isError_getUserData) {
            logPrint("🔍   getUserData  ➤  ⚠️", [error_getUserData?.message, error_getUserData?.response.data]);
        }
    }, [isLoading_getUserData, data_getUserData, isError_getUserData, error_getUserData]);

    return (
        <Box sx={{ width: "calc(100% - 20px)", height: "fit-content", bgcolor: "#fbfbfb", borderRadius: "10px", padding: "10px" }}>
            <Box sx={{ display: "flex", width: "100%" }}>
                {/* AVATER */}
                <Box sx={{ heigh: "100%", display: "flex", alignItems: "center", width: "96px", marginRight: "10px" }}>
                    <Avatar size={96} name={data_getUserData?.data?.name} image={{ src: data_getUserData?.data?.profile_url }} />
                </Box>

                <Box sx={{ display: "flex", flexDirection: "column", width: `calc(100% - 96px)` }}>
                    {/* NAME */}
                    <Box sx={{ display: "flex", alignItems: "center", width: "100%", fontSize: "18px" }}>
                        <Text style={{ fontSize: "18px", lineHeight: "1", padding: "0", margin: "0", maxWidth: "100%" }} ellipsis>
                            {data_getUserData?.data?.name}
                        </Text>
                    </Box>

                    {/* DEPARTMENT AND DESIGNATION */}
                    <Box sx={{ display: "flex", lineHeight: "1.5", marginBottom: "5px" }}>
                        <Box sx={{ display: "flex", alignItems: "center", width: "100%" }}>
                            <Text style={{ lineHeight: "1.5" }} type="secondary" ellipsis>
                                {data_getUserData?.data?.designation},{" "}
                                {Object.keys(data_getUserData?.data?.department || {}).map((department_idx) => {
                                    return data_getUserData?.data?.department[department_idx];
                                })}
                            </Text>
                        </Box>
                    </Box>

                    {/* EMAIL */}
                    <Box sx={{ display: "flex", lineHeight: "1.5" }}>
                        <Box sx={{ display: "flex", alignItems: "center", width: "100%" }}>
                            <MailRegular style={{ color: "#939393", marginTop: "5px" }} />
                            <Text type="secondary" style={{ marginLeft: "5px", lineHeight: "1.5" }} ellipsis>
                                {data_getUserData?.data?.email}
                            </Text>
                        </Box>
                    </Box>

                    {/* PHONE NUMBER */}
                    <Box sx={{ display: "flex", justifyContent: "space-between", lineHeight: "1.5" }}>
                        <Box sx={{ display: "flex", alignItems: "center", width: "100%" }}>
                            <CallFilled style={{ color: "#939393", marginTop: "5px" }} />
                            <Text type="secondary" style={{ lineHeight: "1.5" }} ellipsis>
                                {" "}
                                {data_getUserData?.data?.phone}
                            </Text>
                        </Box>
                    </Box>

                    {/* LOCATION */}
                    <Box sx={{ display: "flex", lineHeight: "1.5", alignItems: "center", width: "100%" }}>
                        <Box sx={{ display: "flex" }}>
                            <BuildingFilled style={{ color: "#939393", marginTop: "5px" }} />
                            <Text type="secondary" style={{ lineHeight: "1.5" }}>
                                {data_getUserData?.data?.location?.desk_number && <span>{data_getUserData?.data?.location?.desk_number} </span>}
                                {data_getUserData?.data?.location?.building && <span>{data_getUserData?.data?.location?.building} </span>}
                                {data_getUserData?.data?.location?.floor && <span>{data_getUserData?.data?.location?.floor} </span>}
                                {data_getUserData?.data?.location?.others && <span>{data_getUserData?.data?.location?.others} </span>}
                                {data_getUserData?.data?.location?.city && <span>{data_getUserData?.data?.location?.city} </span>}
                            </Text>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export const ProfileCardXS = (props) => {
    const name = props.info;
    // console.log(props.info,'==================')
    return (
        <Box sx={{ width: "calc(100% - 20px)", bgcolor: "#fbfbfb", borderRadius: "10px", padding: "10px" }}>
            <Box sx={{ display: "flex", width: "100%" }}>
                <Box sx={{ heigh: "100%", display: "flex", alignItems: "center" }}>
                    <Avatar size={36} color="dark-red" name={name} />
                </Box>
                <Box sx={{ display: "flex", flexDirection: "column", marginLeft: "10px", width: `calc(100% - 36px)` }}>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Text style={{ marginLeft: "0px", lineHeight: "1.4" }} ellipsis>
                            {name}
                        </Text>
                    </Box>
                    <Box sx={{ display: "flex", lineHeight: "1.5" }}>
                        <Box sx={{ display: "flex", alignItems: "center", width: "100%", marginTop: "-3px" }}>
                            {/* <FlowFilled style={{ color: "#939393" }} /> */}
                            <Text style={{ lineHeight: "1.4" }} type="secondary" ellipsis>
                                Sr. Engineer,Circuit and system design
                            </Text>{" "}
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};
