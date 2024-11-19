import { Box } from "@mui/system";
import React, { useState } from "react";
import { Cascader, Flex, Switch } from "antd";
import { ProfileCardXS } from "./ProfileCard";
import { OrganizationChart } from "primereact/organizationchart";
import { PrimeReactProvider } from "primereact/api";

const department_ = {
    d0001: {
        name: "Circuit and System Design",
        abb: "CSD",
        loc: {
            f0001: {
                location: "Dhaka",
                building: "Regnam",
                floor: "2nd-Floor",
                others: "North",
            },
            f0002: {
                location: "Dhaka",
                building: "Regnam",
                floor: "3rd-Floor",
                others: "North",
            },
        },
    },
    d0002: {
        name: "Synopsys ODC",
        abb: "Synopsys ODC",
        loc: {
            f0003: {
                location: "Dhaka",
                building: "Regnam",
                floor: "3rd-Floor",
                others: "",
            },
            f0004: {
                location: "Dhaka",
                building: "Reneta Cube",
                floor: "9th-Floor",
                others: "",
            },
            f0005: {
                location: "Dhaka",
                building: "Reneta Cube",
                floor: "10th-Floor",
                others: "",
            },
        },
    },
    d0003: {
        name: "AMD",
        abb: "AMD",
        loc: {
            f0006: {
                location: "Dhaka",
                building: "Regnam",
                floor: "5th-Floor",
                others: "South",
            },
            f0007: {
                location: "Dhaka",
                building: "Regnam",
                floor: "5th-Floor",
                others: "North",
            },
            f0008: {
                location: "Dhaka",
                building: "Regnam",
                floor: "3rd-Floor",
                others: "",
            },
        },
    },
};



const domain_ = {
    d001: { name: "IT-Security" },
    d002: { name: "IT-Repair" },
    d003: { name: "IT-New" },
};



const members_ = {
    210113: { name: "A S M Mehedi Hasan Sad" },
    210110: { name: "Hafizue Rahaman" },
    210115: { name: "Jubayer bin Liaykot" },
    210116: { name: "Abrar fahad" },
    210116: { name: "Enamul Hasan" },
};

const cascader_data = Object.keys(members_).map((empid) => {
    return {
        value: empid,
        label: members_[empid]["name"],
        children: Object.keys(domain_).map((domainIdx) => {
            return {
                value: domainIdx,
                label: domain_[domainIdx]["name"],
                children: Object.keys(department_).map((departmentIdx) => {
                    const floor_des = department_[departmentIdx]["loc"]
                    return {
                        value: departmentIdx,
                        label: department_[departmentIdx]["name"],
                        children: Object.keys(floor_des).map((locIdx) => {
                            return {
                                value: locIdx,
                                label: `${floor_des[locIdx]["floor"]} ${floor_des[locIdx]["others"]} ${floor_des[locIdx]["building"]} ${floor_des[locIdx]["location"]}`,
                            };
                        }),
                    };
                }),
            };
        }),
    };
});

console.log(cascader_data);

const cascader_data2 = Object.keys(members_).map((empid) => {
    return{
        value:empid,
        label: members_[empid]['name'],
        children: Array.from({ length: 5 }, (_, index) => {
            return{
                value: index+1,
                label: index+1,
            }
        })
    }
})


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
                <Cascader.Panel size="small" multiple options={cascader_data} onChange={onMultipleChange} disabled={disabled} />
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

export const ReportingOrder = (props) => {
    const {setReportingOrderData}  = props
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
        setReportingOrderData(aa) //* pass data to toplevel
    };

    return (
        <Box>
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
                <Cascader.Panel size="small" multiple options={cascader_data2} onChange={onMultipleChange} disabled={disabled} />
                {/* <Cascader.Panel /> */}
            </Flex>
        </Box>
    );
};
