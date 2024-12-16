import React from "react";
import { Event } from "../api/data-contracts.ts";

const EventCard = (eventProps: Event) => {
  return (
    <div>
      <h1>{eventProps.name}</h1>
    </div>
  );
};

export default EventCard;
