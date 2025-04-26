import React from "react";
import { Chip } from "@mui/material";
import { StyledContentBox } from "./styles.ts";

const NotLoggedIn = ({ message }: { message: string }) => {
  return (
    <StyledContentBox>
      <Chip
        label={message}
        color="error"
        variant="outlined"
        size="medium"
        sx={{
          fontSize: "16px",
        }}
      />
    </StyledContentBox>
  );
};

export default NotLoggedIn;
