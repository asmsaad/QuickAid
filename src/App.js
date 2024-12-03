import { useEffect, useState } from "react"; // Add this if you're using state for formData
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Add Routes and Route
import { QueryClientProvider, QueryClient } from "react-query";
import { FluentProvider, teamsLightTheme } from "@fluentui/react-components";



import HistoryPage from "./pages/HistoryPage";
import AppStructure from "./pages/AppStructure";
import FormPage from "./pages/FormPage";
import AdministratorPage from "./pages/AdministratorPage";
import { createTheme, MantineProvider } from "@mantine/core";
import { RequestDescription } from "./components/RequestDescription";
import MentionPage from "./pages/MentionPage";
import RequestPage from "./pages/RequestPage";
import IssueTab from "./pages/AdministratorPage/IssueTab";
import SubIssueTab from "./pages/AdministratorPage/SubIssueTab";
import HierarchyTab from "./pages/AdministratorPage/HierarchyTab";
import WorkDistributionTab from "./pages/AdministratorPage/WorkDistributionTab";
import LocationTab from "./pages/AdministratorPage/LocationTab";
import { RequestPermissionAndCollectToken } from "./NotificationService";

const queryClient = new QueryClient();

function App() {
    

    return (
        <FluentProvider theme={teamsLightTheme}>
            <QueryClientProvider client={queryClient}>
                {/* <Router future={{ v7_relativeSplatPath: true }}> */}
                {/* {accessToken} */}
                <RequestPermissionAndCollectToken /> 
                {/* //!Colelct Notification token and ask for permissions */}
                <Router>
                    <Routes>
                        <Route path="quickaid" element={<AppStructure />}>
                            <Route path="form" element={<FormPage />} />

                            <Route path="history" element={<HistoryPage />}>
                                <Route path=":ticketID" element={<RequestDescription />} />
                            </Route>
                            <Route path="mentioned" element={<MentionPage />}>
                                <Route path=":ticketID" element={<RequestDescription />} />
                            </Route>
                            <Route path="requests" element={<RequestPage />}>
                                <Route path=":ticketID" element={<RequestDescription />} />
                            </Route>
                            <Route path="admin" element={<AdministratorPage />}>
                                <Route path="issue" element={<IssueTab />} />
                                <Route path="sub-issue" element={<SubIssueTab />} />
                                <Route path="hierarchy" element={<HierarchyTab />} />
                                <Route path="distributions" element={<WorkDistributionTab />} />
                                <Route path="locations" element={<LocationTab />} />
                            </Route>
                        </Route>
                    </Routes>
                </Router>
            </QueryClientProvider>
        </FluentProvider>
    );
}

export default App;
