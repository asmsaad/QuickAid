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

// const CustomInput = (props) => {
//     const { placeholder, title, field_suggetions, field_suggetions_ignore, data_update_at, data_update_var } = props;
//     const { newEntryInputData, setNewEntryInputData } = data_update_at; //* Main State to store data

//     return (
//         <Box sx={{ width: "100%" }}>
//             {/* ///// */}
//             {/* FIELD TITLE */}
//             {title && (
//                 <Box sx={{ width: "100%", marginBottom: "2px" }}>
//                     <InfoLabel>{title}</InfoLabel>
//                 </Box>
//             )}

//             {/* FIELD */}
//             <Box sx={{ width: "100%" }}>
//                 <Input
//                     style={{ width: "100%" }}
//                     // allowClear
//                     placeholder="Enter a unique name that is not suggested."
//                     //  status={errorStatus}
//                     value={newEntryInputData[[data_update_var]]}
//                     onChange={(e) => {
//                         setNewEntryInputData({ ...newEntryInputData, [data_update_var]: e.target.value });
//                     }}
//                 />
//             </Box>
//         </Box>
//     );
// };

// const CustomInputSuggetion = (props) => {
//     const { placeholder, title, field_suggetions, field_suggetions_ignore, data_update_at, data_update_var } = props;
//     const { newEntryInputData, setNewEntryInputData } = data_update_at; //* Main State to store data

//     //* Process data to show at dropdown
//     const [existingTagOptions, setExistingTagOptions] = useState(
//         field_suggetions.map((data) => {
//             return { ...data, disabled: field_suggetions_ignore };
//         })
//     );

//     //* this is only for input
//     const [existingTagList, setExistingTagList] = useState(field_suggetions.map((data) => data.label.toLowerCase()));
//     const [errorStatus, setErrorStatus] = useState("");
//     // const [newTagName, setNewTagName] = useState([]);

//     return (
//         <Box sx={{ width: "100%" }}>
//             {console.log(field_suggetions, "*******************************************")}
//             {/* ///// */}
//             {/* FIELD TITLE */}
//             {title && (
//                 <Box sx={{ width: "100%", marginBottom: "2px" }}>
//                     <InfoLabel>{title}</InfoLabel>
//                 </Box>
//             )}

//             {/* FIELD */}
//             <Box sx={{ width: "100%" }}>
//                 <AutoComplete
//                     style={{ width: "100%" }}
//                     // allowClear
//                     showSearch
//                     placeholder={placeholder ? placeholder : "Enter a unique name that is not suggested."}
//                     // status={"error"}
//                     status={errorStatus}
//                     // value={newEntryInputData[[data_update_var]]}
//                     optionFilterProp="label"
//                     filterSort={(optionA, optionB) => (optionA?.label ?? "").toLowerCase().localeCompare((optionB?.label ?? "").toLowerCase())}
//                     // options={existingTagOptions}
//                     options={field_suggetions}
//                     onChange={(value) => {
//                         value = value === undefined ? "" : value;

//                         console.log(value, "Domain===========[*]", existingTagList.includes(value.toLowerCase()));

//                         // CHECK DUBLICATES
//                         existingTagList.includes(value.toLowerCase()) ? setErrorStatus("error") : setErrorStatus("success");
//                         setNewEntryInputData({ ...newEntryInputData, [data_update_var]: value }); //!update data

//                         // FILTER BASED ON ENTRY
//                         setExistingTagOptions(
//                             existingTagList
//                                 .filter((item) => item.includes(value.toLowerCase()))
//                                 .map((tag_name) => {
//                                     return { value: tag_name, label: tag_name, disabled: field_suggetions_ignore };
//                                 })
//                         );
//                     }}
//                 >
//                     <Input />
//                 </AutoComplete>
//             </Box>
//         </Box>
//     );
// };

// const CustomSelect = (props) => {
//     const { placeholder, title, field_suggetions, field_suggetions_ignore, data_update_at, data_update_var } = props;
//     const { newEntryInputData, setNewEntryInputData } = data_update_at; //* Main State to store data

