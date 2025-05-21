import React, { useEffect } from "react";
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
import { useForm } from "react-hook-form";
import { ModalBox } from "../../styles";
import { LoginRequest } from "../../../api/data-contracts";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../../store/thunks/authThunk";
import { AppDispatch, RootState } from "../../../store/store";

interface ModalProps {
  open: boolean;
  onClose: () => void;
}

const LoginModal = (props: ModalProps) => {
  const dispatch: AppDispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
  } = useForm<LoginRequest & { rememberMe: boolean }>({
    defaultValues: {
      username: "",
      password: "",
      rememberMe: false,
    },
  });

  const { isLoading } = useSelector((state: RootState) => state.auth);
  const [loginSuccessMessage, setLoginSuccessMessage] = React.useState<boolean>(false);
  const rememberMe = watch("rememberMe");

  useEffect(() => {
    if (props.open) {
      setLoginSuccessMessage(false);
      reset();
    }
  }, [props.open, dispatch, reset]);

  const onSubmit = async (data: LoginRequest) => {
    setLoginSuccessMessage(false);

    await dispatch(loginUser({ ...data })).unwrap();
    setLoginSuccessMessage(true);
    setTimeout(() => {
      props.onClose();
      setLoginSuccessMessage(false);
    }, 1500);
  };

  return (
      <Modal open={props.open} onClose={props.onClose}>
        <ModalBox>
          <Card component="form" onSubmit={handleSubmit(onSubmit)}>
            <CardContent>
              <Box marginBottom={2}>
                <Typography variant="h4" component="h2" align="center">
                  Login
                </Typography>
              </Box>
              <Box display="flex" flexDirection="column">
                {loginSuccessMessage && (
                    <Alert severity="success" sx={{ mb: 2 }}>
                      Login successful! Redirecting...
                    </Alert>
                )}
                <TextField
                    id="username"
                    label="Username"
                    size="small"
                    margin="dense"
                    disabled={isLoading}
                    autoFocus
                    {...register("username", { required: "Username is required" })}
                    error={!!errors.username}
                    helperText={errors.username?.message}
                />
                <TextField
                    id="password"
                    label="Password"
                    type="password"
                    size="small"
                    margin="dense"
                    disabled={isLoading}
                    {...register("password", { required: "Password is required" })}
                    error={!!errors.password}
                    helperText={errors.password?.message}
                />
                <FormControlLabel
                    control={
                      <Checkbox
                          checked={rememberMe}
                          onChange={(e) => setValue("rememberMe", e.target.checked)}
                          disabled={isLoading}
                      />
                    }
                    label="Remember me"
                />
              </Box>
            </CardContent>
            <CardActions sx={{ justifyContent: 'flex-end', paddingRight: 2, paddingBottom: 2 }}>
              <Button
                  type="submit"
                  variant="contained"
                  disabled={isLoading}
                  startIcon={isLoading ? <CircularProgress size={20} color="inherit" /> : null}
              >
                {isLoading ? 'Logging in...' : 'Login'}
              </Button>
            </CardActions>
          </Card>
        </ModalBox>
      </Modal>
  );
};

export default LoginModal;