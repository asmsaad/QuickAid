import React from "react";
import { StatsGrid } from "../components/StatisticsView";
import BasicDoc from "../components/hierarchy";
import { CardOverCard } from "../components/CardOverCard";
import { Box } from "@mui/material";
import { MonthlyStatisticsCard } from "../components/statistics/MonthlyStatisticsCard";
import "../All_Styles/Scrollbar.css"

import { createTheme, MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import { DomainStatisticsCard } from "../components/statistics/DomainStatisticsCard";
import { RingProgressCard } from "../components/statistics/RingProgressCard";
import { SegmentStatisticsCard } from "../components/statistics/SegmentStatisticsCard";
import { PerformanceStatisticsCard } from "../components/statistics/PerformanceStatisticsCard";
import { ControllStatisticsCard } from "../components/statistics/ControllStatisticsCard";
import { ProgressCard } from "../components/statistics/ProgressCard";
const theme = createTheme({
    /** Put your mantine theme override here */
});

const HomePage = () => {
    return (
        // <>
        //     <CardOverCard />
        //     <BasicDoc />
        // </>

        <Box sx={{ width: "100%", height: "100%", display: "flex", justifyContent: "flex-start", alignItems: "center", flexDirection: "column" }}>

            <Box className="custom-scrollbar" sx={{width:'100%', height:'100%', overflowY:'scroll', padding:'10px 0'}}>
                <MantineProvider theme={theme}>
                    <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
                        <MonthlyStatisticsCard  />
                    </Box>
                    <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
                        <DomainStatisticsCard  />
                    </Box>
                    <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
                        <RingProgressCard  />
                    </Box>
                    <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
                        <SegmentStatisticsCard  />
                    </Box>
                    <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
                        <PerformanceStatisticsCard  />
                    </Box>
                    <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
                        <ControllStatisticsCard  />
                    </Box>
                    <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
                        <ProgressCard  />

                    </Box>
                </MantineProvider>
                
            </Box>

        </Box>
    );
};

export default HomePage;
                    {/* <ProgressCard  />
                    <ProgressCard  /> */}