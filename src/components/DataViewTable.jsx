import React from "react";
import { Space, Table, Tag } from "antd";

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

// const data = [
//     {
//         key: "1",
//         name: "John Brown",
//         age: 32,
//         address: "New York No. 1 Lake Park",
//         phone: "+8801 778518304",
//         // tags: ["nice", "developer"],
//     },
//     {
//         key: "2",
//         name: "Jim Green",
//         age: 42,
//         address: "London No. 1 Lake Park",
//         phone: "+8801 778518304",
//         // tags: ["loser"],
//     },
//     {
//         key: "3",
//         name: "Joe Black",
//         age: 32,
//         address: "Sydney No. 1 Lake Park",
//         phone: "+8801 778518304",
//         // tags: ["cool", "teacher"],
//     },
// ];

// const ColSec = {
//     1: { title: "Name", width: "" },
//     2: { title: "Age", width: "100px" },
//     3: { title: "Address", width: "100px" },
//     4: { title: "Phone", width: "100px" },
// };

// console.log(columns);

const DataViewTable = (props) => {
    const { columns, data } = props;

    // const columns_structure = Object.keys(columns).map((index) => {
    //     const col_title = columns[index]["title"];
    //     const data_index = col_title.trim().toLowerCase().replace(/\s+/g, "_");
    //     const col_key = data_index;
    //     const col_width = columns[index]["width"];
    //     return {
    //         title: col_title,
    //         dataIndex: data_index,
    //         key: col_key,
    //         width: col_width,
    //     };
    // });

    // return <Table size="default" bordered pagination={false} columns={columns_structure} dataSource={data} />;
};
export default DataViewTable;





