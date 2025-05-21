import React, { useState } from "react";
import { Button } from "@mui/material";
import { StyledLoginGroup } from "../styles";
import LoginModal from "./modals/LoginModal";
import RegisterModal from "./modals/RegisterModal";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

const ButtonGroup = () => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

  const { isLoading } = useSelector((state: RootState) => state.auth);

  const handleOpenLoginModal = () => setIsLoginModalOpen(true);
  const handleCloseLoginModal = () => setIsLoginModalOpen(false);
  const handleOpenRegisterModal = () => setIsRegisterModalOpen(true);
  const handleCloseRegisterModal = () => setIsRegisterModalOpen(false);

  return (
    <>
      <StyledLoginGroup>
        <Button onClick={handleOpenLoginModal} disabled={isLoading}>Log in</Button>
        <Button onClick={handleOpenRegisterModal} disabled={isLoading}>Register</Button>
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