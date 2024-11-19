import { CaretRightOutlined, MedicineBoxOutlined, SisternodeOutlined, UserAddOutlined } from "@ant-design/icons";
import { Box } from "@mui/material";
import { Breadcrumb, Button, Card, Modal, Select, Tag, Timeline, Typography } from "antd";
import React, { useEffect, useState } from "react";

import "../All_Styles/Scrollbar.css";
import { ProfileCard, ProfileCardXS } from "../components/ProfileCard";
import { CalendarRegular, ClockRegular } from "@fluentui/react-icons";
import TextArea from "antd/es/input/TextArea";
import { NoTicketSelected } from "../components/DoodlingMessage";

import { Outlet, Link, useNavigate, useLocation, useParams } from "react-router-dom";

const { Text } = Typography;

{
    /* <Breadcrumb
    items={[
      {
        href: '',
        title: <HomeOutlined />,
      },
      {
        href: '',
        title: (
          <>
            <UserOutlined />
            <span>Application List</span>
          </>
        ),
      },
      {
        title: 'Application',
      },
    ]}
  /> */
}

const items = [
    {
        title: <Tag>History</Tag>,
    },
    {
        title: "21011301",
    },
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
            <HistoryPageStructure />
        </Box>
    );
};

const RequestCard = (props) => {
    const { ticket_id, selectedTicket } = props;
    // if (ticket_id selectedTicket)
    // console.log(ticket_id, selectedTicket, "------>");
    return (
        // <Box sx={{ width: `calc(100% - 30px)`, maxWidth: "400px", height: "fit-content", borderRadius: "10px", border: "0.5px solid #ededed", "&:hover": { border: "1px dashed grey", cursor: "pointer" }, padding: "5px 10px", bgcolor: "#FCFCFC" }}>
        <Box sx={{ width: `calc(100% - 30px)`, maxWidth: { xs: "calc(100% - 30px)", xl: "400px" }, height: "fit-content", borderRadius: "10px", border: "0.5px solid white", "&:hover": { border: "1px dashed grey", cursor: "pointer" }, padding: "5px 10px", bgcolor: selectedTicket == ticket_id ? "#ececec" : null }}>
            {/* HEADER */}
            <Box sx={{ width: "100%", display: "flex", justifyContent: "space-between" }}>
                <Box>
                    {" "}
                    <Breadcrumb items={items} separator={">"} />{" "}
                </Box>
                <Box>
                    {ticket_id}
                    <Tag style={{ margin: "0" }}>Accepted</Tag>{" "}
                </Box>
            </Box>

            {/* DESCRIPTION */}
            <Box sx={{ width: "100%", textAlign: "justify", display: "-webkit-box", overflow: "hidden", WebkitBoxOrient: "vertical", WebkitLineClamp: 2, color: "grey", lineHeight: 1.3, fontSize: "12px", margin: "5px 0 3px 0" }}>When an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</Box>

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

const noStyle = {
    textDecoration: "none",
    color: "inherit",
    all: "unset",
    height: "fit-content",
};

const HistoryPageStructure = () => {
    const navigate = useNavigate();
    const location = useLocation(); // This gives you the current URL
    // console.log(location.pathname.split("/").length,'===== >>>')

    const original_loc = location.pathname.endsWith("/") ? location.pathname.slice(0, -1) : location.pathname;
    console.log(original_loc.split("/").length, "===>>>");

    const [selectedTicket, setSelectedTicket] = useState(null);

    useEffect(() => {
        const original_loc_split = original_loc.split("/");
        if (original_loc_split.length > 2) {
            setSelectedTicket(original_loc_split[3]);
            // const element = document.getElementById(`ticket-${original_loc_split[3]}`);

            // if (element) {
            //     element.scrollIntoView({ behavior: "smooth", block: "center" }); // Scroll to the element
            //     // element.style.backgroundColor = "yellow"; // Highlight the div (optional)
            // }
        }
    }, [original_loc]);

    useEffect(() => {
        const original_loc_split = original_loc.split("/");
        if (original_loc_split.length > 2) {
            // setSelectedTicket(original_loc_split[3]);
            const element = document.getElementById(`ticket-${original_loc_split[3]}`);

            if (element) {
                element.scrollIntoView({ behavior: "smooth", block: "center" }); // Scroll to the element
                // element.style.backgroundColor = "yellow"; // Highlight the div (optional)
            }
        }
    }, []);

    return (
        <Box sx={{ display: "flex", width: "100%" }}>
            {/* AVAILABLE TICKET LIST */}
            <Box className="custom-scrollbar" sx={{ width: { xs: "100%", md: "400px" }, height: `calc(100% - 20px)`, display: { xs: original_loc.split("/").length > 3 ? "none" : "flex", md: "flex" }, flexDirection: "column", gap: "5px", overflowY: "scroll", alignItems: "center", padding: "10px 0" }}>
                {Array.from({ length: 100 }, (_, index) => (
                    <Link id={`ticket-${index}`} key={index} to={`${index}`} style={noStyle}>
                        <RequestCard ticket_id={index} selectedTicket={selectedTicket} />
                    </Link>
                ))}
            </Box>

            {/* TICKET DETAILS */}
            <Box className="custom-scrollbar" sx={{ flex: "1", height: `calc(100% - 20px)`, display: { xs: original_loc.split("/").length > 3 ? "flex" : "none", md: "flex" }, overflowY: "scroll", padding: "10px" }}>
                {original_loc.split("/").length > 3 ? <Outlet /> : <NoTicketSelected status={false} subTitle={"No ticket has been selected; please choose one to view its details."} />}
            </Box>
        </Box>
    );
};

export default HistoryPage;
