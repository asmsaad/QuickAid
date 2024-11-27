import React, { useEffect, useState } from "react";
import { makeStyles, mergeClasses, tokens, Button, Menu, MenuItem, MenuList, MenuPopover, MenuTrigger, Tab, TabList, useIsOverflowItemVisible, useOverflowMenu, Overflow, OverflowItem } from "@fluentui/react-components";
import { Link, useLocation } from "react-router-dom";
import { BugFilled, HomeFilled, bundleIcon, BugRegular, HomeRegular, ClipboardTextEditFilled, ClipboardTextEditRegular, ClipboardTextRtlRegular, ClipboardTextRtlFilled, DataPieFilled, DataPieRegular, PeopleCommunityRegular, PeopleCommunityFilled, OrganizationRegular, OrganizationFilled, PersonStarburstRegular, PersonStarburstFilled, MoreHorizontalFilled, MoreHorizontalRegular, BranchRequestFilled, HistoryFilled, HistoryRegular, BranchRequestRegular, FormFilled, FormRegular, MentionFilled, MentionRegular } from "@fluentui/react-icons";
import { Box } from "@mui/material";
import { useQuery } from "react-query"; //* React Query
import axios from "axios"; //* React Query

import { getAPI } from "../apis/apis";
import { getLoginUserID } from "../authentication/localStorage";
import { logPrint } from "../authentication/logPrint";
import { getCookie } from "../utility";

import automation_team_logo from "./../media/automationTeam.png";
import { Badge } from "antd";

const MoreHorizontal = bundleIcon(MoreHorizontalFilled, MoreHorizontalRegular);

const IconBug = bundleIcon(BugFilled, BugRegular);
const IconHome = bundleIcon(HomeFilled, HomeRegular);
const IconForm = bundleIcon(FormFilled, FormRegular);
const IconRequest = bundleIcon(BranchRequestFilled, BranchRequestRegular);
const IconHistory = bundleIcon(HistoryFilled, HistoryRegular);
// const IconAdministrator = bundleIcon(HistoryFilled, HistoryRegular);

const IconSubmission = bundleIcon(ClipboardTextEditFilled, ClipboardTextEditRegular);
const IconSubmission_ = bundleIcon(ClipboardTextRtlFilled, ClipboardTextRtlRegular);
const IconProjects = bundleIcon(DataPieFilled, DataPieRegular);
const IconSubordinates = bundleIcon(PeopleCommunityFilled, PeopleCommunityRegular);
const IconSuperuser = bundleIcon(PersonStarburstFilled, PersonStarburstRegular);
const IconAdministrator = bundleIcon(OrganizationFilled, OrganizationRegular);
const IconMention = bundleIcon(MentionFilled, MentionRegular);

const useStyles = makeStyles({
    root: {
        alignItems: "flex-start",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
    },
});

