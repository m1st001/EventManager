import React from "react";
import { Event } from "../api/data-contracts.ts";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Modal,
  Typography,
} from "@mui/material";
import { ModalBox } from "./styles.ts";

interface EventModalProps {
  open: boolean;
  onClose: () => void;
  eventProps: Event;
}

const EventModal = (props: EventModalProps) => {
  return (
    <Modal open={props.open} onClose={props.onClose}>
      <ModalBox>
        <Card>
          <CardContent>
            <Box marginBottom={2}>
              <Typography variant="h4">{props.eventProps.name}</Typography>
            </Box>
            <Typography>{props.eventProps.startDate}</Typography>
            <Typography>{props.eventProps.description}</Typography>
          </CardContent>
          <CardActions>
            <Button>Register</Button>
          </CardActions>
        </Card>
      </ModalBox>
    </Modal>
  );
};

export default EventModal;
