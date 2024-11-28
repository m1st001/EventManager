import React from "react";
import { StyledNavbar } from "./styles.ts";
import { Box, Container, Toolbar } from "@mui/material";

const BottomBar = () => {
  return (
    <Container>
      <StyledNavbar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Box
              sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
            ></Box>
          </Toolbar>
        </Container>
      </StyledNavbar>
    </Container>
  );
};

export default BottomBar;
