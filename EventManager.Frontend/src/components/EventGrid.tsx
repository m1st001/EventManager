import React, { useEffect, useState } from "react";
import { Events } from "../api/Events.ts";
import EventCard from "./EventCard.tsx";
import { Event } from "../api/data-contracts.ts";
import { Grid2 as Grid } from "@mui/material";
import { StyledContentBox } from "./styles.ts";

const EventGrid = () => {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const events = await eventsClient.eventsList();
      setEvents(events.data);
    };

    fetchEvents();
  }, []);

  const eventsClient = new Events();
  eventsClient.baseUrl = import.meta.env.VITE_API_URL;

  return (
    <StyledContentBox sx={{ flexGrow: 1 }}>
      <Grid container spacing={2} justifyContent={"center"}>
        {events.map((event) => (
          <EventCard key={event.id} {...event} />
        ))}
      </Grid>
    </StyledContentBox>
  );
};

export default EventGrid;
