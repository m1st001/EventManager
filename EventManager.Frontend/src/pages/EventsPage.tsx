import React from "react";
import EventGrid from "../components/eventGrid/index.tsx";
import { useSelector } from "react-redux";
import { RootState } from "../store/store.ts";
import RequireLogin from "../components/global/RequireLogin.tsx";

const EventsPage = () => {
  const IsLoggedIn = useSelector(
    (state: RootState) => state.session,
  ).isLoggedIn;
  return IsLoggedIn ? (
    <EventGrid />
  ) : (
    <RequireLogin message="Login or Register to browse events" />
  );
};

export default EventsPage;
