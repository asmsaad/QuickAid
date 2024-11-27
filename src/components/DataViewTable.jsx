import React from "react";
import { Button, Space, Table, Tag, Typography } from "antd";
import { Box } from "@mui/material";
import { PlusCircleOutlined, PlusOutlined } from "@ant-design/icons";
const { Text } = Typography;

// const columns = [
//     {
//         title: "Name",
//         dataIndex: "name",
//         key: "name",
//         // render: (text) => <a>{text}</a>,
//     },
//     {
//         title: "Age",
//         dataIndex: "age",
//         key: "age",
//     },
//     {
//         title: "Address",
//         dataIndex: "address",
//         key: "address",
//     },
//     {
//         title: "Tags",
//         key: "tags",
//         dataIndex: "tags",
//         render: (_, { tags }) => (
//             <>
//                 {tags.map((tag) => {
//                     let color = tag.length > 5 ? "geekblue" : "green";
//                     if (tag === "loser") {
//                         color = "volcano";
//                     }
//                     return (
//                         <Tag color={color} key={tag}>
//                             {tag.toUpperCase()}
//                         </Tag>
//                     );
//                 })}
//             </>
//         ),
//     },
//     {
//         title: "Action",
//         key: "action",
//         render: (_, record) => (
//             <Space size="middle">
//                 <a>Invite {record.name}</a>
//                 <a>Delete</a>
//             </Space>
//         ),
//     },
// ];

const tableData = [
    {
        key: "1",
        domain: "John Brown",
        age: 32,
        members: "New York No. 1 Lake Park",
        phone: "+8801 778518304",
        // tags: ["nice", "developer"],
    },
    {
        key: "2",
        domain: "Jim Green",
        age: 42,
        members: "London No. 1 Lake Park",
        phone: "+8801 778518304",
        // tags: ["loser"],
    },
    {
        key: "3",
        domain: "Joe Black",
        age: 32,
        members: "Sydney No. 1 Lake Park",
        phone: "+8801 778518304",
        // tags: ["cool", "teacher"],
    },
];

const columns = {
    1: { title: "Name", width: "" },
    2: { title: "Age", width: "100px" },
    3: { title: "Address", width: "100px" },
    4: { title: "Phone", width: "100px" },
};

// console.log(columns);
// const table_title = "Domain1";

const DataViewTable = (props) => {
    // const { columns, data, table_title } = props;
    // const { showModalOnAddBtnClick, columns, table_title } = props;
    const { showModalOnAddBtnClick, columns, tableData, table_title } = props;

    const columns_structure = Object.keys(columns).map((index) => {
        const col_title = columns[index]["title"];
        const data_index = col_title.trim().toLowerCase().replace(/\s+/g, "_");
        const col_key = data_index;
        const col_width = columns[index]["width"];
        return {
            title: col_title,
            dataIndex: data_index,
            key: col_key,
            width: col_width,
        };
    });

    const TableHeader = () => {
        return (
            <Box
                sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between", // Space between Text and Button
                    alignItems: "center", // Vertical alignment
                }}
            >
                <Box sx={{ flex: 1, display: "flex", justifyContent: "center" }}>
                    <Text strong style={{ fontSize: "16px" }}>
                        {/* <Text strong style={{ fontSize: "16px", margin: "0 0 0 32px" }}> */}
                        {table_title}
                    </Text>
                </Box>
                {showModalOnAddBtnClick && (
                    <Box sx={{ width: "fit-content" }}>
                        <Button color="default" variant="dashed" shape="circle" icon={<PlusOutlined />} onClick={showModalOnAddBtnClick} />
                    </Box>
                )}
            </Box>
        );
    };

    return (
        <Box>
            <Table style={{ width: "100%" }} size="default" title={() => TableHeader()} bordered pagination={false} columns={columns_structure} dataSource={tableData} />
        </Box>
    );
};
export default DataViewTable;
