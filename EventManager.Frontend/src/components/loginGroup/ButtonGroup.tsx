import React from "react";
import { Button } from "@mui/material";
import { StyledLoginGroup } from "../styles.ts";
import { updateSession } from "../../store/slices/sessionSlice.ts";
import { useDispatch } from "react-redux";

const ButtonGroup = () => {
  const dispatch = useDispatch();

  const onLogin = () => {
    dispatch(updateSession({ isLoggedIn: true }));
  };

  return (
    <StyledLoginGroup>
      <Button onClick={onLogin}>Log in</Button>
      <Button>Register</Button>
    </StyledLoginGroup>
  );
};

export default ButtonGroup;
