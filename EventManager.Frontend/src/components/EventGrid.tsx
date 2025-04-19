import React, { useEffect, useState } from "react";
import EventCard from "./EventCard.tsx";
import { Event } from "../api/data-contracts.ts";
import Grid from "@mui/material/Grid";
import { StyledContentBox } from "./styles.ts";
import { eventsClient } from "../api/apiConfig.ts";

const EventGrid = () => {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const events = await eventsClient.eventsList();
      setEvents(events.data);
    };

    fetchEvents();
  }, []);

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
