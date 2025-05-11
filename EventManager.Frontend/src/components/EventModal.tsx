import React, { useState } from "react";
import { Event, SubscribeEventRequest } from "../api/data-contracts.ts";
import {
  Alert,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Modal,
  Typography,
} from "@mui/material";
import { ModalBox } from "./styles.ts";
import { subClient } from "../api/apiConfig.ts";
import { useSelector } from "react-redux";
import { RootState } from "../store/store.ts";

interface EventModalProps {
  open: boolean;
  onClose: () => void;
  eventProps: Event;
}

// Format date to a more readable format
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
            <Box marginBottom={2}>
              <Typography variant="h4">{props.eventProps.name}</Typography>
            </Box>
            <Typography sx={{ mb: 2 }}>
              <strong>Date:</strong> {formatDate(props.eventProps.startDate)}
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              <strong>Description:</strong> {props.eventProps.description}
            </Typography>
          </CardContent>
          <CardActions>
            <Button 
              variant="contained" 
              color="primary" 
              onClick={handleSubscribe}
              disabled={isSubscribing}
            >
              {isSubscribing ? "Subscribing..." : "Subscribe"}
            </Button>
          </CardActions>
        </Card>
      </ModalBox>
    </Modal>
  );
};

export default EventModal;
