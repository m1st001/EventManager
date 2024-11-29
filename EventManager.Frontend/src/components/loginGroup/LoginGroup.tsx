import React from "react";
import { StyledLoginGroup } from "../styles.ts";
import { Avatar, Box, Button } from "@mui/material";

const LoginGroup = () => {
  const isLoggedIn = false;
  if (isLoggedIn) {
    return (
      <StyledLoginGroup>
        <Button>Log in</Button>
        <Button>Register</Button>
      </StyledLoginGroup>
    );
  }
  return (
    <StyledLoginGroup>
      <Box display="flex" gap={2} justifyContent="space-between">
        <Button>Profile</Button>
        <Avatar>H</Avatar>
      </Box>
    </StyledLoginGroup>
  );
};

export default LoginGroup;
