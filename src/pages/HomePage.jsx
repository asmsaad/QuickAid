import React from "react";
import { StatsGrid } from "../components/StatisticsView";
import BasicDoc from "../components/hierarchy";
import { CardOverCard } from "../components/CardOverCard";
import { Box } from "@mui/material";
import { MonthlyStatisticsCard } from "../components/statistics/MonthlyStatisticsCard";

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

        <Box sx={{ width: "100%", height: "calc(100%)", display: "flex", justifyContent: "flex-start", alignItems: "center", flexDirection: "column" }}>
            <MantineProvider theme={theme}>
                <Box sx={{ width: "100%", display: "flex", justifyContent: "center", margin: "20px" }}>
                    <MonthlyStatisticsCard  />
                </Box>
                <Box sx={{ width: "100%", display: "flex", justifyContent: "center", margin: "20px" }}>
                    <DomainStatisticsCard  />
                </Box>
                <Box sx={{ width: "100%", display: "flex", justifyContent: "center", margin: "20px" }}>
                    <RingProgressCard  />
                </Box>
                <Box sx={{ width: "100%", display: "flex", justifyContent: "center", margin: "20px" }}>
                    <SegmentStatisticsCard  />
                </Box>
                <Box sx={{ width: "100%", display: "flex", justifyContent: "center", margin: "20px" }}>
                    <PerformanceStatisticsCard  />
                </Box>
                <Box sx={{ width: "100%", display: "flex", justifyContent: "center", margin: "20px" }}>
                    <ControllStatisticsCard  />
                </Box>
                <Box sx={{ width: "100%", display: "flex", justifyContent: "center", margin: "20px" }}>
                    <ProgressCard  />
                    {/* <ProgressCard  />
                    <ProgressCard  /> */}
                </Box>
            </MantineProvider>
        </Box>
    );
};

export default HomePage;
