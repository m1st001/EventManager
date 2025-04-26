import React, { useEffect, useState } from "react";
import { Event } from "../../../api/data-contracts.ts";
import { eventsClient } from "../../../api/apiConfig.ts";
import EventsRenderer from "../EventsRenderer.tsx";

const AllEventsTab = () => {
  const [allEvents, setAllEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch all events
  useEffect(() => {
    const fetchAllEvents = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await eventsClient.eventsList();
        setAllEvents(response.data);
      } catch (err) {
        setError("Failed to load events. Please try again later.");
        console.error("Error fetching all events:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAllEvents();
  }, []);

  return <EventsRenderer events={allEvents} loading={loading} error={error} />;
};

export default AllEventsTab;
