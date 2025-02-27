import React, { useState } from "react";
import { Button } from "@mui/material";
import { StyledLoginGroup } from "../styles.ts";
import LoginModal from "./modals/LoginModal.tsx";
import RegisterModal from "./modals/RegisterModal.tsx";

const ButtonGroup = () => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

  const handleOpenLoginModal = () => setIsLoginModalOpen(true);
  const handleCloseLoginModal = () => setIsLoginModalOpen(false);
  const handleOpenRegisterModal = () => setIsRegisterModalOpen(true);
  const handleCloseRegisterModal = () => setIsRegisterModalOpen(false);

  return (
    <>
      <StyledLoginGroup>
        <Button onClick={handleOpenLoginModal}>Log in</Button>
        <Button onClick={handleOpenRegisterModal}>Register</Button>
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
