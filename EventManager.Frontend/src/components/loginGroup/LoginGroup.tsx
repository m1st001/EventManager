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
    // Only update the UI when we have a definitive state (not during loading)
    if (!session.isLoading) {
      if (session.isAuthenticated && session.user) {
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
    // We don't update the UI during loading, which prevents the flash
  }, [session]);

  return <StyledLoginGroup>{showContent}</StyledLoginGroup>;
};

export default LoginGroup;
