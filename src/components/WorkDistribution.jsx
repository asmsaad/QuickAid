import { Box } from "@mui/system";
import React, { useState } from "react";
import { Cascader, Flex, Switch } from "antd";
import { ProfileCardXS } from "./ProfileCard";
import { OrganizationChart } from "primereact/organizationchart";
import { PrimeReactProvider } from "primereact/api";

const myData001 = [
    {
        label: "Argentina",
        expanded: true,
        data: "ar",
        children: [
            {
                label: "Argentina",
                expanded: true,
                data: "ar",
                children: [
                    {
                        label: "Argentina",
                        data: "ar",
                    },
                    {
                        label: "Croatia",
                        data: "hr",
                    },
                ],
            },
            {
                label: "France",
                expanded: true,
                data: "fr",
                children: [
                    {
                        label: "France",
                        data: "fr",
                    },
                    {
                        label: "Morocco",
                        data: "ma",
                    },
                ],
            },
        ],
    },
];

const department_name = [
    {
        value: "Circuit and System Design",
        label: "Circuit and System Design",
        children: [
            {
                value: "Regnam L-2",
                label: "Regnam L-2",
            },
            {
                value: "Regnam L-3",
                label: "Regnam L-3",
            },
        ],
    },
    {
        value: "Synopsys ODC",
        label: "Synopsys ODC",
        children: [
            {
                value: "Regnam L-3",
                label: "Regnam L-3",
            },
            {
                value: "Kudus L-8",
                label: "Kudus L-8",
            },
        ],
    },
    {
        value: "TSMC",
        label: "TSMC",
        children: [
            {
                value: "Regnam L-5",
                label: "Regnam L-5",
            },
        ],
    },
];

const department = [
    { value: "Department", label: "Department", children: department_name },
    {
        value: "Reporting Order",
        label: "Reporting Order",
        children: [
            { value: "1", label: "1st" },
            { value: "2", label: "2nd" },
            { value: "3", label: "3rd" },
            { value: "4", label: "4th" },
            { value: "5", label: "5th" },
        ],
    },
];

const domain = [
    {
        value: "IT - Service",
        label: "IT - Service",
        children: department,
    },
    {
        value: "IT - Issue",
        label: "IT - Issue",
        children: department,
    },
    {
        value: "IT - Repair",
        label: "IT - Repair",
        children: department,
    },
];

const person = [
    {
        value: "A S M Mehedi Hasan Sad",
        label: "A S M Mehedi Hasan Sad",
        children: domain,
    },
    {
        value: "Hafizur Rahaman",
        label: "Hafizur Rahaman",
        children: domain,
    },
    {
        value: "Jubayer Liyakot",
        label: "Jubayer Liyakot",
        children: domain,
    },
    {
        value: "Minhazul Azmir",
        label: "Minhazul Azmir",
        children: domain,
    },
];

const options = [
    {
        value: "zhejiang",
        label: "Zhejiang",
        children: [
            {
                value: "hangzhou",
                label: "Hangzhou",
                children: [
                    {
                        value: "xihu",
                        label: "West Lake",
                    },
                ],
            },
        ],
    },
    {
        value: "jiangsu",
        label: "Jiangsu",
        children: [
            {
                value: "nanjing",
                label: "Nanjing",
                children: [
                    {
                        value: "zhonghuamen",
                        label: "Zhong Hua Men",
                    },
                ],
            },
        ],
    },
];

export const WorkDistribution = () => {
    const [disabled, setDisabled] = useState(false);
    const onChange = (value) => {
        console.log(value);
    };
    const onMultipleChange = (value) => {
        console.log(value);
    };
    return (
        <Box>
            <Flex vertical gap="small" align="flex-start">
                <Switch checked={disabled} checkedChildren="Enabled" unCheckedChildren="Disabled" onChange={setDisabled} aria-label="disabled switch" />
                {/* <Cascader.Panel options={options} onChange={onChange} disabled={disabled} /> */}
                <Cascader.Panel size="small" multiple options={person} onChange={onMultipleChange} disabled={disabled} />
                {/* <Cascader.Panel /> */}
            </Flex>
        </Box>
    );
};

