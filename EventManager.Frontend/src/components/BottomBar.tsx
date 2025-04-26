import React from "react";
import { Box, Container, IconButton, Link, Toolbar, Typography } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import Discord from "@mui/icons-material/Chat";
import { StyledBottomBar } from "./styles.ts";

const BottomBar = () => {
  return (
    <Container>
      <StyledBottomBar position="fixed" sx={{ width: "100%", left: 0 }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="body2" color="inherit">
              © {new Date().getFullYear()} EventManager
            </Typography>
            <Box>
              <Link href="https://github.com" target="_blank" rel="noopener" color="inherit">
                <IconButton color="inherit" aria-label="GitHub">
                  <GitHubIcon />
                </IconButton>
              </Link>
              <Link href="https://discord.com" target="_blank" rel="noopener" color="inherit">
                <IconButton color="inherit" aria-label="Discord">
                  <Discord />
                </IconButton>
              </Link>
            </Box>
          </Toolbar>
        </Container>
      </StyledBottomBar>
    </Container>
  );
};

export default BottomBar;