//     const [existingTagOptions, setExistingTagOptions] = useState(field_suggetions);

//     //* this is only for input
//     const [errorStatus, setErrorStatus] = useState("");

//     return (
//         <Box sx={{ width: "100%" }}>
//             {/* ///// */}
//             {/* FIELD TITLE */}
//             {title && (
//                 <Box sx={{ width: "100%", marginBottom: "2px" }}>
//                     <InfoLabel>{title}</InfoLabel>
//                 </Box>
//             )}

//             {/* FIELD */}
//             <Box sx={{ width: "100%" }}>
//                 <Select
//                     showSearch
//                     allowClear
//                     // mode="multiple"
//                     placeholder="Acknowledged person"
//                     // size="medium"
//                     style={{ width: "100%" }}
//                     optionFilterProp="label"
//                     filterSort={(optionA, optionB) => (optionA?.label ?? "").toLowerCase().localeCompare((optionB?.label ?? "").toLowerCase())}
//                     value={newEntryInputData[[data_update_var]]}
//                     options={existingTagOptions}
//                     onChange={(value, selectedObject) => {
//                         setNewEntryInputData({ ...newEntryInputData, [data_update_var]: value });
//                     }}

//                     // disabled={loadings[0] ? true : false}
//                 />
//             </Box>
//         </Box>
//     );
// };
const CustomInputSuggetion = (props) => {
    const { newEntryInputData, setNewEntryInputData, title, fieldType, placeholderText, ignoreSuggestions, suggestionsList, isFieldDisabled, disableDataVar, disableCheckDataField, dataVariable, dataStoragePath, getModalData, setModalData, disableOkayButtonIfEmpty } = props;

    const new_suggestionsList = suggestionsList.map((item) => ({ value: item.label, label: item.label }));

    const [choosedValue, setChoosedValue] = useState("");
    const [searchAbleValue, setsearchAbleValue] = useState(new_suggestionsList);
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
                <AutoComplete
                    style={{ width: "100%" }}
                    placeholder={placeholderText ? placeholderText : null}
                    status={errorStatus}
                    value={choosedValue}
                    options={searchAbleValue}
                    // onSearch={(text) => {
                    onChange={(value) => {
                        const trimmedSearchVar = value.trim(); // Remove leading and trailing whitespace
                        setChoosedValue(trimmedSearchVar);

                        setsearchAbleValue(new_suggestionsList.filter((item) => item.label.toLowerCase().includes(trimmedSearchVar.toLowerCase())));

                        new_suggestionsList.some((item) => item.label.toLowerCase() === trimmedSearchVar.toLowerCase()) && ignoreSuggestions
                            ? (() => {
                                  setErrorStatus("error");
                                  setNewEntryInputData({ ...newEntryInputData, [dataVariable]: "" });
                              })()
                            : (() => {
                                  setErrorStatus("");
                                  setNewEntryInputData({ ...newEntryInputData, [dataVariable]: trimmedSearchVar });
                              })();
                    }}
                    disabled={
                        isFieldDisabled
                            ? //
                              ["Select", "SelectMultiple"].includes(disableCheckDataField) && Array.isArray(newEntryInputData[disableDataVar]) && newEntryInputData[disableDataVar].length === 0
                                ? //
                                  true
                                : //
                                //
                                ["Input", "InputSuggetion", "SelectSingle"].includes(disableCheckDataField) && newEntryInputData[disableDataVar] === ""
                                ? //
                                  true
                                : //
                                  //
                                  false
                            : //
                              //
                              false
                    }
                />

                {/* <Input
                    style={{ width: "100%" }}
                    allowClear
                    placeholder={placeholderText ? placeholderText : null}
                    //  status={errorStatus}
                    value={choosedValue}
                    options={suggestionsList}
                    onChange={(e) => {
                        setChoosedValue(e.target.value);
                        setNewEntryInputData({ ...newEntryInputData, [dataVariable]: e.target.value });
                    }}
                    disabled={
                        isFieldDisabled
                            ? //
                              ["Select", "SelectMultiple"].includes(disableCheckDataField) && Array.isArray(newEntryInputData[disableDataVar]) && newEntryInputData[disableDataVar].length === 0
                                ? //
                                  true
                                : //
                                //
                                ["Input", "InputSuggetion", "SelectSingle"].includes(disableCheckDataField) && newEntryInputData[disableDataVar] === ""
                                ? //
                                  true
                                : //
                                  //
                                  false
                            : //
                              //
                              false
                    }
                /> */}
                {console.log("disableDataVar---->", ["Input", "InputSuggetion", "SelectSingle"].includes(disableCheckDataField), disableCheckDataField, newEntryInputData[disableDataVar], "-------MODAL DATA STORAGE << UPDATE")}
                {/* {console.log(["Input", "InputSuggetion", "SelectSingle"].includes(disableCheckDataField), disableCheckDataField, "-------MODAL DATA STORAGE << UPDATE")} */}
            </Box>
        </Box>
    );
};

