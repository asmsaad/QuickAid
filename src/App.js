import { useState } from "react"; // Add this if you're using state for formData
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Add Routes and Route
import { QueryClientProvider, QueryClient } from "react-query";
import { FluentProvider, teamsLightTheme } from "@fluentui/react-components";
// import ManageEmployeeTab from "./Renders/ManageContributors";
// import { SuperUser } from "./Tabs/SuperUser";
// import ReportBug from "./Tabs/ReportBug";
// import { PageDoseNotExist } from "./Components/MessageDoodle";
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

// import PageDoseNotExist from "./PageDoseNotExist";

const queryClient = new QueryClient();

const theme = createTheme({
    /** Put your mantine theme override here */
});

// function Demo() {
//     return (
//         <MantineProvider theme={theme}>
//             {/* Your app here */}
//             <StatsGrid />
//         </MantineProvider>
//     );
// }

function App() {
    return (
        <FluentProvider theme={teamsLightTheme}>
            <QueryClientProvider client={queryClient}>
                {/* <Router future={{ v7_relativeSplatPath: true }}> */}
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

// `
// <Router>
//     <Routes>
//         <Route path="prosync" element={<PageLayout />}>
//             <Route path="submissions" element={<TabLayout formData={formData} setFormData={setFormData} />}>
//                 <Route path="byweek" element={<SubmissionByWeek />} />
//                 <Route path="byproject" element={<SubmissionByProject />} />
//             </Route>

//             <Route path="projects" element={<MyProjects />}>
//                 <Route path=":projectID" element={<SingleProjectInfo />}>
//                     <Route path="overview" element={<ProjectOverviewTab />} />
//                     <Route path="updates" element={<ProjectUpdatesTab />} />
//                     <Route path="meetings" element={<ProjectMeetings />} />
//                     {/* <Route path="statistics" element={<ProjectMeetings />} /> */}
//                 </Route>
//             </Route>
//             <Route path="subordinates" element={<Subordinates />} />

//             <Route path="administrator" element={<Administrator />}>
//                 <Route path="projects" element={<ManageProjects />} />
//                 <Route path="teams" element={<ManageTeamTab />} />
//                 <Route path="vendors" element={<ManageVendorTab />} />
//                 <Route path="vendorsrepresentors" element={<ManageClientendMember />} />
//                 <Route path="contributors" element={<ManageEmployeeTab />} />
//             </Route>

//             <Route path="superuser" element={<SuperUser />} />
//             <Route path="report" element={<ReportBug />} />

//             <Route path="*" element={<PageDoseNotExist />} />
//         </Route>
//     </Routes>
// </Router>
// `
