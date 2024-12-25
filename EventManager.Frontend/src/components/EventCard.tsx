import React from "react";
import { Event } from "../api/data-contracts.ts";
import { CardContent, CardMedia, Typography } from "@mui/material";
import { StyledEventCard } from "./styles.ts";

const EventCard = (eventProps: Event) => {
  return (
    <StyledEventCard sx={{ width: 345 }}>
      <CardMedia
        sx={{ height: 140 }}
        image="/static/images/cards/contemplative-reptile.jpg"
        title="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {eventProps.name}
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {eventProps.description}
        </Typography>
      </CardContent>
    </StyledEventCard>
  );
};

export default EventCard;