////
////
////
////
////
////

////
////
////
////
////
////
const CustomInput = (props) => {
    const { newEntryInputData, setNewEntryInputData, title, fieldType, placeholderText, ignoreSuggestions, suggestionsList, isFieldDisabled, disableDataVar, disableCheckDataField, dataVariable, dataStoragePath, getModalData, setModalData, disableOkayButtonIfEmpty } = props;
    const [choosedValue, setChoosedValue] = useState(dataStoragePath);

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
                    allowClear
                    placeholder={placeholderText ? placeholderText : null}
                    //  status={errorStatus}
                    value={choosedValue}
                    options={suggestionsList}
                    onChange={(e) => {
                        setChoosedValue(e.target.value);
                        setNewEntryInputData({ ...newEntryInputData, [dataVariable]: e.target.value });
                    }}
                    onClear={() => {
                        console.log("MODAL DATA STORAGE << UPDATE", "--------------------------------------------->");
                    }}
                    disabled={
                        isFieldDisabled
                            ? //
                              ["Select", "SelectMultiple"].includes(disableCheckDataField) && Array.isArray(newEntryInputData[disableDataVar]) && newEntryInputData[disableDataVar].length === 0
                                ? //
                                  true
                                : //
                                //
                                ["Input", "InputSuggetion", "SelectSingle"].includes(disableCheckDataField) && newEntryInputData[disableDataVar] === ""
                                ? //
                                  true
                                : //
                                  //
                                  false
                            : //
                              //
                              false
                    }
                />
                {console.log("disableDataVar---->", ["Input", "InputSuggetion", "SelectSingle"].includes(disableCheckDataField), disableCheckDataField, newEntryInputData[disableDataVar], "-------MODAL DATA STORAGE << UPDATE")}
                {/* {console.log(["Input", "InputSuggetion", "SelectSingle"].includes(disableCheckDataField), disableCheckDataField, "-------MODAL DATA STORAGE << UPDATE")} */}
            </Box>
        </Box>
    );
};

////
////
////
////
////
////

const CustomSelectMultiple = (props) => {
    return <CustomSelect {...props} mode={"multiple"} />;
};
const CustomSelectSingle = (props) => {
    return <CustomSelect {...props} mode={false} />;
};

