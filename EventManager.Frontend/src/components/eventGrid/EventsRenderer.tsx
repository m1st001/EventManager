import React from "react";
import { Event } from "../../api/data-contracts.ts";
import { Box, Typography, CircularProgress, Alert, Grid } from "@mui/material";
import EventCard from "../EventCard.tsx";

interface EventsRendererProps {
  events: Event[];
  loading: boolean;
  error: string | null;
}

const EventsRenderer = ({ events, loading, error }: EventsRendererProps) => {
  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error && !events.length) {
    return (
      <Alert severity="error" sx={{ mb: 2 }}>
        {error}
      </Alert>
    );
  }

  if (!events.length) {
    return (
      <Typography variant="body1" sx={{ textAlign: 'center', p: 3 }}>
        No events found.
      </Typography>
    );
  }

  return (
    <>
      {error && (
        <Alert severity="warning" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      <Grid container spacing={2} justifyContent={"center"}>
        {events.map((event) => (
          <EventCard key={event.id} {...event} />
        ))}
      </Grid>
    </>
  );
};

export default EventsRenderer;