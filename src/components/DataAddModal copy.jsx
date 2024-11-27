import React, { useState } from "react";
import { AutoComplete, Button, Input, Modal, Select } from "antd";
import { Box } from "@mui/material";
import { InfoLabel } from "@fluentui/react-components";

// const App = () => {
//     const [isModalOpen, setIsModalOpen] = useState(false);
//     const showModal = () => {
//         setIsModalOpen(true);
//     };
//     const handleOk = () => {
//         setIsModalOpen(false);
//     };
//     const handleCancel = () => {
//         setIsModalOpen(false);
//     };
//     return (
//         <>
//             <Button type="primary" onClick={showModal}>
//                 Open Modal
//             </Button>
//             <CustomModal />
//         </>
//     );
// };

{
    /* <InfoLabel
style={{ margin: "10px 0 5px 0" }}
// info={
//     <>
//         This is example information for an InfoLabel. <Link href="https://react.fluentui.dev">Learn more</Link>
//     </>
// }
>
{title}
</InfoLabel> */
}

const CustomInput = (props) => {
    const { placeholder, title, field_suggetions, field_suggetions_ignore, data_update_at, data_update_var } = props;
    const { newEntryInputData, setNewEntryInputData } = data_update_at; //* Main State to store data

    return (
        <Box sx={{ width: "100%" }}>
            {/* ///// */}
            {/* FIELD TITLE */}
            {title && (
                <Box sx={{ width: "100%", marginBottom: "2px" }}>
                    <InfoLabel>{title}</InfoLabel>
                </Box>
            )}

            {/* FIELD */}
            <Box sx={{ width: "100%" }}>
                <Input
                    style={{ width: "100%" }}
                    // allowClear
                    placeholder="Enter a unique name that is not suggested."
                    //  status={errorStatus}
                    value={newEntryInputData[[data_update_var]]}
                    onChange={(e) => {
                        setNewEntryInputData({ ...newEntryInputData, [data_update_var]: e.target.value });
                    }}
                />
            </Box>
        </Box>
    );
};

const CustomInputSuggetion = (props) => {
    const { placeholder, title, field_suggetions, field_suggetions_ignore, data_update_at, data_update_var } = props;
    const { newEntryInputData, setNewEntryInputData } = data_update_at; //* Main State to store data

    //* Process data to show at dropdown
    const [existingTagOptions, setExistingTagOptions] = useState(
        field_suggetions.map((data) => {
            return { ...data, disabled: field_suggetions_ignore };
        })
    );

    //* this is only for input
    const [existingTagList, setExistingTagList] = useState(field_suggetions.map((data) => data.label.toLowerCase()));
    const [errorStatus, setErrorStatus] = useState("");
    // const [newTagName, setNewTagName] = useState([]);

    return (
        <Box sx={{ width: "100%" }}>
            {console.log(field_suggetions, "*******************************************")}
            {/* ///// */}
            {/* FIELD TITLE */}
            {title && (
                <Box sx={{ width: "100%", marginBottom: "2px" }}>
                    <InfoLabel>{title}</InfoLabel>
                </Box>
            )}

            {/* FIELD */}
            <Box sx={{ width: "100%" }}>
                <AutoComplete
                    style={{ width: "100%" }}
                    // allowClear
                    showSearch
                    placeholder={placeholder ? placeholder : "Enter a unique name that is not suggested."}
                    // status={"error"}
                    status={errorStatus}
                    // value={newEntryInputData[[data_update_var]]}
                    optionFilterProp="label"
                    filterSort={(optionA, optionB) => (optionA?.label ?? "").toLowerCase().localeCompare((optionB?.label ?? "").toLowerCase())}
                    // options={existingTagOptions}
                    options={field_suggetions}
                    onChange={(value) => {
                        value = value === undefined ? "" : value;

                        console.log(value, "Domain===========[*]", existingTagList.includes(value.toLowerCase()));

                        // CHECK DUBLICATES
                        existingTagList.includes(value.toLowerCase()) ? setErrorStatus("error") : setErrorStatus("success");
                        setNewEntryInputData({ ...newEntryInputData, [data_update_var]: value }); //!update data

                        // FILTER BASED ON ENTRY
                        setExistingTagOptions(
                            existingTagList
                                .filter((item) => item.includes(value.toLowerCase()))
                                .map((tag_name) => {
                                    return { value: tag_name, label: tag_name, disabled: field_suggetions_ignore };
                                })
                        );
                    }}
                >
                    <Input />
                </AutoComplete>
            </Box>
        </Box>
    );
};

