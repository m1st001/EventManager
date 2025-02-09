import React from "react";
import { StyledLoginGroup } from "../styles.ts";
import { Avatar, Box, Button } from "@mui/material";
import store from "../../store/store.ts";

const LoginGroup = () => {
  const session = store.getState().session;
  if (session.isLoggedIn) {
    return (
      <StyledLoginGroup>
        <Box display="flex" gap={2} justifyContent="space-between">
          <Button>{session.userName}</Button>
          <Avatar>H</Avatar>
        </Box>
      </StyledLoginGroup>
    );
  }
  return (
    <StyledLoginGroup>
      <Button>Log in</Button>
      <Button>Register</Button>
    </StyledLoginGroup>
  );
};

export default LoginGroup;
