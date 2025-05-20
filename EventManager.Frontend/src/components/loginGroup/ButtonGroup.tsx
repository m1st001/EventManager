import React, { useState } from "react";
import { Button, Box } from "@mui/material";
import { StyledLoginGroup } from "../styles";
import LoginModal from "./modals/LoginModal";
import RegisterModal from "./modals/RegisterModal";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../store/store";
import { logoutUser } from "../../store/thunks/authThunk";

const ButtonGroup = () => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

  const dispatch: AppDispatch = useDispatch();
  const { isAuthenticated, user, isLoading: isAuthLoading } = useSelector((state: RootState) => state.auth);

  const handleOpenLoginModal = () => setIsLoginModalOpen(true);
  const handleCloseLoginModal = () => setIsLoginModalOpen(false);
  const handleOpenRegisterModal = () => setIsRegisterModalOpen(true);
  const handleCloseRegisterModal = () => setIsRegisterModalOpen(false);

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  if (isAuthenticated) {
    return (
      <Box display="flex" alignItems="center">
        <Button onClick={handleLogout} disabled={isAuthLoading}>
          {isAuthLoading ? 'Logging out...' : 'Log out'}
        </Button>
      </Box>
    );
  }

  return (
    <>
      <StyledLoginGroup>
        <Button onClick={handleOpenLoginModal} disabled={isAuthLoading}>Log in</Button>
        <Button onClick={handleOpenRegisterModal} disabled={isAuthLoading}>Register</Button>
      </StyledLoginGroup>
      <LoginModal open={isLoginModalOpen} onClose={handleCloseLoginModal} />
      <RegisterModal
        open={isRegisterModalOpen}
        onClose={handleCloseRegisterModal}
      />
    </>
  );
};

export default ButtonGroup;