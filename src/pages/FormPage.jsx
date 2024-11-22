import { InfoCircleTwoTone, PoweroffOutlined } from "@ant-design/icons";
import { Box } from "@mui/material";
import { Alert, Button, Card, Popover, Select, Skeleton, Typography } from "antd";
import TextArea from "antd/es/input/TextArea";
import React, { useEffect, useState } from "react";
import { ProfileCardXL } from "../components/ProfileCard";


//*---------------------------------------------------------------------
import { useQuery } from "react-query"; //* React Query                 |
import axios from "axios"; //* React Query                              |
import { getAPI } from "../apis/apis"; //*                              |
import { getLoginUserID } from "../authentication/localStorage"; //*    |
import { logPrint } from "../authentication/logPrint"; //*              |
import { getCookie } from "../utility"; //*                             |
//*---------------------------------------------------------------------


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
    requested_by: "",
    location: "",
    desk_number: "",
    acknowledged_person:[],
    manager:[],
    issue_category : undefined ,
    issue_subCategory : undefined ,
    urgency : undefined ,
    note: "",
}



const IssueForm = ()=>{
    const [selectedData , setSelectedData] = useState(initialvalue)
    const [loadings, setLoadings] = useState([]);


    const [sucessfullMessage,setSucessfullMessage] = useState(undefined)


    // const a = {    
    //     requested_by: selectedData.requested_by,
    //     location: selectedData.location,
    //     desk_number: selectedData.desk_number,
    //     managers : selectedData.manager,
    //     acknowledge: selectedData.acknowledged_person,
    //     sub_domain: selectedData.issue_category,
    //     service: selectedData.issue_subCategory,
    //     urgency: selectedData.urgency,
    //     note: selectedData.note,
    // }



    





//Todo[QUEARY] Get User info by login user empid
    //*API Setup
    const fetchUserData = () => {
        return axios.post(getAPI("get-user-info-by-empid"), { empid: getLoginUserID() }, { headers: { "Content-Type": "application/json", "X-CSRFToken": getCookie("csrftoken") } });
    };

    //*Query Callback
    const {
        isLoading: isLoading_getUserData,
        data: data_getUserData,
        isError: isError_getUserData,
        error: error_getUserData,
        isFetching: isFetching_getUserData,
        refetch: refetch_getUserData,
    } = useQuery("get-user-info-by-empid-UNIQUE-2", fetchUserData, {
        enabled: true,
    });

    //*Query Response Actions
    useEffect(() => {
        if (isLoading_getUserData) {
            logPrint("🔍   getUserData  ➤  🔄");
        } else if (data_getUserData?.data) {
            logPrint("🔍   getUserData  ➤  🟢", data_getUserData?.data);
            setSelectedData({...selectedData, requested_by:getLoginUserID(), location: data_getUserData?.data?.location?.location_id, desk_number:data_getUserData?.data?.location?.desk_number})
        } else if (isError_getUserData) {
            logPrint("🔍   getUserData  ➤  ⚠️", [error_getUserData?.message, error_getUserData?.response.data]);
        }
    }, [isLoading_getUserData, data_getUserData, isError_getUserData, error_getUserData]);





//Todo[QUEARY] Get Managers By User
    //*API Setup
    const fetchManagersByUser = () => {
        return axios.post(getAPI("get-managers-by-empid"), { empid: getLoginUserID() }, { headers: { "Content-Type": "application/json", "X-CSRFToken": getCookie("csrftoken") } });
    };

    //*Query Callback
    const {
        isLoading: isLoading_managersByEmpID,
        data: data_managersByEmpID,
        isError: isError_managersByEmpID,
        error: error_managersByEmpID,
        isFetching: isFetching_managersByEmpID,
        refetch: refetch_managersByEmpID,
    } = useQuery("get-managers-by-empid-UNIQUE-1", fetchManagersByUser, {
        enabled: true,
    });

    //*Query Response Actions
    useEffect(() => {
        if (isLoading_managersByEmpID) {
            logPrint("🔍   managersByEmpID  ➤  🔄");
        } else if (data_managersByEmpID?.data) {
            logPrint("🔍   managersByEmpID  ➤  🟢", data_managersByEmpID?.data);  
            setSelectedData({...selectedData, manager : Object.keys(data_managersByEmpID?.data || {}) .map((empid) => empid)})  //*Added manager to the useState
        } else if (isError_managersByEmpID) {
            logPrint("🔍   managersByEmpID  ➤  ⚠️", [error_managersByEmpID?.message, error_managersByEmpID?.response.data]);
        }
    }, [isLoading_managersByEmpID, data_managersByEmpID, isError_managersByEmpID, error_managersByEmpID]);



    








    //Todo[QUEARY] Get all Employee for Acknowledged person
    //*API Setup
    const fetchAllEmployee = () => {
        return axios.post(getAPI("get-all-employee-info"), { empid: getLoginUserID() }, { headers: { "Content-Type": "application/json", "X-CSRFToken": getCookie("csrftoken") } });
    };

    //*Query Callback
    const {
        isLoading: isLoading_getAllEmployee,
        data: data_getAllEmployee,
        isError: isError_getAllEmployee,
        error: error_getAllEmployee,
        isFetching: isFetching_getAllEmployee,
        refetch: refetch_getAllEmployee,
    } = useQuery("get-all-employee-info-UNIQUE-1", fetchAllEmployee, {
        enabled: true,
    });

    //*Query Response Actions
    useEffect(() => {
        if (isLoading_getAllEmployee) {
            logPrint("🔍   getAllEmployee  ➤  🔄");
        } else if (data_getAllEmployee?.data) {
            logPrint("🔍   getAllEmployee  ➤  🟢", data_getAllEmployee?.data);
        } else if (isError_getAllEmployee) {
            logPrint("🔍   getAllEmployee  ➤  ⚠️", [error_getAllEmployee?.message, error_getAllEmployee?.response.data]);
        }
    }, [isLoading_getAllEmployee, data_getAllEmployee, isError_getAllEmployee, error_getAllEmployee]);



    //Todo[QUEARY] Get all Sub-Domain 
    //*API Setup
    const fetchAllSubDomain = () => {
        return axios.post(getAPI("get-all-sub-domain"), { empid: getLoginUserID() }, { headers: { "Content-Type": "application/json", "X-CSRFToken": getCookie("csrftoken") } });
    };

    //*Query Callback
    const {
        isLoading: isLoading_getAllSubDomain,
        data: data_getAllSubDomain,
        isError: isError_getAllSubDomain,
        error: error_getAllSubDomain,
        isFetching: isFetching_getAllSubDomain,
        refetch: refetch_getAllSubDomain,
    } = useQuery("get-all-sub-domain-UNIQUE-1", fetchAllSubDomain, {
        enabled: true,
    });

    //*Query Response Actions
    useEffect(() => {
        if (isLoading_getAllSubDomain) {
            logPrint("🔍   getAllSubDomain  ➤  🔄");
        } else if (data_getAllSubDomain?.data) {
            logPrint("🔍   getAllSubDomain  ➤  🟢", data_getAllSubDomain?.data);
        } else if (isError_getAllSubDomain) {
            logPrint("🔍   getAllSubDomain  ➤  ⚠️", [error_getAllSubDomain?.message, error_getAllSubDomain?.response.data]);
        }
    }, [isLoading_getAllSubDomain, data_getAllSubDomain, isError_getAllSubDomain, error_getAllSubDomain]);




    //Todo[QUEARY] Get all Services/Issue
    //*API Setup
    const fetchAllIssueUnderSelectedSubDomain = () => {
        return axios.post(getAPI("get-all-service"), { empid: getLoginUserID(), subdomain:selectedData.issue_category }, { headers: { "Content-Type": "application/json", "X-CSRFToken": getCookie("csrftoken") } });
    };

    //*Query Callback
    const {
        isLoading: isLoading_getAllIssueUnderSelectedSubDomain,
        data: data_getAllIssueUnderSelectedSubDomain,
        isError: isError_getAllIssueUnderSelectedSubDomain,
        error: error_getAllIssueUnderSelectedSubDomain,
        isFetching: isFetching_getAllIssueUnderSelectedSubDomain,
        refetch: refetch_getAllIssueUnderSelectedSubDomain,
    } = useQuery("get-all-service-UNIQUE-1", fetchAllIssueUnderSelectedSubDomain, {
        enabled: false,
    });

    //*Query Response Actions
    useEffect(() => {
        if (isLoading_getAllIssueUnderSelectedSubDomain) {
            logPrint("🔍   getAllIssueUnderSelectedSubDomain  ➤  🔄");
        } else if (data_getAllIssueUnderSelectedSubDomain?.data) {
            logPrint("🔍   getAllIssueUnderSelectedSubDomain  ➤  🟢", data_getAllIssueUnderSelectedSubDomain?.data);
        } else if (isError_getAllIssueUnderSelectedSubDomain) {
            logPrint("🔍   getAllIssueUnderSelectedSubDomain  ➤  ⚠️", [error_getAllIssueUnderSelectedSubDomain?.message, error_getAllIssueUnderSelectedSubDomain?.response.data]);
        }
    }, [isLoading_getAllIssueUnderSelectedSubDomain, data_getAllIssueUnderSelectedSubDomain, isError_getAllIssueUnderSelectedSubDomain, error_getAllIssueUnderSelectedSubDomain]);



//Todo[QUEARY] Get all Urgency name
    //*API Setup
    const fetchAllUrgencyName = () => {
        return axios.post(getAPI("get-all-urgency"), { empid: getLoginUserID() }, { headers: { "Content-Type": "application/json", "X-CSRFToken": getCookie("csrftoken") } });
    };

    //*Query Callback
    const {
        isLoading: isLoading_getAllUrgencyName,
        data: data_getAllUrgencyName,
        isError: isError_getAllUrgencyName,
        error: error_getAllUrgencyName,
        isFetching: isFetching_getAllUrgencyName,
        refetch: refetch_getAllUrgencyName,
    } = useQuery("get-all-urgency-UNIQUE-1", fetchAllUrgencyName, {
        enabled: true,
    });

    //*Query Response Actions
    useEffect(() => {
        if (isLoading_getAllUrgencyName) {
            logPrint("🔍   getAllUrgencyName  ➤  🔄");
        } else if (data_getAllUrgencyName?.data) {
            logPrint("🔍   getAllUrgencyName  ➤  🟢", data_getAllUrgencyName?.data);
        } else if (isError_getAllUrgencyName) {
            logPrint("🔍   getAllUrgencyName  ➤  ⚠️", [error_getAllUrgencyName?.message, error_getAllUrgencyName?.response.data]);
        }
    }, [isLoading_getAllUrgencyName, data_getAllUrgencyName, isError_getAllUrgencyName, error_getAllUrgencyName]);

    
   


 

    //Todo[QUEARY] Submit Request for the Issue
    //*API Setup
    const fetchCreateNewRequest = () => {
        return axios.post(getAPI("create-new-request"), 
        { 
            requested_by: selectedData.requested_by,
            location: selectedData.location,
            desk_number: selectedData.desk_number,
            managers : selectedData.manager,
            acknowledge: selectedData.acknowledged_person,
            sub_domain: selectedData.issue_category,
            service: selectedData.issue_subCategory,
            urgency: selectedData.urgency,
            note: selectedData.note,
            departments: selectedData.departments,

        }, { headers: { "Content-Type": "application/json", "X-CSRFToken": getCookie("csrftoken") } });
    };

    //*Query Callback
    const {
        isLoading: isLoading_createNewRequest,
        data: data_createNewRequest,
        isError: isError_createNewRequest,
        error: error_createNewRequest,
        isFetching: isFetching_createNewRequest,
        refetch: refetch_createNewRequest,
    } = useQuery("create-new-request-UNIQUE-1", fetchCreateNewRequest, {
        enabled: false,
    });

    //*Query Response Actions
    useEffect(() => {
        if (isLoading_createNewRequest) {
            logPrint("🔍   createNewRequest  ➤  🔄");
        } else if (data_createNewRequest?.data) {
            logPrint("🔍   createNewRequest  ➤  🟢", data_createNewRequest?.data);
            setTimeout(() =>{ 
                setSelectedData(initialvalue)
                setSucessfullMessage(true)
                setLoadings([false])
            }, 1500) //* Stop Reloading
        } else if (isError_createNewRequest) {
            logPrint("🔍   createNewRequest  ➤  ⚠️", [error_createNewRequest?.message, error_createNewRequest?.response.data]);
        }
    }, [isLoading_createNewRequest, data_createNewRequest, isError_createNewRequest, error_createNewRequest]);






    useEffect(()=>{
        console.log(selectedData,'***********')
    },[selectedData])




    useEffect(()=>{
       if (sucessfullMessage){
        setTimeout(()=>{
            setSucessfullMessage(undefined)
        },3000)
       }
    },[sucessfullMessage])


    // Clear selected sub issue_subCategory if change Issue
    useEffect(()=>{
        if (selectedData.issue_category){
            setSelectedData({...selectedData, issue_subCategory : undefined })
            console.log(selectedData.issue_category,'=====***')
            refetch_getAllIssueUnderSelectedSubDomain()
        }
       
    },[selectedData.issue_category])




    // useEffect(()=>{
    //     if (data_managersByEmpID) {
    //         setSelectedData({...selectedData, manager : Object.keys(data_managersByEmpID?.data || {}) .map((empid) => empid)})  //*Added manager to the useState
    //     }
    // },[ data_managersByEmpID])


    // useEffect(()=>{
    //     if (data_getUserData) {
    //         setSelectedData({...selectedData, requested_by:getLoginUserID(), location: data_getUserData?.data?.location?.location_id, desk_number:data_getUserData?.data?.location?.desk_number})  
    //     }         
    // },[data_getUserData])

    useEffect(()=>{
       
            setSelectedData({...selectedData, requested_by:getLoginUserID(), departments:Object.keys(data_getUserData?.data.department || []), location: data_getUserData?.data?.location?.location_id, desk_number:data_getUserData?.data?.location?.desk_number , manager : Object.keys(data_managersByEmpID?.data || {}) .map((empid) => empid)})  
             
    },[data_getUserData, data_managersByEmpID])


    return(
        <Box sx={{ width: `calc(100% - 10px)`, maxWidth:'420px', marginTop:{xs:'20px', md:'0'}}}>

        {sucessfullMessage &&
        
         <Alert
            message="Issue submitted successfully."
            description="Your submitted issue can be tracked from history."
            type="success"
            showIcon
            style={{margin:"10px 0 15px 0"}}
            />
        
        }
       

        <Card title="Submit Your Request !" bordered={true} type="inner" style={{ width: '100%', margin:"20px 0" }} >
            <TooltipPopover title="Submit for"  top_margin={"-5px"}/>
            <ProfileCardXL empid={getLoginUserID()}/>

            <TooltipPopover title="Manager" />
            {isLoading_managersByEmpID ? <Skeleton.Input block={true} active={true} size={"default"} /> : <Select mode="multiple" placeholder="Domain" showSearch allowClear size="medium" style={{ width: "100%" }} optionFilterProp="label" filterSort={(optionA, optionB) => (optionA?.label ?? "").toLowerCase().localeCompare((optionB?.label ?? "").toLowerCase())} onChange={(value, selectedObject) => { setSelectedData({...selectedData, manager: value ? value : [] })} } value={Object.keys(data_managersByEmpID?.data || {}).map((empid) => empid)} options={Object.keys(data_managersByEmpID?.data || {}).map((empid) => { return {value:empid, label:data_managersByEmpID?.data[empid]+ ` (${empid})`} })} disabled/> }
      
            
           
            
            
            
            <TooltipPopover title="Acknowledged person" display_info={tooltips.acknowledged_person} />
            {isLoading_getAllEmployee ? <Skeleton.Input block={true} active={true} size={"default"} /> : <Select mode="multiple" placeholder="Acknowledged person" showSearch allowClear size="medium" style={{ width: "100%" }} optionFilterProp="label" filterSort={(optionA, optionB) => (optionA?.label ?? "").toLowerCase().localeCompare((optionB?.label ?? "").toLowerCase())} value={selectedData.acknowledged_person || []} onChange={(value, selectedObject) => { setSelectedData({...selectedData, acknowledged_person: value ? value : [] })} } options={Object.keys(data_getAllEmployee?.data || {}).map((empid) => { return {value:empid, label:data_getAllEmployee?.data[empid]["name"]+ ` (${empid})`} })} disabled={loadings[0] ? true : false}/> }
            
            <TooltipPopover title="Issue Category" display_info={tooltips.issue_category} />
            {isLoading_getAllSubDomain ? <Skeleton.Input block={true} active={true} size={"default"} /> : <Select  placeholder="Issue Category" showSearch allowClear size="medium" style={{ width: "100%" }} optionFilterProp="label" filterSort={(optionA, optionB) => (optionA?.label ?? "").toLowerCase().localeCompare((optionB?.label ?? "").toLowerCase())} value={selectedData.issue_category} onChange={(value, selectedObject) => { setSelectedData({...selectedData, issue_category: value ? value : undefined })} } options={Object.keys(data_getAllSubDomain?.data || {}).map((sub_domain_idx) => { return {value:sub_domain_idx, label:data_getAllSubDomain?.data[sub_domain_idx]} })} disabled={loadings[0] ? true : false} /> }

            <TooltipPopover title="Issue Subcategory" display_info={tooltips.issue_subCategory} />
            {isLoading_getAllIssueUnderSelectedSubDomain ? <Skeleton.Input block={true} active={true} size={"default"} /> : <Select  placeholder="Issue Subcategory" showSearch allowClear size="medium" style={{ width: "100%" }} optionFilterProp="label" filterSort={(optionA, optionB) => (optionA?.label ?? "").toLowerCase().localeCompare((optionB?.label ?? "").toLowerCase())} value={selectedData.issue_subCategory} onChange={(value, selectedObject) => { setSelectedData({...selectedData, issue_subCategory: value ? value : undefined })} } options={Object.keys(data_getAllIssueUnderSelectedSubDomain?.data || {}).map((issue_name_idx) => { return {value:issue_name_idx, label:data_getAllIssueUnderSelectedSubDomain?.data[issue_name_idx]} })}  disabled={selectedData.issue_category ? loadings[0] ? true : false : true} /> }

            <TooltipPopover title="Urgency" display_info={tooltips.urgency} />
            {isLoading_getAllUrgencyName ? <Skeleton.Input block={true} active={true} size={"default"} /> : <Select  placeholder="Urgency" showSearch allowClear size="medium" style={{ width: "100%" }} optionFilterProp="label" filterSort={(optionA, optionB) => (optionA?.label ?? "").toLowerCase().localeCompare((optionB?.label ?? "").toLowerCase())} value={selectedData.urgency} onChange={(value, selectedObject) => { setSelectedData({...selectedData, urgency: value ? value : undefined })} } options={Object.keys(data_getAllUrgencyName?.data || {}).map((urgency_idx) => { return {value:urgency_idx, label:data_getAllUrgencyName?.data[urgency_idx]} })} disabled={loadings[0] ? true : false}/> }
            
            <TooltipPopover title="Note" display_info={tooltips.note} />
            <TextArea size="medium" showCount maxLength={1024} rows={3} value={selectedData.note} onChange={(e) => setSelectedData({ ...selectedData, note: e.target.value })} disabled={selectedData.issue_subCategory ? loadings[0] ? true : false : true} />

           
            <Box sx={{display:'flex', justifyContent:'center'}}><Button style={{ marginTop: '15px' }} type="primary"  loading={loadings[0]} onClick={() => {setLoadings([true]); refetch_createNewRequest(); }} disabled={loadings[0] ? true : false} >Submit</Button></Box>


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

                    {display_info &&
                       <Popover placement="topLeft" content={display_info}>
                        <InfoCircleTwoTone />
                    </Popover>
                    }
                 
                </span>
            </div>
        </Box>
    );
};

