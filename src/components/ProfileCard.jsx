import { Avatar } from "@fluentui/react-components";
import { BuildingFilled, CalendarWorkWeek28Regular, CallFilled, FlowFilled, LocationFilled, MailRegular, OrganizationFilled } from "@fluentui/react-icons";
import { Box } from "@mui/material";
import { Typography } from "antd";
import React from "react";

import "boxicons";
const { Text, Link } = Typography;

export const ProfileCard = () => {
    return (
        <Box sx={{ width: "calc(100% - 20px)", height: "fit-content", bgcolor: "#fbfbfb", borderRadius: "10px", padding: "10px" }}>
            <Box sx={{ display: "flex",width:"100%" }}>
                <Box sx={{heigh:"100%", display:"flex", alignItems:"center"}}>
                    <Avatar size={96} initials="DR" color="dark-red" name="darkRed avatar" />
                </Box>
                <Box sx={{ display: "flex", flexDirection: "column", marginLeft: "10px",width:"100%" }}>
                    <Box sx={{ display: "flex", alignItems: "center",  }}>
                        <Text style={{ fontSize: "18px", marginLeft: "0px", lineHeight: "1" }}>A S M Mehedi Hasan Sad</Text>
                    </Box>
                    <Box sx={{ display: "flex", lineHeight: "1.5" ,marginBottom:"5px"}}>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                            {/* <FlowFilled style={{ color: "#939393" }} /> */}
                            <Text style={{ lineHeight: "1.5" }} type="secondary">
                                Sr. Engineer,
                            </Text>{" "}
                        </Box>
                        <Box sx={{ display: "flex", alignItems: "center", marginLeft: "5px" }}>
                            {/* <OrganizationFilled style={{ color: "#939393" }} /> */}
                            <Text style={{ lineHeight: "1.5" }} type="secondary">
                                Circuit and system design
                            </Text>{" "}
                        </Box>
                    </Box>
                    <Box sx={{ display: "flex", lineHeight: "1.5" }}>
                        <Box sx={{ display: "flex" , alignItems:"center"}}>
                            <MailRegular style={{ color: "#939393" }} />
                            <Text type="secondary" style={{marginLeft:"5px", lineHeight: "1.5" }}>
                                hasan.sad@ulkasemi.com
                            </Text>
                        </Box>
                    </Box>
                    <Box sx={{ display: "flex", justifyContent:"space-between",width:"100%", lineHeight: "1.5" }}>
                        <Box sx={{ display: "flex" , alignItems:"center"}}>
                            <CallFilled style={{ color: "#939393" }} />
                            <Text type="secondary" style={{ lineHeight: "1.5" }}>
                                +8801778518304, +8801778518304
                            </Text>
                        </Box>
                        {/* <Box sx={{ display: "flex" }}>
                            <CallFilled style={{ color: "#939393" }} />
                            <Text type="secondary" style={{ lineHeight: "1.5" }}>
                                +8801778518304
                            </Text>
                        </Box> */}
                    </Box>
                    <Box sx={{ display: "flex", lineHeight: "1.5", alignItems:"center" }}>
                        <Box sx={{ display: "flex" , alignItems:"center"}}>
                            <BuildingFilled style={{ color: "#939393" }} />
                            <Text type="secondary" style={{ lineHeight: "1.5" }}>
                                340, L4, Regnam center , Dhaka
                            </Text>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};




export const ProfileCardXS = (props) => {
    const name = props.info
    // console.log(props.info,'==================')
    return (
        <Box sx={{ width: "calc(100% - 20px)", height: "fit-content", bgcolor: "#fbfbfb", borderRadius: "10px", padding: "10px" }}>
            <Box sx={{ display: "flex",width:"100%" }}>
                <Box sx={{heigh:"100%", display:"flex", alignItems:"center"}}>
                    <Avatar size={36} initials="DR" color="dark-red" name="darkRed avatar" />
                </Box>
                <Box sx={{ display: "flex", flexDirection: "column", marginLeft: "10px",width:"100%" }}>
                    <Box sx={{ display: "flex", alignItems: "center",  }}>
                        <Text style={{ marginLeft: "0px", lineHeight: "1" }}>{name}</Text>
                    </Box>
                    <Box sx={{ display: "flex", lineHeight: "1.5" ,marginBottom:"0px"}}>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                            {/* <FlowFilled style={{ color: "#939393" }} /> */}
                            <Text style={{ lineHeight: "1.5" }} type="secondary">
                                Sr. Engineer,
                            </Text>{" "}
                        </Box>
                        <Box sx={{ display: "flex", alignItems: "center", marginLeft: "5px" }}>
                            {/* <OrganizationFilled style={{ color: "#939393" }} /> */}
                            <Text style={{ lineHeight: "1.5" }} type="secondary">
                                Circuit and system design
                            </Text>{" "}
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};