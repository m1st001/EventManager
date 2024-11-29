import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router";
import LandingPage from "./pages/LandingPage.tsx";
import CreateEventPage from "./pages/CreateEventPage.tsx";
import EventsPage from "./pages/EventsPage.tsx";
import ErrorPage from "./pages/ErrorPage.tsx";
import Navbar from "./components/Navbar.tsx";
import BottomBar from "./components/BottomBar.tsx";
import { Container, createTheme, ThemeProvider } from "@mui/material";

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
    <div>
      <ThemeProvider theme={darkTheme}>
        <Navbar />
        <Container maxWidth="lg">
          <RouterProvider router={router} />
        </Container>
        <BottomBar />
      </ThemeProvider>
    </div>
  );
};

export default App;
