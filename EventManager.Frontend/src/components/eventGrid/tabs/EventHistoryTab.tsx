import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import EventsRenderer from "../EventsRenderer.tsx";
import { Typography } from "@mui/material";
import { RootState } from "../../../store/store.ts";
import { eventsClient } from "../../../api/apiConfig.ts";
import { IEvent } from "../../../api/data-contracts.ts";

export const EventHistoryTab = () => {
  const [participatedEvents, setParticipatedEvents] = useState<IEvent[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const { user } = useSelector((state: RootState) => state.auth);

  // Fetch participated events history
  useEffect(() => {
    if (user && user?.id !== -1) {
      const fetchParticipatedEvents = async () => {
        try {
          setLoading(true);
          setError(null);

          const response = await eventsClient.historyDetail(user.id!, {
            credentials: "include",
          });

          // Mock data for development
          setParticipatedEvents(response.data);
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
