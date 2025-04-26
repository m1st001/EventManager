import React, { useEffect, useState } from "react";
import { Event } from "../../../api/data-contracts.ts";
import { eventsClient } from "../../../api/apiConfig.ts";
import { useSelector } from "react-redux";
import EventsRenderer from "../EventsRenderer.tsx";
import { Typography } from "@mui/material";
import { RootState } from "../../../store/store.ts";

const SubscribedEventsTab = () => {
  const [subscribedEvents, setSubscribedEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const { userId, isLoggedIn } = useSelector(
    (state: RootState) => state.session,
  );

  // Fetch subscribed events
  useEffect(() => {
    if (isLoggedIn && userId !== -1) {
      const fetchSubscribedEvents = async () => {
        try {
          setLoading(true);
          setError(null);

          // Using the registeredList endpoint
          const response = await eventsClient.registeredList({ userId });

          // If the API is not ready yet, we'll use mock data
          if (!response.data || !Array.isArray(response.data)) {
            // Mock data for development
            // In a real implementation, you would use the actual response data
            setSubscribedEvents([]);
            setError(
              "No subscribed events found or API returned invalid data.",
            );
          } else {
            setSubscribedEvents(response.data);
          }
        } catch (err) {
          setError("Failed to load subscribed events. Please try again later.");
          console.error("Error fetching subscribed events:", err);
        } finally {
          setLoading(false);
        }
      };

      fetchSubscribedEvents();
    }
  }, [isLoggedIn, userId]);

  if (!isLoggedIn) {
    return (
      <Typography variant="body1" sx={{ textAlign: "center", p: 3 }}>
        Please log in to view your subscribed events.
      </Typography>
    );
  }

  return (
    <EventsRenderer events={subscribedEvents} loading={loading} error={error} />
  );
};

export default SubscribedEventsTab;