const CustomSelect = (props) => {
    const { placeholder, title, field_suggetions, field_suggetions_ignore, data_update_at, data_update_var } = props;
    const { newEntryInputData, setNewEntryInputData } = data_update_at; //* Main State to store data

    const [existingTagOptions, setExistingTagOptions] = useState(field_suggetions);

    //* this is only for input
    const [errorStatus, setErrorStatus] = useState("");

    return (
        <Box sx={{ width: "100%" }}>
            {/* ///// */}
            {/* FIELD TITLE */}
            {title && (
                <Box sx={{ width: "100%", marginBottom: "2px" }}>
                    <InfoLabel>{title}</InfoLabel>
                </Box>
            )}

            {/* FIELD */}
            <Box sx={{ width: "100%" }}>
                <Select
                    showSearch
                    allowClear
                    // mode="multiple"
                    placeholder="Acknowledged person"
                    // size="medium"
                    style={{ width: "100%" }}
                    optionFilterProp="label"
                    filterSort={(optionA, optionB) => (optionA?.label ?? "").toLowerCase().localeCompare((optionB?.label ?? "").toLowerCase())}
                    value={newEntryInputData[[data_update_var]]}
                    options={existingTagOptions}
                    onChange={(value, selectedObject) => {
                        setNewEntryInputData({ ...newEntryInputData, [data_update_var]: value });
                    }}

                    // disabled={loadings[0] ? true : false}
                />
            </Box>
        </Box>
    );
};

const CustomSelectMultiple = (props) => {
    const { placeholder, title, field_suggetions, field_suggetions_ignore, data_update_at, data_update_var } = props;
    const { newEntryInputData, setNewEntryInputData } = data_update_at; //* Main State to store data

    // const [existingTagOptions, setExistingTagOptions] = useState(field_suggetions);
    console.log(field_suggetions, "=======================================");

    //* this is only for input
    const [errorStatus, setErrorStatus] = useState("");

    return (
        <Box sx={{ width: "100%" }}>
            {/* ///// */}
            {/* FIELD TITLE */}
            {title && (
                <Box sx={{ width: "100%", marginBottom: "2px" }}>
                    <InfoLabel>{title}</InfoLabel>
                </Box>
            )}

            {/* FIELD */}
            <Box sx={{ width: "100%" }}>
                <Select
                    showSearch
                    allowClear
                    mode="multiple"
                    placeholder={placeholder}
                    // size="medium"
                    style={{ width: "100%" }}
                    optionFilterProp="label"
                    filterSort={(optionA, optionB) => (optionA?.label ?? "").toLowerCase().localeCompare((optionB?.label ?? "").toLowerCase())}
                    // value={newEntryInputData[[data_update_var]]}
                    // options={existingTagOptions}
                    options={field_suggetions}
                    onChange={(value, selectedObject) => {
                        console.log(value, "-----selectedval---------MAX");
                        setNewEntryInputData({ ...newEntryInputData, [data_update_var]: value });
                    }}

                    // disabled={loadings[0] ? true : false}
                />
            </Box>
        </Box>
    );
};

const fieldType = {
    Input: CustomInput,
    InputSuggetion: CustomInputSuggetion,
    Select: CustomSelect,
    SelectMultiple: CustomSelectMultiple,
};

export const CustomModal = (props) => {
    const { okayBtnLoading, modalBodyConfig, title, isModalOpen, handleOk, handleCancel } = props;
    const { onOkayLoading, setOnOkayLoading } = okayBtnLoading;

    console.log(JSON.stringify(modalBodyConfig), "\n------------------------------------------------------------|");

    const disabled_condition = Object.values(modalBodyConfig)
        .map((individualInput) => {
            if (["Select", "SelectMultiple"].includes(individualInput.field) && Array.isArray(individualInput.value_update_var) && individualInput.value_update_var.length === 0) {
                return true; // Empty list condition
            }
            if (["Input", "InputSuggetion"].includes(individualInput.field) && individualInput.value_update_var === "") {
                return true; // Empty string condition
            }
            return false;
        })
        .includes(true); // If any `true` exists, return true

    return (
        <Modal title={title} open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={null} maskClosable={false}>
            <Box style={{ width: "100%", display: "flex", flexDirection: "column", gpa: "10px" }}>
                {Object.keys(modalBodyConfig).map((key_name, index) => {
                    const CustomInputField = fieldType[modalBodyConfig[key_name]["field"]];
                    return (
                        <Box key={index} style={{ width: "100%", marginTop: index === 0 ? "" : "5px" }}>
                            <CustomInputField
                                key={index}
                                style={{
                                    margin: 0,
                                }}
                                field_suggetions={modalBodyConfig[key_name]["field_suggetions"]}
                                field_suggetions_ignore={modalBodyConfig[key_name]["field_suggetions_ignore"]}
                                data_update_at={modalBodyConfig[key_name]["data_update_at"]}
                                data_update_var={modalBodyConfig[key_name]["data_update_var"]}
                                // placeholder={modalBodyConfig[key_name]["placeholder"]}
                                title={modalBodyConfig[key_name]["title"]}
                            />
                        </Box>
                    );
                })}

                {/* MODAL ADD ITEM BUTTON */}
                <Box sx={{ width: "100%", display: "flex", justifyContent: "flex-end", marginTop: "20px" }}>
                    <Button
                        type="primary"
                        loading={onOkayLoading[0]}
                        onClick={() => {
                            setOnOkayLoading([1]);
                            handleOk();
                        }}
                        disabled={disabled_condition}
                    >
                        Add
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
};
