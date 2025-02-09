import React from "react";
import { StyledLoginGroup } from "../styles.ts";
import { Avatar, Box, Button } from "@mui/material";
import { RootState } from "../../store/store.ts";
import ButtonGroup from "./ButtonGroup.tsx";
import { useSelector } from "react-redux";

const LoginGroup = () => {
  const session = useSelector((state: RootState) => state.session);
  if (session.isLoggedIn) {
    return (
      <StyledLoginGroup>
        <Box display="flex" gap={2} justifyContent="space-between">
          <Button>{session.userName}</Button>
          <Avatar>{session.userName.charAt(0)}</Avatar>
        </Box>
      </StyledLoginGroup>
    );
  }
  return <ButtonGroup />;
};

export default LoginGroup;
