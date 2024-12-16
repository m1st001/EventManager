import React, { useEffect, useState } from "react";
import { Events } from "../api/Events.ts";
import EventCard from "./EventCard.tsx";
import { Event } from "../api/data-contracts.ts";
import { Grid2 as Grid } from "@mui/material";

const EventGrid = () => {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const events = await eventsClient.eventsList();
      setEvents(events.data);
    };

    fetchEvents();
  });

  const eventsClient = new Events();
  eventsClient.baseUrl = import.meta.env.VITE_API_URL;

  return (
    <Grid container spacing={2}>
      {events.map((event) => (
        <EventCard key={event.id} {...event} />
      ))}
    </Grid>
  );
};

export default EventGrid;
