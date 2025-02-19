import React from "react";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import { ModalBox } from "../../styles.ts";

interface ModalProps {
  open: boolean;
  onClose: () => void;
}

const RegisterModal = (props: ModalProps) => {
  return (
    <Modal open={props.open} onClose={props.onClose}>
      <ModalBox>
        <Card>
          <CardContent>
            <Box marginBottom={2}>
              <Typography variant="h4" justifySelf="center">
                Register
              </Typography>
            </Box>
            <Box display="flex" flexDirection="column">
              <TextField
                id="username"
                label="Username"
                size="small"
                margin="dense"
              />
              <TextField
                id="password"
                label="Password"
                type="password"
                size="small"
                margin="dense"
              />
              <TextField
                id="repeatPpassword"
                label="Repeat password"
                type="password"
                size="small"
                margin="dense"
              />
              <TextField id="token" label="Token" size="small" margin="dense" />
            </Box>
          </CardContent>
          <CardActions>
            <Button>Login</Button>
            <Button>Cancel</Button>
          </CardActions>
        </Card>
      </ModalBox>
    </Modal>
  );
};

export default RegisterModal;
