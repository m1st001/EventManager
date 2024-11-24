import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {BrowserRouter, Route, Routes} from "react-router";
import LandingPage from "./pages/LandingPage.tsx";
import CreateEventPage from "./pages/CreateEventPage.tsx";
import EventsPage from "./pages/EventsPage.tsx";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <BrowserRouter basename={import.meta.env.BASE_URL}>
          <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/create" element={<CreateEventPage />} />
              <Route path="/events" element={<EventsPage />} />
          </Routes>
      </BrowserRouter>
  </StrictMode>,
)
