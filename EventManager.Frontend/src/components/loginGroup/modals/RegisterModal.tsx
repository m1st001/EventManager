import React, { useState, useEffect } from "react";
import {
  Alert,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CircularProgress,
  Modal,
  TextField,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { ModalBox } from "../../styles.ts";
import { RegisterRequest } from "../../../api/data-contracts.ts";
import { useDispatch } from "react-redux";
import { register } from "../../../store/thunks/authThunk.ts";
import { AppDispatch } from "../../../store/store.ts";

interface ModalProps {
  open: boolean;
  onClose: () => void;
}

const RegisterModal = (props: ModalProps) => {
  const dispatch: AppDispatch = useDispatch();
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [repeatPassword, setRepeatPassword] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [registerError, setRegisterError] = useState<string>("");
  const [registerSuccess, setRegisterSuccess] = useState<boolean>(false);

  // Password validation states
  const [hasMinLength, setHasMinLength] = useState<boolean>(false);
  const [hasUpperCase, setHasUpperCase] = useState<boolean>(false);
  const [hasLowerCase, setHasLowerCase] = useState<boolean>(false);
  const [hasDigit, setHasDigit] = useState<boolean>(false);
  const [hasSpecialChar, setHasSpecialChar] = useState<boolean>(false);
  const [showPasswordRequirements, setShowPasswordRequirements] = useState<boolean>(false);

  // Validate password whenever it changes
  useEffect(() => {
    setHasMinLength(password.length >= 6);
    setHasUpperCase(/[A-Z]/.test(password));
    setHasLowerCase(/[a-z]/.test(password));
    setHasDigit(/[0-9]/.test(password));
    setHasSpecialChar(/[^A-Za-z0-9]/.test(password));
  }, [password]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    // Validate passwords match
    if (password !== repeatPassword) {
      setPasswordError("Passwords do not match");
      return;
    }

    // Validate password meets all requirements
    if (!hasMinLength || !hasUpperCase || !hasLowerCase || !hasDigit || !hasSpecialChar) {
      setPasswordError("Password does not meet all requirements");
      setShowPasswordRequirements(true);
      return;
    }

    setPasswordError("");
    setIsLoading(true);
    setRegisterError("");
    setRegisterSuccess(false);

    const credentials: RegisterRequest = {
      username: username,
      email: email,
      password: password,
    };

    try {
      const result = await dispatch(register(credentials)).unwrap();
      if (result) {
        setRegisterSuccess(true);
        // Close the modal after a short delay to show the success message
        setTimeout(() => {
          props.onClose();
        }, 1500);
      } else {
        setRegisterError("Registration failed. Please try again.");
      }
    } catch (error: unknown) {
      if (error instanceof Error)
      setRegisterError(error.message || "An error occurred during registration.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal open={props.open} onClose={props.onClose}>
      <form onSubmit={handleSubmit}>
        <ModalBox>
          <Card>
            <CardContent>
              <Box marginBottom={2}>
                <Typography variant="h4" justifySelf="center">
                  Register
                </Typography>
              </Box>
              <Box display="flex" flexDirection="column">
                {registerSuccess && (
                  <Alert severity="success" sx={{ mb: 2 }}>
                    Registration successful! Logging you in...
                  </Alert>
                )}
                {registerError && (
                  <Alert severity="error" sx={{ mb: 2 }}>
                    {registerError}
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
                  id="email"
                  label="Email"
                  type="email"
                  size="small"
                  margin="dense"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                  onFocus={() => setShowPasswordRequirements(true)}
                  disabled={isLoading}
                  required
                />

                {showPasswordRequirements && (
                  <List dense sx={{ bgcolor: 'background.paper', mt: 1, mb: 1, borderRadius: 1, border: '1px solid #e0e0e0' }}>
                    <ListItem>
                      <ListItemIcon>
                        <Typography sx={{ color: hasMinLength ? 'success.main' : 'error.main', fontWeight: 'bold' }}>
                          {hasMinLength ? '✓' : '✗'}
                        </Typography>
                      </ListItemIcon>
                      <ListItemText primary="At least 6 characters" />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <Typography sx={{ color: hasUpperCase ? 'success.main' : 'error.main', fontWeight: 'bold' }}>
                          {hasUpperCase ? '✓' : '✗'}
                        </Typography>
                      </ListItemIcon>
                      <ListItemText primary="At least one uppercase letter" />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <Typography sx={{ color: hasLowerCase ? 'success.main' : 'error.main', fontWeight: 'bold' }}>
                          {hasLowerCase ? '✓' : '✗'}
                        </Typography>
                      </ListItemIcon>
                      <ListItemText primary="At least one lowercase letter" />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <Typography sx={{ color: hasDigit ? 'success.main' : 'error.main', fontWeight: 'bold' }}>
                          {hasDigit ? '✓' : '✗'}
                        </Typography>
                      </ListItemIcon>
                      <ListItemText primary="At least one digit" />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <Typography sx={{ color: hasSpecialChar ? 'success.main' : 'error.main', fontWeight: 'bold' }}>
                          {hasSpecialChar ? '✓' : '✗'}
                        </Typography>
                      </ListItemIcon>
                      <ListItemText primary="At least one special character" />
                    </ListItem>
                  </List>
                )}
                <TextField
                  id="repeatPassword"
                  label="Repeat password"
                  type="password"
                  size="small"
                  margin="dense"
                  value={repeatPassword}
                  onChange={(e) => setRepeatPassword(e.target.value)}
                  error={!!passwordError}
                  helperText={passwordError}
                  disabled={isLoading}
                  required
                />
              </Box>
            </CardContent>
            <CardActions>
              <Button 
                type="submit" 
                disabled={isLoading}
                startIcon={isLoading ? <CircularProgress size={20} /> : null}
              >
                {isLoading ? 'Registering...' : 'Register'}
              </Button>
              <Button 
                onClick={props.onClose} 
                disabled={isLoading}
              >
                Cancel
              </Button>
            </CardActions>
          </Card>
        </ModalBox>
      </form>
    </Modal>
  );
};

export default RegisterModal;
