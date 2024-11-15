import { InfoCircleTwoTone, PoweroffOutlined } from "@ant-design/icons";
import { Box } from "@mui/material";
import { Button, Card, Popover, Select, Typography } from "antd";
import TextArea from "antd/es/input/TextArea";
import React, { useEffect, useState } from "react";
import { ProfileCard } from "../components/ProfileCard";

const { Text } = Typography;

const domainOptions = [
    {
        value: "it",
        label: "IT",
    },
    {
        value: "hr",
        label: "HR",
    },
    {
        value: "facility",
        label: "Facility",
    },
];

// status={createProjectFormStatusInfo.project_contributors}




const FormPage = () => {



    return (

        <Box sx={{width:'100%',height:'100%', display:'flex', alignItems:{xs:'flex-start', md:'center'}, justifyContent:'center'}}>

            <IssueForm />

        </Box>

    );
};


const initialvalue = {
    domain : {},
    services : {},
    note: "",
}



const IssueForm = ()=>{
    const [selectedData , setSelectedData] = useState(initialvalue)
    const [loadings, setLoadings] = useState([]);


    useEffect(()=>{
        console.log(selectedData)
    },[selectedData])

    return(
        <Box sx={{ width: `calc(100% - 10px)`, maxWidth:'420px', marginTop:{xs:'20px', md:'0'}}}>

        <Card
            title="Submit Your Request !"
            bordered={true}
            type="inner"
            style={{
            width: '100%',
            }}
        >
            <TooltipPopover title="Submit for"  display_info={tooltips.current_week} top_margin={"-5px"}/>
            <ProfileCard />

            <TooltipPopover title="Manager" display_info={tooltips.current_week} />
            <Select placeholder="Domain" showSearch allowClear size="medium" style={{ width: "100%" }} optionFilterProp="label" filterSort={(optionA, optionB) => (optionA?.label ?? "").toLowerCase().localeCompare((optionB?.label ?? "").toLowerCase())} value={Object.keys(selectedData.domain).length > 0 ? selectedData.domain.value : ""} onChange={(value, selectedObject) => { setSelectedData({...selectedData, domain:selectedObject ? selectedObject : {}})} } options={domainOptions} />
            
            <TooltipPopover title="Acknowledge" display_info={tooltips.current_week} />
            <Select placeholder="Domain" showSearch allowClear size="medium" style={{ width: "100%" }} optionFilterProp="label" filterSort={(optionA, optionB) => (optionA?.label ?? "").toLowerCase().localeCompare((optionB?.label ?? "").toLowerCase())} value={Object.keys(selectedData.domain).length > 0 ? selectedData.domain.value : ""} onChange={(value, selectedObject) => { setSelectedData({...selectedData, domain:selectedObject ? selectedObject : {}})} } options={domainOptions} />
            
            <TooltipPopover title="Domain" display_info={tooltips.current_week} />
            <Select placeholder="Domain" showSearch allowClear size="medium" style={{ width: "100%" }} optionFilterProp="label" filterSort={(optionA, optionB) => (optionA?.label ?? "").toLowerCase().localeCompare((optionB?.label ?? "").toLowerCase())} value={Object.keys(selectedData.domain).length > 0 ? selectedData.domain.value : ""} onChange={(value, selectedObject) => { setSelectedData({...selectedData, domain:selectedObject ? selectedObject : {}})} } options={domainOptions} />

            <TooltipPopover title="Sevices" display_info={tooltips.current_week} />
            <Select placeholder="Domain" showSearch allowClear size="medium" style={{ width: "100%" }} optionFilterProp="label" filterSort={(optionA, optionB) => (optionA?.label ?? "").toLowerCase().localeCompare((optionB?.label ?? "").toLowerCase())} value={Object.keys(selectedData.domain).length > 0 ? selectedData.services.value : ""} onChange={(value, selectedObject) => { setSelectedData({...selectedData, services: selectedObject ? selectedObject : {}})} } disabled={Object.keys(selectedData.domain).length === 0} options={domainOptions} />

            <TooltipPopover title="Urgency" display_info={tooltips.current_week} />
            <Select placeholder="Domain" showSearch allowClear size="medium" style={{ width: "100%" }} optionFilterProp="label" filterSort={(optionA, optionB) => (optionA?.label ?? "").toLowerCase().localeCompare((optionB?.label ?? "").toLowerCase())} value={Object.keys(selectedData.domain).length > 0 ? selectedData.domain.value : ""} onChange={(value, selectedObject) => { setSelectedData({...selectedData, domain:selectedObject ? selectedObject : {}})} } options={domainOptions} />
            
            <TooltipPopover title="Note" display_info={tooltips.current_week} />
            <TextArea size="medium" showCount maxLength={1024} rows={3} value={selectedData.note} onChange={(e) => setSelectedData({ ...selectedData, note: e.target.value })} disabled={selectedData.services.value ? false : true} />

            <Box sx={{display:'flex', justifyContent:'center'}}><Button style={{ marginTop: '15px' }} type="primary"  loading={loadings[0]} onClick={() => {setLoadings([true]); setTimeout(() => setLoadings([false]), 3000)}}>Submit</Button></Box>


        </Card>

        
    </Box> 
    )
}



