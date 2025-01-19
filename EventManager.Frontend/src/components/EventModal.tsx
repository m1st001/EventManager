import React from "react";
import { Event } from "../api/data-contracts.ts";
import {
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
            <Typography>{props.eventProps.name}</Typography>
          </CardContent>
          <CardActions>
            <Button>Register</Button>
            <Button>Close</Button>
          </CardActions>
        </Card>
      </ModalBox>
    </Modal>
  );
};

export default EventModal;
