import React from "react";
import { StyledNavbar } from "./styles.ts";
import { Button, Container, Toolbar } from "@mui/material";

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
          <Container maxWidth="xl">
            <Toolbar disableGutters>
              {pages.map((page) => (
                <Button
                  sx={{ textAlign: "center" }}
                  key={page.name}
                  href={baseUrl + page.link}
                >
                  {page.name}
                </Button>
              ))}
            </Toolbar>
          </Container>
        </StyledNavbar>
      </Container>
    </>
  );
};

export default Navbar;
