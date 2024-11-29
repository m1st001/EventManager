import React from "react";
import { StyledNavbar } from "./styles.ts";
import { Container, Toolbar } from "@mui/material";

const BottomBar = () => {
  return (
    <Container>
      <StyledNavbar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters></Toolbar>
        </Container>
      </StyledNavbar>
    </Container>
  );
};

export default BottomBar;