const reportingOrderOptions = [
    {
        value: "A S M Mehedi Hasan Sad",
        label: "A S M Mehedi Hasan Sad",
        children: [
            { value: "1", label: "1st" },
            { value: "2", label: "2nd" },
            { value: "3", label: "3rd" },
            { value: "4", label: "4th" },
            { value: "5", label: "5th" },
        ],
    },
    {
        value: "Hafizur Rahaman",
        label: "Hafizur Rahaman",
        children: [
            { value: "1", label: "1st" },
            { value: "2", label: "2nd" },
            { value: "3", label: "3rd" },
            { value: "4", label: "4th" },
            { value: "5", label: "5th" },
        ],
    },
    {
        value: "Jubayer Liyakot",
        label: "Jubayer Liyakot",
        children: [
            { value: "1", label: "1st" },
            { value: "2", label: "2nd" },
            { value: "3", label: "3rd" },
            { value: "4", label: "4th" },
            { value: "5", label: "5th" },
        ],
    },
    {
        value: "Minhazul Azmir",
        label: "Minhazul Azmir",
        children: [
            { value: "1", label: "1st" },
            { value: "2", label: "2nd" },
            { value: "3", label: "3rd" },
            { value: "4", label: "4th" },
            { value: "5", label: "5th" },
        ],
    },
];

export const ReportingOrder = () => {
    const [disabled, setDisabled] = useState(false);
    // const onChange = (value) => {
    //     console.log(value);
    // };

    const [hierarchy, setHierarchy] = useState({});

    const onMultipleChange = (value) => {
        console.log(value);
        const aa = {};
        const fff = value.map((data_row) => {
            // data_row.length === 2 ?  Object.keys(aa).includes(data_row[-1])? aa[data_row[-1]]:  : null
            if (data_row.length === 2) {
                if (!Object.keys(aa).includes(data_row[1])) {
                    aa[data_row[1]] = [];
                }
                aa[data_row[1]].push(data_row[0]);
            }
        });

        console.log(">>", aa);
        setHierarchy(aa);
    };

    const nodeTemplate = (node) => {
        return (
            <div className="flex flex-col items-center">
                <img alt={node.label} src="https://primefaces.org/cdn/primereact/images/flag/flag_placeholder.png" className={`w-8 shadow-md flag flag-${node.data}`} />
                <div className="mt-3 font-medium text-lg">{node.label}</div>
            </div>
        );
    };

    return (
        <Box>
            <Box sx={{ width: "100%", display: "flex", flexDirection: "column", gap: "10px" }}>
                <PrimeReactProvider>
                    {/* <OrganizationChart value={myData001} /> */}
                    <div className="card overflow-x-auto">
                        <OrganizationChart value={myData001} nodeTemplate={nodeTemplate} />
                    </div>
                </PrimeReactProvider>
            </Box>

            <Box sx={{ width: "100%", display: "flex", flexDirection: "column", gap: "10px" }}>
                {Object.keys(hierarchy || {}).map((order) => {
                    return (
                        <Box sx={{ width: "100%", display: "flex", gap: "10px", justifyContent: "center" }}>
                            {hierarchy[order].map((name) => {
                                return (
                                    <Box sx={{ width: "350px" }}>
                                        <ProfileCardXS info={name} />
                                    </Box>
                                );
                            })}
                        </Box>
                    );
                })}
            </Box>
            <Flex vertical gap="small" align="flex-start">
                <Switch checked={disabled} checkedChildren="Enabled" unCheckedChildren="Disabled" onChange={setDisabled} aria-label="disabled switch" />
                {/* <Cascader.Panel options={options} onChange={onChange} disabled={disabled} /> */}
                <Cascader.Panel size="small" multiple options={reportingOrderOptions} onChange={onMultipleChange} disabled={disabled} />
                {/* <Cascader.Panel /> */}
            </Flex>
        </Box>
    );
};
