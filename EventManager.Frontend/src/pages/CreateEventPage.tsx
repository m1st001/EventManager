import React from "react";
import CreateEventForm from "../components/CreateEventForm.tsx";
import { RootState } from "../store/store.ts";
import { useSelector } from "react-redux";
import RequireLogin from "../components/global/RequireLogin.tsx";

const CreateEventPage = () => {
  const IsLoggedIn = useSelector(
    (state: RootState) => state.auth,
  ).user;
  return IsLoggedIn ? (
    <CreateEventForm />
  ) : (
    <RequireLogin message="Login or Register to create events" />
  );
};

export default CreateEventPage;
