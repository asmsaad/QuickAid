import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { message, Radio, Select, Skeleton, Tag } from "antd";

//*---------------------------------------------------------------------
import { useQuery } from "react-query"; //* React Query                 |
import axios from "axios"; //* React Query                              |
import { getAPI } from "../../apis/apis"; //*                           |
import { getLoginUserID } from "../../authentication/localStorage"; //* |
import { logPrint } from "../../authentication/logPrint"; //*           |
import { getCookie } from "../../utility"; //*                          |
import { TooltipPopover } from "../FormPage";
//*---------------------------------------------------------------------

const HierarchyTab = () => {
    const initialData = {
        domainIdx: null,
        hierarchyData: {},
    };
    const [selectedData, setSelectedData] = useState(initialData);

    //Get all domain with envolved person
    //Todo[QUEARY] SYNC ALL AVAIABLE DATA
    //*API Setup
    const fetchAvailableDomainsWithMembers = () => {
        return axios.post(getAPI("get-user-for-domain"), { empid: getLoginUserID() }, { headers: { "Content-Type": "application/json", "X-CSRFToken": getCookie("csrftoken") } });
    };

    //*Query Callback
    const {
        isLoading: isLoading_getAvailableDomainsWithMembers,
        data: data_getAvailableDomainsWithMembers,
        isError: isError_getAvailableDomainsWithMembers,
        error: error_getAvailableDomainsWithMembers,
        isFetching: isFetching_getAvailableDomainsWithMembers,
        refetch: refetch_getAvailableDomainsWithMembers,
    } = useQuery("get-user-for-domain-UNIQUE-3", fetchAvailableDomainsWithMembers, {
        enabled: true,
    });

    //*Query Response Actions
    useEffect(() => {
        if (isLoading_getAvailableDomainsWithMembers) {
            logPrint("🔍   getAvailableDomainsWithMembers  ➤  🔄");
            // messageApi.open({ key: 1, type: "loading", content: "Fetching domain table data" }); //Message
        } else if (data_getAvailableDomainsWithMembers?.data) {
            logPrint("🔍   getAvailableDomainsWithMembers  ➤  🟢", data_getAvailableDomainsWithMembers?.data);
            // messageApi.open({ key: 1, type: "loading", content: "Fetching domain table data" }); //Message

            // setModalBodyConfig({
            //     ...modalBodyConfig,
            //     domain: {
            //         ...modalBodyConfig["domain"],
            //         suggestionsList: Object.keys(data_getAvailableDomainsWithMembers?.data).map((domain_Idx) => {
            //             return {
            //                 value: domain_Idx,
            //                 label: data_getAvailableDomainsWithMembers?.data[domain_Idx]["domain_name"],
            //             };
            //         }),
            //     },
            // });
            // setTableData(
            //     Object.keys(data_getAvailableDomainsWithMembers?.data).map((domain_Idx, index) => {
            //         const individual_data = data_getAvailableDomainsWithMembers?.data[domain_Idx];
            //         return {
            //             key: index + 1,
            //             domain: individual_data["domain_name"],
            //             members: (
            //                 <Box>
            //                     {Object.keys(individual_data["users"] || {}).map((empid, index) => (
            //                         <Tag key={index} style={{ margin: "2px" }}>{`${individual_data["users"][empid]["name"]} (${empid})`}</Tag>
            //                     ))}
            //                 </Box>
            //             ),
            //         };
            //     })
            // );

            // setTimeout(() => messageApi.destroy(1), 1000); // Message
        } else if (isError_getAvailableDomainsWithMembers) {
            logPrint("🔍   getAvailableDomainsWithMembers  ➤  ⚠️", [error_getAvailableDomainsWithMembers?.message, error_getAvailableDomainsWithMembers?.response.data]);
        }
    }, [isLoading_getAvailableDomainsWithMembers, data_getAvailableDomainsWithMembers, isError_getAvailableDomainsWithMembers, error_getAvailableDomainsWithMembers]);

    useEffect(() => {
        console.log(selectedData, "CHECK_UUI");
    }, [selectedData]);

    return (
        <Box sx={{ width: "calc(100% - 10px)", margin: "0 0 10px 10px", display: "flex", flexDirection: "column" }}>
            {/* <div>HierarchyTab</div> */}

            <Box sx={{ width: "350px" }}>
                {/* ISSUE CATEGORY */}
                <TooltipPopover
                    title="Choose domain"
                    // display_info={tooltips.issue_category}
                />
                {isLoading_getAvailableDomainsWithMembers ? (
                    <Skeleton.Input block={true} active={true} size={"default"} />
                ) : (
                    <Select
                        placeholder="Choose domain"
                        showSearch
                        allowClear
                        size="medium"
                        style={{ width: "100%" }}
                        optionFilterProp="label"
                        filterSort={(optionA, optionB) => (optionA?.label ?? "").toLowerCase().localeCompare((optionB?.label ?? "").toLowerCase())}
                        value={selectedData.domainIdx}
                        onChange={(value, selectedObject) => {
                            setSelectedData({ ...selectedData, domainIdx: value ? value : null });
                        }}
                        options={Object.keys(data_getAvailableDomainsWithMembers?.data || {}).map((domain_idx) => {
                            return { value: domain_idx, label: data_getAvailableDomainsWithMembers?.data[domain_idx]["domain_name"] };
                        })}
                        // disabled={loadings[0] ? true : false}
                    />
                )}
            </Box>

            <Box>
                <HierarchIndividual selectedData={selectedData} setSelectedData={setSelectedData} data_getAvailableDomainsWithMembers={data_getAvailableDomainsWithMembers?.data} />
            </Box>
        </Box>
    );
};

