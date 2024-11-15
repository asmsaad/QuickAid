import { Box } from "@mui/system";
import React, { useState } from "react";
import { Cascader, Flex, Switch } from "antd";

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
            { value: "1st", label: "1st" },
            { value: "2nd", label: "2nd" },
            { value: "3rd", label: "3rd" },
            { value: "4th", label: "4th" },
            { value: "5th", label: "5th" },
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
            { value: "1st", label: "1st" },
            { value: "2nd", label: "2nd" },
            { value: "3rd", label: "3rd" },
            { value: "4th", label: "4th" },
            { value: "5th", label: "5th" },
        ],
    },
    {
        value: "Hafizur Rahaman",
        label: "Hafizur Rahaman",
        children: [
            { value: "1st", label: "1st" },
            { value: "2nd", label: "2nd" },
            { value: "3rd", label: "3rd" },
            { value: "4th", label: "4th" },
            { value: "5th", label: "5th" },
        ],
    },
    {
        value: "Jubayer Liyakot",
        label: "Jubayer Liyakot",
        children: [
            { value: "1st", label: "1st" },
            { value: "2nd", label: "2nd" },
            { value: "3rd", label: "3rd" },
            { value: "4th", label: "4th" },
            { value: "5th", label: "5th" },
        ],
    },
    {
        value: "Minhazul Azmir",
        label: "Minhazul Azmir",
        children: [
            { value: "1st", label: "1st" },
            { value: "2nd", label: "2nd" },
            { value: "3rd", label: "3rd" },
            { value: "4th", label: "4th" },
            { value: "5th", label: "5th" },
        ],
    },
];

export const ReportingOrder = () => {
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
                <Cascader.Panel size="small" multiple options={reportingOrderOptions} onChange={onMultipleChange} disabled={disabled} />
                {/* <Cascader.Panel /> */}
            </Flex>
        </Box>
    );
};
