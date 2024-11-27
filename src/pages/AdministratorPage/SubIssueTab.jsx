import { Box } from "@mui/material";
import { AutoComplete } from "antd";
import React, { useState } from "react";

const SubIssueTab = () => {
    return (
        <Box sx={{ width: "calc(100% - 10px)", height: "100%", margin: "0 0 10px 10px", display: "flex", justifyContent: "center", alignItems: "center", bgcolor: "white" }}>
            {/* <div>SubIssueTab</div> */}
            <MyTab />
        </Box>
    );
};

const MyTab = () => {
    const options = [
        { value: "1", label: "Saad", disabled: true },
        { value: "2", label: "Sad", disabled: true },
        { value: "3", label: "Sadad", disabled: true },
        { value: "4", label: "Sabab", disabled: true },
    ];

    const [searceAble, setSearceAble] = useState(options);
    const [choosedValue, setChoosedValue] = useState("");
    const [errorStatus, setErrorStatus] = useState("");

    return (
        <Box>
            <AutoComplete
                status={errorStatus}
                style={{
                    width: 200,
                }}
                options={searceAble}
                value={choosedValue}
                onSearch={(text) => {
                    const trimmedSearchVar = text.trim(); // Remove leading and trailing whitespace
                    if (trimmedSearchVar !== "") {
                        setSearceAble(options.filter((item) => item.label.toLowerCase().includes(trimmedSearchVar.toLowerCase())));
                        setErrorStatus(options.some((item) => item.label.toLowerCase() === trimmedSearchVar.toLowerCase()) ? "error" : "");
                    }
                }}
                onChange={(e) => {
                    setChoosedValue(e.target.value);
                }}
            />
        </Box>
    );
};

export default SubIssueTab;
