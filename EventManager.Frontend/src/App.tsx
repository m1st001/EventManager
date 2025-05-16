import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router";
import LandingPage from "./pages/LandingPage.tsx";
import CreateEventPage from "./pages/CreateEventPage.tsx";
import EventsPage from "./pages/EventsPage.tsx";
import ErrorPage from "./pages/ErrorPage.tsx";
import Navbar from "./components/global/Navbar.tsx";
import BottomBar from "./components/global/BottomBar.tsx";
import { Container, createTheme, ThemeProvider } from "@mui/material";
import AuthInitializer from "./components/auth/AuthInitializer.tsx";

const App = () => {
  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  const router = createBrowserRouter(
    [
      {
        errorElement: <ErrorPage />,
        children: [
          {
            path: "/",
            element: <LandingPage />,
          },
          {
            path: "create-event",
            element: <CreateEventPage />,
          },
          {
            path: "events",
            element: <EventsPage />,
          },
        ],
      },
    ],
    { basename: import.meta.env.BASE_URL },
  );
  return (
    <div
      style={{ display: "flex", flexDirection: "column", minHeight: "97vh" }}
    >
      <ThemeProvider theme={darkTheme}>
        <AuthInitializer />
        <Navbar />
        <Container maxWidth="lg" sx={{ flex: 1, mb: 8 }}>
          <RouterProvider router={router} />
        </Container>
        <BottomBar />
      </ThemeProvider>
    </div>
  );
};

export default App;
