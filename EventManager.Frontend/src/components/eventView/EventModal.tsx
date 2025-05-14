import React, { useState } from "react";
import { Event, EventAvailability, SubscribeEventRequest } from "../../api/data-contracts.ts";
import {
  Alert,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  Divider,
  Modal,
  Stack,
  Typography,
} from "@mui/material";
import { ModalBox } from "../styles.ts";
import { subClient } from "../../api/apiConfig.ts";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store.ts";
import { formatDate, getStatusText, getStatusColor, getAvailabilityText, getAvailabilityColor } from "./eventHelpers.ts";

interface EventModalProps {
  open: boolean;
  onClose: () => void;
  eventProps: Event;
}


// EventInfo component to display event details
const EventInfo = ({ event }: { event: Event }) => {
  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" marginBottom={2}>
        <Typography variant="h4">{event.name}</Typography>
        <Stack direction="row" spacing={1}>
          <Chip 
            label={getStatusText(event.status)} 
            color={getStatusColor(event.status)}
            size="small"
          />
          <Chip 
            label={getAvailabilityText(event.availability)} 
            color={getAvailabilityColor(event.availability)}
            size="small"
          />
        </Stack>
      </Box>

      <Typography sx={{ mb: 2 }}>
        <strong>Start Date:</strong> {formatDate(event.startDate)}
      </Typography>

      <Typography sx={{ mb: 2 }}>
        <strong>Created Date:</strong> {formatDate(event.createdDate)}
      </Typography>

      <Typography sx={{ mb: 2 }}>
        <strong>Participants:</strong> {event.participants?.length || 0} / {event.maxParticipants}
      </Typography>

      <Typography variant="body1" sx={{ mb: 2 }}>
        <strong>Description:</strong> {event.description}
      </Typography>

      {event.tags && event.tags.length > 0 && (
        <Box sx={{ mb: 2 }}>
          <Typography variant="body2" sx={{ mb: 1 }}>
            <strong>Tags:</strong>
          </Typography>
          <Stack direction="row" spacing={1} flexWrap="wrap">
            {event.tags.map((tag, index) => (
              <Chip key={index} label={tag} size="small" />
            ))}
          </Stack>
        </Box>
      )}

      <Divider sx={{ my: 2 }} />
    </Box>
  );
};

// EventActions component to handle event actions like subscribing
const EventActions = ({ 
  event, 
  isSubscribing, 
  onSubscribe 
}: { 
  event: Event, 
  isSubscribing: boolean, 
  onSubscribe: () => void 
}) => {
  return (
    <CardActions>
      <Button 
        variant="contained" 
        color="primary" 
        onClick={onSubscribe}
        disabled={isSubscribing || event.availability === EventAvailability.Value1}
      >
        {isSubscribing ? "Subscribing..." : "Subscribe"}
      </Button>
    </CardActions>
  );
};

const EventModal = (props: EventModalProps) => {
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [notification, setNotification] = useState<{
    show: boolean;
    message: string;
    severity: "success" | "error" | "info" | "warning";
  }>({
    show: false,
    message: "",
    severity: "info",
  });

  // Get the current user's ID from the Redux store
  const userId = useSelector((state: RootState) => state.session.userId);
  const isLoggedIn = useSelector((state: RootState) => state.session.isLoggedIn);

  // Handle subscribe button click
  const handleSubscribe = async () => {
    if (!isLoggedIn) {
      setNotification({
        show: true,
        message: "Please log in to subscribe to events",
        severity: "warning",
      });
      return;
    }

    setIsSubscribing(true);

    try {
      const subscribeRequest: SubscribeEventRequest = {
        userId: userId,
        eventId: props.eventProps.id
      };

      await subClient.subscribeCreate(subscribeRequest);
      setNotification({
        show: true,
        message: "Successfully subscribed to event!",
        severity: "success",
      });
    } catch (error) {
      console.error("Error subscribing to event:", error);
      setNotification({
        show: true,
        message: "Failed to subscribe to event. Please try again.",
        severity: "error",
      });
    } finally {
      setIsSubscribing(false);
    }
  };

  return (
    <Modal open={props.open} onClose={props.onClose}>
      <ModalBox>
        <Card>
          <CardContent>
            {notification.show && (
              <Box mb={2}>
                <Alert 
                  severity={notification.severity}
                  onClose={() => setNotification({ ...notification, show: false })}
                >
                  {notification.message}
                </Alert>
              </Box>
            )}

            <EventInfo event={props.eventProps} />
          </CardContent>

          <EventActions 
            event={props.eventProps} 
            isSubscribing={isSubscribing} 
            onSubscribe={handleSubscribe} 
          />
        </Card>
      </ModalBox>
    </Modal>
  );
};

export default EventModal;
