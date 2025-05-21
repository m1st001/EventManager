import React, { useState, useEffect } from "react";
import { StyledLoginGroup } from "../styles.ts";
import { Avatar, Box, Button } from "@mui/material";
import { RootState } from "../../store/store.ts";
import ButtonGroup from "./ButtonGroup.tsx";
import { useSelector } from "react-redux";

const LoginGroup = () => {
  const session = useSelector((state: RootState) => state.auth);
  const [showContent, setShowContent] = useState<React.ReactNode | null>(null);

  useEffect(() => {
    if (!session.isLoading) {
      if (session.user) {
        const username = session.user.userName || "";
        setShowContent(
          <Box display="flex" gap={2} justifyContent="space-between">
            <Button>{username}</Button>
            <Avatar>{username.charAt(0)}</Avatar>
          </Box>
        );
      } else {
        setShowContent(<ButtonGroup />);
      }
    }
  }, [session]);

  return <StyledLoginGroup>{showContent}</StyledLoginGroup>;
};

export default LoginGroup;