/**
 * Displays an info icon with a popover containing additional information next to a label in a submission form.
 *
 * @param {object} props - The component props.
 * @param {string} props.title - The title text displayed next to the info icon.
 * @param {string} props.display_info - The information displayed in the popover when the info icon is hovered over.
 * @returns {JSX.Element} The rendered tooltip component with the info icon and title.
 */
const TooltipPopover = ({ title, display_info , top_margin="10px"}) => {
    return (
        <Box sx={{ margin: `${top_margin} 0 5px 0` }}>
            <div>
                <Text strong>{title}</Text>
                <span style={{ marginLeft: "5px" }}>
                    {/* Popover with info icon. When hovered, it shows the content provided in display_info */}
                    <Popover placement="topLeft" content={display_info}>
                        <InfoCircleTwoTone />
                    </Popover>
                </span>
            </div>
        </Box>
    );
};

const tooltips = {
    submit_for: () => <div>Select the time frame during which the task was completed.</div>,

    project_name: () => (
        <>
            <div>Select the project name for which you want to update.</div>
            <div>Every project update will be provided separately.</div>
            <Text type="secondary">If you do not get the project name, contact your supervisor to add you to the project.</Text>
        </>
    ),

    time: () => (
        <>
            <div> Input the approximate time spent completing the task for this submission in</div>
            <div>hours only, using fractions up to 2 digits if necessary (e.g., 5.5 means five</div>
            <div> and a half hours).</div>
            <Text type="secondary">Example: 12.5, 15 </Text>
        </>
    ),

    task_category: () => (
        <>
            <div>Tagging Guidelines</div>
            <div>- Carefully select topics related to the task description.</div>
            <div>- Use tags minimally; only apply a tag if the task description highly aligns with that tag.</div>
            <div>- Avoid excessive tagging. (Standard 1-3)</div>
        </>
    ),

    current_week: () => (
        <>
            <div>Provide a brief summary of the work done this week. Use clear, concise descriptions.</div>
            <div>Example:</div>
            <div>- Completed TSPC DFF design with QA (DRC, LVS).</div>
            <div>- Learned Python: loops, conditions, lambdas.</div>
        </>
    ),

    next_week: () => (
        <>
            <div>Provide a brief summary of the work I will do next week. Use clear, concise descriptions.</div>
            <div>Example:</div>
            <div>- Will do TSPC vs Normal DFF QA check (Hold time, Setup time).</div>
            <div>- Will learn Python: classes, polymorphism.</div>
        </>
    ),
};

export default FormPage;
