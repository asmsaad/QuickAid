import { Avatar } from "@fluentui/react-components";
import { BuildingFilled, CalendarWorkWeek28Regular, CallFilled, FlowFilled, LocationFilled, MailRegular, OrganizationFilled } from "@fluentui/react-icons";
import { Box } from "@mui/material";
import { Typography } from "antd";
import React from "react";

const { Text, Link } = Typography;

export const ProfileCard = () => {
    return (
        <Box sx={{ width: "calc(100% - 20px)", height: "fit-content", bgcolor: "#fbfbfb", borderRadius: "10px", padding: "10px"}}>
            <Box sx={{ display: "flex",width:"100%"}}>

                <Box sx={{heigh:"100%", display:"flex", alignItems:"center", width:'96px', marginRight:'10px'}}>
                    <Avatar size={96} initials="DR" color="dark-red" name="darkRed avatar" />
                </Box>

                <Box sx={{ display: "flex", flexDirection: "column", width:`calc(100% - 96px)` }}>

                     <Box sx={{ display: "flex", alignItems: "center",width:'100%', fontSize:'18px' }}>
                        <Text style={{ fontSize: "18px", lineHeight: "1", padding:'0', margin:'0', maxWidth:'100%', }} ellipsis>A S M Mehedi Hasan Sad</Text>
                    </Box>
                    <Box sx={{ display: "flex", lineHeight: "1.5" ,marginBottom:"5px"}}>
                        <Box sx={{ display: "flex", alignItems: "center" , width:'100%', }}>
                            <Text style={{ lineHeight: "1.5" }} type="secondary" ellipsis>
                                Sr. Engineer, Circuit and system design
                            </Text>{" "}
                        </Box>
                    </Box>
                    <Box sx={{ display: "flex", lineHeight: "1.5" }}>
                        <Box sx={{ display: "flex" , alignItems:"center", width:'100%'}}>
                            <MailRegular style={{ color: "#939393" }} />
                            <Text type="secondary" style={{marginLeft:"5px", lineHeight: "1.5" }} ellipsis>
                                hasan.sad@ulkasemi.com
                            </Text>
                        </Box>
                    </Box>
                    <Box sx={{ display: "flex", justifyContent:"space-between", lineHeight: "1.5" }}>
                        <Box sx={{ display: "flex" , alignItems:"center",width:"100%",}}>
                            <CallFilled style={{ color: "#939393" }} />
                            <Text type="secondary" style={{ lineHeight: "1.5" }} ellipsis>
                                +8801778518304, +8801778518304
                            </Text>
                        </Box>
                    </Box>
                    <Box sx={{ display: "flex", lineHeight: "1.5", alignItems:"center",width:"100%", }}>
                        <Box sx={{ display: "flex" , alignItems:"center"}}>
                            <BuildingFilled style={{ color: "#939393" }} />
                            <Text type="secondary" style={{ lineHeight: "1.5" }} ellipsis>
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
        <Box sx={{ width: "calc(100% - 20px)", bgcolor: "#fbfbfb", borderRadius: "10px", padding: "10px",  }}>
            <Box sx={{ display: "flex",width:"100%" }}>
                <Box sx={{heigh:"100%", display:"flex", alignItems:"center", }}>
                    <Avatar size={36} initials="DR" color="dark-red" name="darkRed avatar" />
                </Box>
                <Box sx={{ display: "flex", flexDirection: "column", marginLeft: "10px",width:`calc(100% - 36px)`,  }}>
                    <Box sx={{ display: "flex", alignItems: "center",  }}>
                        <Text style={{ marginLeft: "0px", lineHeight: "1.4" }} ellipsis>{name}</Text>
                    </Box>
                    <Box sx={{ display: "flex", lineHeight: "1.5" ,}}>
                        <Box sx={{ display: "flex", alignItems: "center" ,width:'100%', marginTop:'-3px'}}>
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