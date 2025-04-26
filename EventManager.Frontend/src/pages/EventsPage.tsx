import React from "react";
import EventGrid from "../components/eventGrid/index.tsx";
import { useSelector } from "react-redux";
import { RootState } from "../store/store.ts";
import NotLoggedIn from "../components/NotLoggedIn.tsx";

const EventsPage = () => {
  const IsLoggedIn = useSelector(
    (state: RootState) => state.session,
  ).isLoggedIn;
  return IsLoggedIn ? (
    <EventGrid />
  ) : (
    <NotLoggedIn message="Login or Register to browse events" />
  );
};

export default EventsPage;
