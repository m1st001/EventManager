import React, { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Checkbox,
  FormControlLabel,
  Modal,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import { ModalBox } from "../../styles.ts";
import { LoginRequest } from "../../../api/data-contracts.ts";
import { useDispatch } from "react-redux";
import { login } from "../../../store/thunks/authThunk.ts";
import { AppDispatch } from "../../../store/store.ts";

interface ModalProps {
  open: boolean;
  onClose: () => void;
}

const LoginModal = (props: ModalProps) => {
  const dispatch: AppDispatch = useDispatch();
  const [username, setUsername] = useState<string>();
  const [password, setPassword] = useState<string>();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const credentials: LoginRequest = {
      username: username,
      password: password,
    };

    dispatch(login(credentials)).then(() => {});
    props.onClose();
  };
  return (
    <>
      <Modal open={props.open} onClose={props.onClose}>
        <form onSubmit={handleSubmit}>
          <ModalBox>
            <Card>
              <CardContent>
                <Box marginBottom={2}>
                  <Typography variant="h4" justifySelf="center">
                    Login
                  </Typography>
                </Box>
                <Box display="flex" flexDirection="column">
                  <TextField
                    id="username"
                    label="Username"
                    size="small"
                    margin="dense"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                  <TextField
                    id="password"
                    label="Password"
                    type="password"
                    size="small"
                    margin="dense"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <FormControlLabel
                    control={<Checkbox />}
                    label="Remember me"
                  />
                </Box>
              </CardContent>
              <CardActions>
                <Button type="submit">Login</Button>
              </CardActions>
            </Card>
          </ModalBox>
        </form>
      </Modal>
    </>
  );
};

export default LoginModal;
