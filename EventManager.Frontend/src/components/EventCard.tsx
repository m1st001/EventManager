import React, { useState } from "react";
import { Event } from "../api/data-contracts.ts";
import { CardContent, CardMedia, Typography } from "@mui/material";
import { StyledEventCard } from "./styles.ts";
import EventModal from "./EventModal.tsx";

function formatDate(isoDate: string): string {
  const date = new Date(isoDate);
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  };
  return date.toLocaleString("ru-RU", options);
}

const EventCard = (eventProps: Event) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <>
      <StyledEventCard sx={{ width: 345 }} onClick={handleOpenModal}>
        <CardMedia
          sx={{ height: 140 }}
          title="green iguana"
          image="src/assets/contemplative-reptile.jpg"
        />
        <CardContent>
          <Typography>{formatDate(eventProps.startDate)}</Typography>
          <Typography gutterBottom variant="h5" component="div">
            {eventProps.name}
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            {eventProps.description}
          </Typography>
        </CardContent>
      </StyledEventCard>
      <EventModal
        open={isModalOpen}
        onClose={handleCloseModal}
        eventProps={eventProps}
      />
    </>
  );
};

export default EventCard;
