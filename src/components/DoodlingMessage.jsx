import React from "react";
import { Button, Result, Alert, Flex, Spin } from "antd";
import { Box } from "@mui/material";

export const NoTicketSelected = (props) => {
  const { status, subTitle } = props;

  return (
    <Box sx={{ width: "100%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", height: "100%", overflowY: "auto" }}>
      <Result status="404" title={status} subTitle={subTitle} />
      {/* <Result status="404" title={status} subTitle="Sorry, the page you visited does not exist." extra={<Button type="primary">Back Home</Button>} /> */}
    </Box>
  );
};

export const LoadingFullScreen = (props) => {
  const { status, subTitle } = props;

  return (
    <Box sx={{ width: "100%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", height: "100%", overflowY: "auto" }}>
      <Spin tip="Loading" size="large">
        <Box
          sx={{
            padding: 8,
            background: "rgba(0, 0, 0, 0.05)",
            borderRadius: 2,
          }}
        ></Box>
      </Spin>
    </Box>
  );
};