const tooltips = {
    submit_for: () => <div>Select the time frame during which the task was completed.</div>,

    acknowledged_person: () => (
        <>
            <Text type="danger">Optional</Text>
            <div>Specify the persons to notify about this issue. You can </div>
            <div>search by employee ID or name.</div>
            {/* <div>Every project update will be provided separately.</div>
            <Text type="secondary">If you do not get the project name, contact your supervisor to add you to the project.</Text> */}
        </>
    ),

    issue_category: () => (
        <>
            <div> Select the general domain of the issue you want to notify.</div>
            {/* <div>hours only, using fractions up to 2 digits if necessary (e.g., 5.5 means five</div>
            <div> and a half hours).</div>
            <Text type="secondary">Example: 12.5, 15 </Text> */}
        </>
    ),

    issue_subCategory: () => (
        <>
            
            <div>Provide more specific details about the issue. If you cannot</div>
            <div>find the appropriate subcategory, search using other category.</div>
            <div> If it is still missing, request the IT team to add it.</div>
            {/* <div>- Carefully select topics related to the task description.</div>
            <div>- Use tags minimally; only apply a tag if the task description highly aligns with that tag.</div>
            <div>- Avoid excessive tagging. (Standard 1-3)</div> */}
        </>
    ),

    urgency: () => (
        <>
            
            <div>Indicate how urgently this issue needs resolution. If marked</div>
            <div>as High or Moderate, explain the urgency in the note field.</div>
            {/* <div>Example:</div>
            <div>- Completed TSPC DFF design with QA (DRC, LVS).</div>
            <div>- Learned Python: loops, conditions, lambdas.</div> */}
        </>
    ),

    note: () => (
        <>
            <div>Describe your problem in detail. Do not include names of </div>
            <div>specific people for resolution.</div>
            {/* <div>Example:</div>
            <div>- Will do TSPC vs Normal DFF QA check (Hold time, Setup time).</div>
            <div>- Will learn Python: classes, polymorphism.</div> */}
        </>
    ),
};

export default FormPage;
