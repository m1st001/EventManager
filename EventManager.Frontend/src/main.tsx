import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {BrowserRouter, Route, Routes} from "react-router";
import LandingPage from "./pages/LandingPage.tsx";
import CreateEventPage from "./pages/CreateEventPage.tsx";
import EventsPage from "./pages/EventsPage.tsx";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <BrowserRouter>
          <Routes>
              <Route path="/EventManager/" element={<LandingPage />} />
              <Route path="/EventManager/create" element={<CreateEventPage />} />
              <Route path="/EventManager/events" element={<EventsPage />} />
          </Routes>
      </BrowserRouter>
  </StrictMode>,
)
