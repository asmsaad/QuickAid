import React from "react";

const test = () => {
    return (
        <Select
            mode="multiple"
            placeholder="Domain"
            showSearch
            allowClear
            size="medium"
            style={{ width: "100%" }}
            optionFilterProp="label"
            filterSort={(optionA, optionB) => (optionA?.label ?? "").toLowerCase().localeCompare((optionB?.label ?? "").toLowerCase())}
            value={selectedData.acknowledged_person}
            onChange={(value, selectedObject) => {
                setSelectedData({ ...selectedData, acknowledged_person: value ? value : [] });
            }}
            // options={Object.keys(data_getAllEmployee?.data || {}).map((empid) => {
            //     return { value: empid, label: data_getAllEmployee?.data[empid]["name"] + ` (${empid})` };
            // })}
            
        />
    );
};

export default test;
