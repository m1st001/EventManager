import React, { useState } from "react";
import {
  Alert,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Checkbox,
  CircularProgress,
  FormControlLabel,
  Modal,
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
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loginError, setLoginError] = useState<string>("");
  const [loginSuccess, setLoginSuccess] = useState<boolean>(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    setLoginError("");
    setLoginSuccess(false);

    const credentials: LoginRequest = {
      username: username,
      password: password,
    };

    try {
      const result = await dispatch(login(credentials)).unwrap();
      if (result) {
        setLoginSuccess(true);
        // Close the modal after a short delay to show the success message
        setTimeout(() => {
          props.onClose();
        }, 1500);
      } else {
        setLoginError("Login failed. Please check your credentials.");
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        setLoginError(error.message || "An error occurred during login.");
      }
    } finally {
      setIsLoading(false);
    }
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
                  {loginSuccess && (
                    <Alert severity="success" sx={{ mb: 2 }}>
                      Login successful! Redirecting...
                    </Alert>
                  )}
                  {loginError && (
                    <Alert severity="error" sx={{ mb: 2 }}>
                      {loginError}
                    </Alert>
                  )}
                  <TextField
                    id="username"
                    label="Username"
                    size="small"
                    margin="dense"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    disabled={isLoading}
                    required
                  />
                  <TextField
                    id="password"
                    label="Password"
                    type="password"
                    size="small"
                    margin="dense"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={isLoading}
                    required
                  />
                  <FormControlLabel
                    control={<Checkbox />}
                    label="Remember me"
                    disabled={isLoading}
                  />
                </Box>
              </CardContent>
              <CardActions>
                <Button 
                  type="submit" 
                  disabled={isLoading}
                  startIcon={isLoading ? <CircularProgress size={20} /> : null}
                >
                  {isLoading ? 'Logging in...' : 'Login'}
                </Button>
              </CardActions>
            </Card>
          </ModalBox>
        </form>
      </Modal>
    </>
  );
};

export default LoginModal;