const HierarchIndividual = (props) => {
    const { selectedData, setSelectedData, data_getAvailableDomainsWithMembers } = props;
    console.log(data_getAvailableDomainsWithMembers, "==============");
    return (
        <Box>
            <Box sx={{ display: "flex", padding: "5px 5px 0 5px" }}>
                <Box sx={{ width: "300px", display: "flex", justifyContent: "flex-end", alignContent: "center" }}> Order </Box>
                <Box>
                    <Box sx={{ display: "flex", justifyContent: "center", alignContent: "center", gap: "8px" }}>
                        {Array.from({ length: 10 }, (_, index) => {
                            return <Box style={{ width: "22px", display: "flex", justifyContent: "center", alignItems: "center" }}> {index + 1} </Box>;
                        })}
                    </Box>
                </Box>
            </Box>

            <Box>
                {Object.keys(data_getAvailableDomainsWithMembers?.[selectedData.domainIdx]?.["users"] || {}).map((empid, index) => {
                    const empname = data_getAvailableDomainsWithMembers?.[selectedData.domainIdx]["users"][empid]?.name;
                    console.log(">>", empname);
                    return <IndividualH key={index} selectedData={selectedData} setSelectedData={setSelectedData} empid={empid} empname={empname} hierarchyValue={1} />;
                })}
            </Box>
        </Box>
    );
};

const IndividualH = (props) => {
    const { selectedData, setSelectedData, empid, empname, hierarchyValue } = props;

    const [value, setValue] = useState(hierarchyValue);
    const onChange = (e) => {
        console.log("radio checked", e.target.value);
        setValue(e.target.value);
        const order = e.target.value;
        setSelectedData({
            ...selectedData,
            hierarchyData: {
                ...selectedData.hierarchyData,
                [order]: [...(selectedData.hierarchyData[order] || []), empid], // Ensure existing array or fallback to empty
            },
        });
    };

    return (
        <Box sx={{ display: "flex", padding: "5px" }}>
            {/* Render content here based on the key */}
            {/* Employee */}
            <Box sx={{ width: "300px" }}>
                <Tag> {`${empname} (${empid})`}</Tag>
            </Box>
            {/* SubDoamin */}
            {/* <Box>User: {}</Box> */}
            {/* Department */}

            {/* Location */}

            {/* HierarchyTab */}
            <Box sx={{ width: "300px" }}>
                <Radio.Group
                    style={{ display: "flex" }}
                    // disabled
                    onChange={onChange}
                    value={value}
                >
                    <Radio value={1} style={{ width: "50px", display: "flex", justifyContent: "center", alignItems: "center" }}></Radio>
                    <Radio value={2} style={{ width: "50px", display: "flex", justifyContent: "center", alignItems: "center" }}></Radio>
                    <Radio value={3} style={{ width: "50px", display: "flex", justifyContent: "center", alignItems: "center" }}></Radio>
                    <Radio value={4} style={{ width: "50px", display: "flex", justifyContent: "center", alignItems: "center" }}></Radio>
                    <Radio value={5} style={{ width: "50px", display: "flex", justifyContent: "center", alignItems: "center" }}></Radio>
                    <Radio value={6} style={{ width: "50px", display: "flex", justifyContent: "center", alignItems: "center" }}></Radio>
                    <Radio value={7} style={{ width: "50px", display: "flex", justifyContent: "center", alignItems: "center" }}></Radio>
                    <Radio value={8} style={{ width: "50px", display: "flex", justifyContent: "center", alignItems: "center" }}></Radio>
                    <Radio value={9} style={{ width: "50px", display: "flex", justifyContent: "center", alignItems: "center" }}></Radio>
                    <Radio value={10} style={{ width: "50px", display: "flex", justifyContent: "center", alignItems: "center" }}></Radio>
                </Radio.Group>
            </Box>
        </Box>
    );
};

export default HierarchyTab;