export const ShortLeftNavBar = (props) => {
    const { vertical } = props;

    // //Todo[QUEARY] tab access eligibility
    // //*API Setup
    // const fetchNewCreateVendor = () => {
    //     return axios.post(getAPI("all-access-tags-by-master"), { empid: getLoginUserID(), access_block_name: ["Administrator", "Superuser"] }, { headers: { "Content-Type": "application/json", "X-CSRFToken": getCookie("csrftoken") } });
    // };

    // //*Query Callback
    // const {
    //     isLoading: isLoading_accessTags,
    //     data: data_accessTags,
    //     isError: isError_accessTags,
    //     error: error_accessTags,
    //     isFetching: isFetching_accessTags,
    //     refetch: refetch_accessTags,
    // } = useQuery("all-access-tags-by-master-UNIQUE-2", fetchNewCreateVendor, {
    //     enabled: true,
    // });

    // //*Query Response Actions
    // useEffect(() => {
    //     if (isLoading_accessTags) {
    //         logPrint("🔍   administratorTabAvailabilityCheck  ➤  🔄");
    //     } else if (data_accessTags?.data) {
    //         logPrint("🔍   administratorTabAvailabilityCheck  ➤  🟢", data_accessTags?.data);
    //     } else if (isError_accessTags) {
    //         logPrint("🔍   administratorTabAvailabilityCheck  ➤  ⚠️", [error_accessTags?.message, error_accessTags?.response.data]);
    //     }
    // }, [isLoading_accessTags, data_accessTags, isError_accessTags, error_accessTags]);

    const tabs = [
        { id: "/quickaid", name: "Home", icon: <IconHome /> },
        { id: "/form", name: "Form", icon: <IconForm /> },
        { id: "/history", name: "History", icon: <IconHistory /> },
        { id: "/mentioned", name: "Mentioned", icon: <IconMention /> },
        { id: "/requests", name: "Requests", icon: <IconRequest /> },
        { id: "/admin", name: "Admin", icon: <IconAdministrator /> },

        // { id: "/administrator ", name: "Administrator ", icon: <IconAdministrator /> },
        // { id: "/subordinates", name: "Subordinates", icon: <IconSubordinates /> },
        // { id: "/administrator", name: "Administrator", icon: <IconAdministrator /> },
        // { id: "/superuser", name: "Superuser", icon: <IconSuperuser /> },
        // { id: "/report", name: "Report Bug", icon: <IconBug /> },
    ];

    const [tabProperty, setTabProperty] = useState({
        "/quickaid": { display: true, bubbleValue: null },
        "/form": { display: true, bubbleValue: null },
        "/requests": { display: true, bubbleValue: null },
        "/history": { display: true, bubbleValue: null },
        "/admin": { display: true, bubbleValue: null },
        "/mentioned": { display: true, bubbleValue: 10 },
    });

    //Todo🔍   Get unviewed mentioned ticket number
    //*API Setup
    const fetchUnreadMentionedTicketNumber = () => {
        return axios.post(getAPI("get-unviewed-mentioned-ticket-number"), { empid: getLoginUserID() }, { headers: { "Content-Type": "application/json", "X-CSRFToken": getCookie("csrftoken") } });
    };

    //*Query Callback
    const {
        isLoading: isLoading_getUnreadMentionedTicketNumber,
        data: data_getUnreadMentionedTicketNumber,
        isError: isError_getUnreadMentionedTicketNumber,
        error: error_getUnreadMentionedTicketNumber,
        isFetching: isFetching_getUnreadMentionedTicketNumber,
        refetch: refetch_getUnreadMentionedTicketNumber,
    } = useQuery("get-unviewed-mentioned-ticket-number-UNIQUE-1", fetchUnreadMentionedTicketNumber, {
        enabled: false,
    });

    //*Query Response Actions
    useEffect(() => {
        if (isLoading_getUnreadMentionedTicketNumber) {
            logPrint("🔍   getUnreadMentionedTicketNumber  ➤  🔄");
        } else if (data_getUnreadMentionedTicketNumber?.data) {
            logPrint("🔍   getUnreadMentionedTicketNumber  ➤  🟢", data_getUnreadMentionedTicketNumber?.data);
            setTabProperty({
                ...tabProperty,
                "/mentioned": {
                    ...tabProperty["/mentioned"],
                    bubbleValue: data_getUnreadMentionedTicketNumber?.data?.unviewed_requests_count || null,
                },
            });
        } else if (isError_getUnreadMentionedTicketNumber) {
            logPrint("🔍   getUnreadMentionedTicketNumber  ➤  ⚠️", [error_getUnreadMentionedTicketNumber?.message, error_getUnreadMentionedTicketNumber?.response.data]);
        }
    }, [isLoading_getUnreadMentionedTicketNumber, data_getUnreadMentionedTicketNumber, isError_getUnreadMentionedTicketNumber, error_getUnreadMentionedTicketNumber]);


    //Todo🔍   Get unviewed Request ticket number
    //*API Setup
    const fetchUnreadRequestedTicketNumber = () => {
        return axios.post(getAPI("get-unviewed-request-ticket-number"), { empid: getLoginUserID() }, { headers: { "Content-Type": "application/json", "X-CSRFToken": getCookie("csrftoken") } });
    };

    //*Query Callback
    const {
        isLoading: isLoading_getUnreadRequestedTicketNumber,
        data: data_getUnreadRequestedTicketNumber,
        isError: isError_getUnreadRequestedTicketNumber,
        error: error_getUnreadRequestedTicketNumber,
        isFetching: isFetching_getUnreadRequestedTicketNumber,
        refetch: refetch_getUnreadRequestedTicketNumber,
    } = useQuery("get-unviewed-request-ticket-number-UNIQUE-1", fetchUnreadRequestedTicketNumber, {
        enabled: false,
    });

    //*Query Response Actions
    useEffect(() => {
        if (isLoading_getUnreadRequestedTicketNumber) {
            logPrint("🔍   getUnreadRequestedTicketNumber  ➤  🔄");
        } else if (data_getUnreadRequestedTicketNumber?.data) {
            logPrint("🔍   getUnreadRequestedTicketNumber  ➤  🟢", data_getUnreadRequestedTicketNumber?.data);
            setTabProperty({
                ...tabProperty,
                "/requests": {
                    ...tabProperty["/requests"],
                    bubbleValue: data_getUnreadRequestedTicketNumber?.data?.unviewed_requests_count || null,
                },
            });
        } else if (isError_getUnreadRequestedTicketNumber) {
            logPrint("🔍   getUnreadRequestedTicketNumber  ➤  ⚠️", [error_getUnreadRequestedTicketNumber?.message, error_getUnreadRequestedTicketNumber?.response.data]);
        }
    }, [isLoading_getUnreadRequestedTicketNumber, data_getUnreadRequestedTicketNumber, isError_getUnreadRequestedTicketNumber, error_getUnreadRequestedTicketNumber]);




    const styles = useStyles();
    const location = useLocation();

    const [selectedTabId, setSelectedTabId] = useState((location.pathname.endsWith("/") ? location.pathname.slice(0, -1) : location.pathname).split("/")[1]);

    useEffect(() => {
        const newSelectedTab = location.pathname.split("/").length > 2 ? `/${location.pathname.split("/")[2]}` : `/${location.pathname.split("/")[1]}`;
        setSelectedTabId(newSelectedTab);
        // console.log(newSelectedTab, "===============");
    }, [location.pathname]);

    // const onTabSelect = (tabId) => {
    //     setSelectedTabId(tabId);
    // };

    const tabRootStyle = { position: "relative", flexDirection: "column", alignItems: "center", width: "80px", height: "45px" };
    const tabNameStyle = { position: "absolute", textAlign: "center", height: "20px", width: "80px", left: "0", bottom: "5px" };
    const iconStyle = { position: "absolute", top: "0", left: "calc(50% - 10px)" };

    const IconPosition = ({ tabicon }) => <div style={iconStyle}>{tabicon}</div>;




    //* AUTO REFRESH UNREAD BUBBLE NUMBER---------------------------------------------------------------------------+
    useEffect(() => { //                                                                                            |
        refetch_getUnreadMentionedTicketNumber(); // Initial fetch                                                  |
        const interval = setInterval(refetch_getUnreadMentionedTicketNumber, 5000); // Fetch every 5 seconds        |
        //                                                                                                          |
        // Cleanup on unmount                                                                                       |
        return () => clearInterval(interval); //                                                                    |
    }, []); // Empty dependency array to run once                                                                   |
    //                                                                                                              |
    //* AUTO REFRESH UNREAD BUBBLE NUMBER---------------------------------------------------------------------------+
    useEffect(() => { //                                                                                            |
        refetch_getUnreadRequestedTicketNumber(); // Initial fetch                                                  |
        const interval = setInterval(refetch_getUnreadRequestedTicketNumber, 5000); // Fetch every 5 seconds        |
        //                                                                                                          |
        // Cleanup on unmount                                                                                       |
        return () => clearInterval(interval); //                                                                    |
    }, []); // Empty dependency array to run once                                                                   |
    // -------------------------------------------------------------------------------------------------------------+
    return (
        <Box
            // sx={{height:{xs: "fit-content", sm: "fit-content", md: "calc(100vh - 64px)", lg: "calc(100vh -64px)"} , bgcolor:"red"}}
            // sx={{heigth:"50%", bgcolor:"red"}}

            sx={{ display: "flex", justifyContent: "center" }}
        >
            {vertical ? (
                <Box
                    sx={{
                        padding: "15px 10px",
                        // display: "flex",
                        display: { xs: "none", sm: "flex", md: "flex", lg: "flex", xl: "flex" },
                        flexDirection: "column",
                        justifyContent: "space-between",
                        background: "linear-gradient(90deg, rgba(231,231,231,1) 0%, rgba(242,242,242,1) 35%, rgba(251,251,251,1) 75%)",
                        height: "calc(100vh - 64px - 30px)",
                    }}
                >
                    <TabList
                        // selectedValue={selectedTabId}

                        className={styles.root}
                        style={{
                            // background: "linear-gradient(90deg, rgba(231,231,231,1) 0%, rgba(242,242,242,1) 35%, rgba(251,251,251,1) 75%)",
                            // height: "calc(100vh -140px)",
                            gap: "10px",
                        }}
                        // defaultSelectedValue="/quickaid"
                        vertical
                        selectedValue={selectedTabId}
                    >
                        {tabs.map(
                            (tab, index) =>
                                tabProperty[tab.id]["display"] && (
                                    <Link key={tab.id} to={`/quickaid${tab.id === "/quickaid" ? "" : tab.id}`}>
                                        <Badge size="small" count={tabProperty[tab.id]["bubbleValue"]  ? tabProperty[tab.id]["bubbleValue"] : null} overflowCount={99} offset={[-20, 0]}>
                                            <Tab style={tabRootStyle} icon={<IconPosition tabicon={tab.icon} />} value={tab.id}>
                                                <div style={tabNameStyle}>{tab.name}</div>
                                            </Tab>
                                        </Badge>
                                    </Link>
                                )
                        )}
                    </TabList>

                    <Box style={{ width: "80px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <img src={automation_team_logo} alt="Descriptive Alt Text" style={{ maxWidth: "80px", height: "auto", userSelect: "none", pointerEvents: "none" }} draggable="false" />
                    </Box>
                </Box>
            ) : (
                <Box
                    sx={{
                        padding: "15px 10px 5px 10px",
                        // display: "flex",
                        display: { xs: "flex", sm: "none", md: "none", lg: "none", xl: "none" },
                        // flexDirection: "column",
                        justifyContent: "center",
                        background: "linear-gradient(90deg, rgba(231,231,231,1) 0%, rgba(242,242,242,1) 35%, rgba(251,251,251,1) 75%)",
                        // height: "calc(100vh -140px)",
                        width: "100vw",
                    }}
                >
                    <TabList
                        // selectedValue={selectedTabId}

                        // className={styles.root}
                        style={{
                            // background: "linear-gradient(90deg, rgba(231,231,231,1) 0%, rgba(242,242,242,1) 35%, rgba(251,251,251,1) 75%)",
                            // height: "calc(100vh -140px)",
                            alignItems: "flex-start",
                            display: "flex",
                            // flexDirection: "column",
                            justifyContent: "flex-start",
                            // gap: "5px",
                        }}
                        // defaultSelectedValue="/quickaid"
                        // vertical
                        selectedValue={selectedTabId}
                    >
                        {tabs.map(
                            (tab, index) =>
                                tabProperty[tab.id]["display"] && (
                                    <Link key={tab.id} to={`/quickaid${tab.id === "/quickaid" ? "" : tab.id}`}>
                                        <Badge size="small" count={tabProperty[tab.id]["bubbleValue"] ? tabProperty[tab.id]["bubbleValue"] : null} overflowCount={99} offset={[-20, 0]}>
                                            <Tab style={{ ...tabRootStyle, width: "80px" }} icon={<IconPosition tabicon={tab.icon} />} value={tab.id}>
                                                <div style={{ ...tabNameStyle, width: "80px", fontSize: "11px" }}>{tab.name}</div>
                                            </Tab>
                                        </Badge>
                                    </Link>
                                )
                        )}
                    </TabList>

                    {/* <Box style={{ width: "80px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <img src={automation_team_logo} alt="Descriptive Alt Text" style={{ maxWidth: "80px", height: "auto", userSelect: "none", pointerEvents: "none" }} draggable="false" />
                    </Box> */}
                </Box>
            )}
        </Box>
    );
};
