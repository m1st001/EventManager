import React from "react";
import { Box, Button, Container, Toolbar } from "@mui/material";
import LoginGroup from "../loginGroup/LoginGroup.tsx";
import { StyledNavbar } from "../styles.ts";

interface Page {
  name: string;
  link: string;
}

const Navbar = () => {
  const baseUrl = import.meta.env.BASE_URL;
  const pages: Page[] = [
    { name: "Main", link: "" },
    { name: "Events", link: "events" },
    { name: "Create an event", link: "create-event" },
  ];
  return (
    <>
      <Container>
        <StyledNavbar position="static">
          <Container>
            <Toolbar disableGutters sx={{ justifyContent: "space-between" }}>
              <Box>
                {pages.map((page) => (
                  <Button
                    sx={{ textAlign: "center" }}
                    key={page.name}
                    href={baseUrl + page.link}
                  >
                    {page.name}
                  </Button>
                ))}
              </Box>
              <LoginGroup />
            </Toolbar>
          </Container>
        </StyledNavbar>
      </Container>
    </>
  );
};

export default Navbar;
