import { AppBar, Avatar, Box, Menu, MenuItem, Toolbar, Typography, styled } from "@mui/material";
import React, { useState } from "react";
// import SearchIcon from '@mui/icons-material/Search';
// import TemporaryDrawer from "../components/NavDrawer";
import { deleteKeyToLocalStorage } from "../authentication/localStorage";
import { getDataFromLocalStorage } from "../authentication/localStorage";
import { IdcardOutlined, NodeIndexOutlined } from "@ant-design/icons";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import { Button } from "antd";
import "./../style/Navbar.css";

import app_logo_img from "./../media/icon.png";

const StyledToolbar = styled(Toolbar)({
    display: "flex",
    justifyContent: "space-between",
    background: "#415a77",
    background: "#0068a7",
    height: "50px",
});

/**
 * Renders a navigation bar with responsive design for HR Bulletin.
 *
 * @returns {JSX.Element} The rendered Navbar component.
 *
 * How to Use this Code:
 * - Include this component in your application to display a navigation bar.
 * - The navigation bar includes a title ('HR Bulletin'), a drawer icon for smaller screens, user information,
 *   search icon (for smaller screens), and a user avatar that opens a menu on click.
 * - Ensure to handle the state of 'open' for controlling the menu visibility on avatar click.
 * - Customize menu items (Profile, My Activity, Logout) as per your application's requirements.
 * @example Navbar will render like below
 *
 * +---------------------------------------------------------------+
 * |                       Navigation (Nav) Bar                    |
 * |---------------------------------------------------------------|
 * |                                                               |
 * |                                                               |
 * |                                                               |
 * |                                                               |
 * |                                                               |
 * |                                                               |
 * |                                                               |
 * |                                                               |
 * +---------------------------------------------------------------+
 */
const Navbar = () => {
    const navigate = useNavigate();

    const [open, setOpen] = useState(false);
    const userCredential = getDataFromLocalStorage("user-credential");
    // console.log("userCredential1::++++++++++============", userCredential);

    const onClickLogOut = () => {
        deleteKeyToLocalStorage("user-credential");
        window.location.reload();
    };

    //* CSS CRITERIA ON DIFFERENT SCREEN SIZE
    const displayConfig_1 = { xs: "none", lg: "flex" };
    const displayConfig_2 = { xs: "flex", lg: "none" };

    return (
        <AppBar position="sticky">
            <StyledToolbar>
                {/*//* APP NAME */}
                {/* <Box sx={{ display: displayConfig_1, alignItems: "center", cursor: "pointer" }} onClick={() => navigate("/quickaid")}> */}
                <Box sx={{ display: displayConfig_1, alignItems: "center", cursor: "pointer" }} onClick={() => navigate("/quickaid")}>
                    <Box style={{ width: "42px", display: "flex", justifyContent: "center", alignItems: "center", margin: "0 10px 0 15px" }}>
                        <img src={app_logo_img} alt="Descriptive Alt Text" style={{ maxWidth: "42px", height: "auto", userSelect: "none", pointerEvents: "none" }} draggable="false" />
                    </Box>
                    <Typography variant="h6">Quick Aid</Typography>
                </Box>

                <Box sx={{ display: displayConfig_2, alignItems: "center", cursor: "pointer" }} onClick={() => navigate("/quickaid")}>
                    <Box style={{ width: "42px", display: "flex", justifyContent: "center", alignItems: "center", margin: "0 10px 0 0px" }}>
                        <img src={app_logo_img} alt="Descriptive Alt Text" style={{ maxWidth: "42px", height: "auto", userSelect: "none", pointerEvents: "none" }} draggable="false" />
                    </Box>
                    <Typography variant="h6">Quick Aid</Typography>
                </Box>

                {/* <Typography variant="h6" sx={{ display: displayConfig_2 }}>
                    <Box display="flex" justifyContent="center" alignItems="center" gap="15px">
                        <Box onClick={() => navigate("/quickaid")}>Quick Aid</Box>
                    </Box>
                </Typography> */}

                {/*//* AVATER AND INFO */}
                {!open && (
                    <Box display="flex" alignItems="center" gap="10px">
                        <Box sx={{ display: "flex", flexDirection: "column" }}>
                            <Typography variant="body1" sx={{ fontSize: "14px", display: { xs: "none", sm: "block" } }}>
                                {userCredential.name}
                            </Typography>
                            <Typography variant="body2" sx={{ fontSize: "12px", display: { xs: "none", sm: "flex" }, justifyContent: "flex-end" }}>
                                {userCredential.designation}
                            </Typography>
                        </Box>
                        <Avatar style={{ cursor: "pointer" }} alt={userCredential.name} src={userCredential.picture} sx={{ width: 32, height: 32 }} onClick={(e) => setOpen(true)} />
                    </Box>
                )}

                {/*//* NAV BAR MENU */}
                <Menu sx={{ marginTop: "50px" }} id="demo-positioned-menu" aria-labelledby="demo-positioned-button" open={open} onClose={(e) => setOpen(false)} anchorOrigin={{ vertical: "top", horizontal: "right" }} transformOrigin={{ vertical: "top", horizontal: "left" }}>
                    <Box sx={{ width: "260px", paddingBottom: "20px" }}>
                        <Box sx={{ width: "100%", textAlign: "center", fontSize: "20px", margin: "15px 0" }}>Profile</Box>

                        <Box sx={{ width: "100%", display: "flex", justifyContent: "center", margin: "15px 0" }}>
                            <div className="avatar-wrapper">
                                <div className="avatar-border"></div>
                                <div className="avatar" style={{ overflow: "hidden" }}>
                                    <img src={userCredential.picture} alt="Italian Trulli" width="100px" height="100px" />
                                </div>
                            </div>
                        </Box>

                        <Box sx={{ width: "100%", textAlign: "center", fontSize: "18px" }}>{userCredential.name}</Box>

                        <Box sx={{ width: "100%", display: "flex", justifyContent: "center", fontSize: "12px" }}>
                            <Box sx={{ marginRight: "10px" }}>
                                <NodeIndexOutlined /> {userCredential.designation}{" "}
                            </Box>
                            <Box>
                                <IdcardOutlined /> {userCredential.empid}
                            </Box>
                        </Box>

                        <Box sx={{ marginTop: "30px", display: "flex", justifyContent: "center" }}>
                            <Button color="danger" variant="filled" danger onClick={onClickLogOut}>
                                Logout <LogoutIcon style={{ fontSize: "12px" }} />
                            </Button>
                        </Box>
                    </Box>
                </Menu>
            </StyledToolbar>
        </AppBar>
    );
};

export default Navbar;
