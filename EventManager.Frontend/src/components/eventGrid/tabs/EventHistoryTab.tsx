import React, { useEffect, useState } from "react";
import { Event } from "../../../api/data-contracts.ts";
import { useSelector } from "react-redux";
import EventsRenderer from "../EventsRenderer.tsx";
import { Typography } from "@mui/material";
import { RootState } from "../../../store/store.ts";

export const EventHistoryTab = () => {
  const [participatedEvents, setParticipatedEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const { user } = useSelector(
    (state: RootState) => state.auth,
  );

  // Fetch participated events history
  useEffect(() => {
    if (user && user?.id !== -1) {
      const fetchParticipatedEvents = async () => {
        try {
          setLoading(true);
          setError(null);

          // Since there's no API endpoint for this yet, we'll use mock data
          // In a real implementation, you would make an API call here

          // Simulate a delay to show loading state
          await new Promise((resolve) => setTimeout(resolve, 1000));

          // Mock data for development
          setParticipatedEvents([]);

          // Inform the user that this is mock data
          setError("Using sample data. API endpoint is not ready yet.");
        } catch (err) {
          setError("Failed to load event history. Please try again later.");
          console.error("Error fetching participated events:", err);
        } finally {
          setLoading(false);
        }
      };

      fetchParticipatedEvents();
    }
  }, [user]);

  if (!user) {
    return (
      <Typography variant="body1" sx={{ textAlign: "center", p: 3 }}>
        Please log in to view your event history.
      </Typography>
    );
  }

  return (
    <EventsRenderer
      events={participatedEvents}
      loading={loading}
      error={error}
    />
  );
};
