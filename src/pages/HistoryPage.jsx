import { MedicineBoxOutlined, SisternodeOutlined, UserAddOutlined } from "@ant-design/icons";
import { Box } from "@mui/material";
import { Breadcrumb, Button, Card, Tag, Timeline } from "antd";
import React, { useState } from "react";

import "../All_Styles/Scrollbar.css"

const items = [
    {
      title: 'IT',
    },
    {
      title: 'Laptop',
    },
   ]

const HistoryPage = () => {
  return (
    <Box sx={{ width: "100%", height: "100%", display: "flex" }}>
      <HistoryPageStucture />
    </Box>
  );
};

const RequestCard = ()=>{

    return(
        <Box sx={{width:`calc(100% - 30px)`, maxWidth:'400px', marginRight:'5px',height:'120px', borderRadius:'10px', border:'0.5px solid #ededed', '&:hover':{border:'1px dashed grey', cursor:'pointer'}, padding:'5px 10px', bgcolor:'#FCFCFC'}}>

            {/* HEADER */}
            <Box sx={{width:'100%', display:'flex', justifyContent:'space-between'}}> 
                <Box>   <Breadcrumb items={items} /> </Box>
                <Box> <Tag style={{margin:'0'}}>Accepted</Tag> </Box>
            </Box>


            {/* DESCRIPTION */}
            <Box sx={{ width: '100%', textAlign: 'justify', display: '-webkit-box', overflow: 'hidden', WebkitBoxOrient: 'vertical', WebkitLineClamp: 2, color:'grey', lineHeight: 1.1, fontSize:'12px', margin:'5px 0 3px 0'}}> 
                When an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
            </Box>

            {/* FOOTER INFO */}
            <Box sx={{width:'100%', display:'flex', justifyContent:'space-between'}}> 

                <Box sx={{display:'flex',flexDirection:'column', fontSize:'12px', justifyContent:'flex-end'}}> <Box sx={{fontSize:'11px', color:'grey'}}>10 Oct 24, 12:15 pm</Box>  </Box>


                <Box sx={{display:'flex',flexDirection:'column', alignItems:'flex-end', fontSize:'12px'}}>  <Box > <UserAddOutlined /> Ammar Azad Khan </Box>   </Box>

            </Box>

        </Box>
    )
}


const RequestTimeline = () => {
    return (
      <div>
        <Timeline
          pending="Updgrade in progress..."
          reverse={true}
          items={[
            {
              children: 'Request Created',
            },
            {
              children: 'Reviewed by IT',
            },
            {
              children: 'Send to upgrade',
            },
          ]}
        />
      </div>
    );
  };


const RequestDescription = ()=>{

    return(
        <Box sx={{width:'100%', height:'100%'}}> 

            {/* HEADER */}
            <Box sx={{width:'100%', height:'50px', borderRadius:'7px', bgcolor:'#f6f6f6', display:'flex', justifyContent:'space-between', alignItems:'center'}}> 
                <Box sx={{marginLeft:'10px'}}> <Breadcrumb items={items} /> </Box>
                <Box sx={{marginRight:'10px'}}> <Button type="primary">Edit</Button>  </Box>
            </Box>


            {/* DESCRIPTION */}
            <Box sx={{textAlign:'justify', color:'grey', padding:'0 3px'}}> 
                There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.
            </Box>


            {/* Timeline */}
            <Box sx={{marginTop:'20px'}}> 
                <RequestTimeline />
            </Box>


        </Box>
    )
}


const HistoryPageStucture = () => {
  return (
    <Box sx={{display:'flex', gap:'10px', width:'100%'}}>

        <Box className="custom-scrollbar" sx={{ width: {xs:'100%', md:'400px'}, height: "100%", display: "flex", flexDirection:'column', gap:'5px', overflowY:'scroll', alignItems:{xs:'center', md:'flex-start'}, }}>
            <RequestCard />
            <RequestCard />
            <RequestCard />
            <RequestCard />
            <RequestCard />
            <RequestCard />
            <RequestCard />
            <RequestCard />
            <RequestCard />
            <RequestCard />
            <RequestCard />
            
        </Box>


        <Box sx={{ flex:'1', height: "100%", display: {xs:'none', md:"flex"}, }}>

            <RequestDescription />
            
        </Box>

    </Box>
  );
};

export default HistoryPage;