const CustomSelect = (props) => {
    const { mode } = props;
    const { newEntryInputData, setNewEntryInputData, title, fieldType, placeholderText, ignoreSuggestions, suggestionsList, isFieldDisabled, disableDataVar, disableCheckDataField, dataVariable, dataStoragePath, getModalData, setModalData, disableOkayButtonIfEmpty } = props;
    const [choosedValue, setChoosedValue] = useState(dataStoragePath);

    // //* this is only for input
    // const [errorStatus, setErrorStatus] = useState("");

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
                    {...(mode ? { mode: "multiple" } : {})}
                    // mode="multiple"
                    placeholder={placeholderText ? placeholderText : null}
                    showSearch
                    allowClear
                    size="medium"
                    style={{ width: "100%" }}
                    optionFilterProp="label"
                    filterSort={(optionA, optionB) => (optionA?.label ?? "").toLowerCase().localeCompare((optionB?.label ?? "").toLowerCase())}
                    value={choosedValue}
                    options={suggestionsList}
                    onChange={(value, selectedObject) => {
                        setChoosedValue(value);
                        setNewEntryInputData({ ...newEntryInputData, [dataVariable]: value });
                    }}
                    onClear={() => {
                        console.log("--------------------------------**MODAL DATA 1STORAGE << UPDATE");
                        if (!mode) {
                            console.log("++++++=+++++++++++++++++++++++++++++**MODAL DATA 1STORAGE << UPDATE");
                            setTimeout(() => {
                                setChoosedValue("");
                                setNewEntryInputData({ ...newEntryInputData, [dataVariable]: "" });
                            }, 500);
                        }
                    }}
                    disabled={
                        isFieldDisabled
                            ? //
                              ["Select", "SelectMultiple"].includes(disableCheckDataField) && Array.isArray(newEntryInputData[disableDataVar]) && newEntryInputData[disableDataVar].length === 0
                                ? //
                                  true
                                : //
                                //
                                ["Input", "InputSuggetion", "SelectSingle"].includes(disableCheckDataField) && newEntryInputData[disableDataVar] === ""
                                ? //
                                  true
                                : //
                                  //
                                  false
                            : //
                              //
                              false
                    }
                />
                {/* {console.log("disableDataVar---->", ["Input", "InputSuggetion", "SelectSingle"].includes(disableCheckDataField), disableCheckDataField, newEntryInputData[disableDataVar], "-------MODAL DATA STORAGE << UPDATE")} */}
            </Box>
        </Box>
    );
};

const SelectedComponent = {
    Input: CustomInput,
    InputSuggetion: CustomInputSuggetion,
    // Select: CustomSelect,
    SelectMultiple: CustomSelectMultiple,
    SelectSingle: CustomSelectSingle,
};

export const CustomModal = (props) => {
    const { newEntryInputData, setNewEntryInputData, okayBtnLoading, modalBodyConfig, title, isModalOpen, handleOk, handleCancel } = props;
    const { onOkayLoading, setOnOkayLoading } = okayBtnLoading;
    // const { fieldType, placeholderText, ignoreSuggestions, suggestionsList, isFieldDisabled, disableDataVar, dataVariable, dataStoragePath, getModalData, setModalData, disableOkayButtonIfEmpty } = modalBodyConfig;
    // const { newEntryInputData, setNewEntryInputData } = modalBodyConfig.data_update_at;

    // console.log(JSON.stringify(modalBodyConfig), "\n------------------------------------------------------------|");

    const disabled_condition = Object.keys(modalBodyConfig)
        .map((each_field) => {
            // console.log("MAXPRO----------", each_field, modalBodyConfig[each_field]["fieldType"], newEntryInputData[modalBodyConfig[each_field]["dataVariable"]]);
            if (["Select", "SelectMultiple"].includes(modalBodyConfig[each_field]["fieldType"]) && Array.isArray(newEntryInputData[modalBodyConfig[each_field]["dataVariable"]]) && newEntryInputData[modalBodyConfig[each_field]["dataVariable"]].length === 0) {
                return true; // Empty list condition
            }
            if (["Input", "InputSuggetion", "SelectSingle"].includes(modalBodyConfig[each_field]["fieldType"]) && newEntryInputData[modalBodyConfig[each_field]["dataVariable"]] === "") {
                return true; // Empty string condition
            }

            return false;
        })
        .includes(true); // If any `true` exists, return true

    return (
        <Modal title={title} open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={null} maskClosable={false}>
            <Box style={{ width: "100%", display: "flex", flexDirection: "column", gpa: "10px" }}>
                {Object.keys(modalBodyConfig).map((key_name, index) => {
                    const CustomInputField = SelectedComponent[modalBodyConfig[key_name]["fieldType"]];
                    return (
                        <Box key={index} style={{ width: "100%", marginTop: index === 0 ? "" : "5px" }}>
                            <CustomInputField key={index} {...modalBodyConfig[key_name]} newEntryInputData={newEntryInputData} setNewEntryInputData={setNewEntryInputData} />
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
