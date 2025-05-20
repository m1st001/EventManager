import React, { useEffect } from "react";
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
import { useForm } from "react-hook-form";
import { ModalBox } from "../../styles.ts";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../store/store.ts";
import ErrorIcon from "@mui/icons-material/Error";
import CheckIcon from "@mui/icons-material/Check";
import { registerUser } from "../../../store/thunks/authThunk.ts";

interface ModalProps {
  open: boolean;
  onClose: () => void;
}

interface IFormInput {
  username: string;
  email: string;
  password: string;
  repeatPassword: string;
}

const RegisterModal = (props: ModalProps) => {
  const dispatch: AppDispatch = useDispatch();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isValid },
    trigger,
  } = useForm<IFormInput>({
    mode: "onChange",
    defaultValues: {
      username: "",
      email: "",
      password: "",
      repeatPassword: "",
    },
  });

  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [registerError, setRegisterError] = React.useState<string>("");
  const [registerSuccess, setRegisterSuccess] = React.useState<boolean>(false);

  const password = watch("password");
  const hasMinLength = password?.length >= 6; // Added optional chaining
  const hasDigit = /[0-9]/.test(password || ""); // Added fallback for null/undefined
  const showPasswordRequirements = Boolean(password); // Convert to boolean

  useEffect(() => {
    if (props.open) {
      reset();
      setRegisterError("");
      setRegisterSuccess(false);
    }
  }, [props.open, reset]);

  const onSubmit = async (data: IFormInput) => {
    setIsLoading(true);
    setRegisterError("");
    setRegisterSuccess(false);

    try {
      await dispatch(registerUser({
        username: data.username,
        email: data.email,
        password: data.password
      })).unwrap();
      setRegisterSuccess(true);
      setTimeout(() => props.onClose(), 1500);
    } catch (error: unknown) {
      if (error instanceof Error) {
        setRegisterError(error.message || "An error occurred during registration.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
      <Modal open={props.open} onClose={props.onClose}>
        <ModalBox>
          <Card component="form" onSubmit={handleSubmit(onSubmit)}>
            <CardContent>
              <Box marginBottom={2}>
                <Typography variant="h4" justifySelf="center">
                  Register
                </Typography>
              </Box>
              <Box display="flex" flexDirection="column" gap={1}>
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
                    disabled={isLoading}
                    {...register("username", {
                      required: "Username is required",
                      minLength: {
                        value: 3,
                        message: "Username must be at least 3 characters",
                      },
                    })}
                    error={!!errors.username}
                    helperText={errors.username?.message}
                />
                <TextField
                    id="email"
                    label="Email"
                    type="email"
                    size="small"
                    margin="dense"
                    disabled={isLoading}
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Invalid email address",
                      },
                    })}
                    error={!!errors.email}
                    helperText={errors.email?.message}
                />
                <TextField
                    id="password"
                    label="Password"
                    type="password"
                    size="small"
                    margin="dense"
                    disabled={isLoading}
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 6,
                        message: "Password must be at least 6 characters",
                      },
                      pattern: {
                        value: /[0-9]/,
                        message: "Password must contain at least one digit",
                      },
                      onChange: () => trigger("repeatPassword"),
                    })}
                    error={!!errors.password}
                    helperText={errors.password?.message}
                />

                {showPasswordRequirements && (
                    <List
                        dense
                        sx={{
                          bgcolor: "background.paper",
                          mt: 1,
                          mb: 1,
                          borderRadius: 1,
                          border: "1px solid #e0e0e0",
                        }}
                    >
                      <ListItem>
                        <ListItemIcon>
                          {hasMinLength ? (
                              <CheckIcon color="success" />
                          ) : (
                              <ErrorIcon color="error" />
                          )}
                        </ListItemIcon>
                        <ListItemText primary="At least 6 characters" />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon>
                          {hasDigit ? (
                              <CheckIcon color="success" />
                          ) : (
                              <ErrorIcon color="error" />
                          )}
                        </ListItemIcon>
                        <ListItemText primary="At least one digit" />
                      </ListItem>
                    </List>
                )}
                <TextField
                    id="repeatPassword"
                    label="Repeat password"
                    type="password"
                    size="small"
                    margin="dense"
                    disabled={isLoading}
                    {...register("repeatPassword", {
                      required: "Please repeat your password",
                      validate: (value) =>
                          value === watch("password") || "Passwords do not match",
                    })}
                    error={!!errors.repeatPassword}
                    helperText={errors.repeatPassword?.message}
                />
              </Box>
            </CardContent>
            <CardActions>
              <Button
                  type="submit"
                  disabled={isLoading || !isValid}
                  startIcon={isLoading ? <CircularProgress size={20} /> : null}
              >
                {isLoading ? "Registering..." : "Register"}
              </Button>
              <Button onClick={props.onClose} disabled={isLoading}>
                Cancel
              </Button>
            </CardActions>
          </Card>
        </ModalBox>
      </Modal>
  );
};

export default RegisterModal;