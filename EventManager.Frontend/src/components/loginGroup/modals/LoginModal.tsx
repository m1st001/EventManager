import React, { useState, useEffect } from "react";
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
import { ModalBox } from "../../styles"; // Проверьте путь
import { LoginRequest } from "../../../api/data-contracts";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../../store/thunks/authThunk"; // Обновленный thunk
import { AppDispatch, RootState } from "../../../store/store"; // RootState для useSelector
import { clearAuthError } from "../../../store/slices/authSlice"; // Для сброса ошибок

interface ModalProps {
  open: boolean;
  onClose: () => void;
}

const LoginModal = (props: ModalProps) => {
  const dispatch: AppDispatch = useDispatch();
  const { isLoading, error: authError, isAuthenticated } = useSelector((state: RootState) => state.auth);

  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [rememberMe, setRememberMe] = useState<boolean>(false); // Для чекбокса "Remember me"

  const [loginSuccessMessage, setLoginSuccessMessage] = useState<boolean>(false);

  // Сбрасываем ошибку при открытии/закрытии модального окна или при изменении полей
  useEffect(() => {
    if (props.open) {
      dispatch(clearAuthError());
      setLoginSuccessMessage(false); // Сбрасываем сообщение об успехе
    }
  }, [props.open, dispatch]);


  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    dispatch(clearAuthError()); // Очищаем предыдущие ошибки
    setLoginSuccessMessage(false);

    const credentials: LoginRequest = {
      username: username,
      password: password,
    };

    try {
      // Используем unwrap для получения результата thunk'а или выброса ошибки
      await dispatch(loginUser({ credentials, rememberMe })).unwrap();
      // Если unwrap не выбросил ошибку, значит логин (и последующий checkAuthStatus) успешен
      setLoginSuccessMessage(true);
      // Закрываем модальное окно после небольшой задержки
      setTimeout(() => {
        props.onClose();
        setLoginSuccessMessage(false); // Сбрасываем сообщение перед следующим открытием
      }, 1500);
    } catch (error) {
      // Ошибка уже должна быть в authError из Redux state,
      // но можно оставить локальный обработчик, если нужно специфичное поведение.
      // authError из Redux state будет отображен ниже.
      console.error("Login failed:", error);
    }
  };

  return (
      <Modal open={props.open} onClose={props.onClose}>
        <form onSubmit={handleSubmit}>
          <ModalBox>
            <Card>
              <CardContent>
                <Box marginBottom={2}>
                  <Typography variant="h4" component="h2" align="center"> {/* Используем component и align для лучшей семантики и выравнивания */}
                    Login
                  </Typography>
                </Box>
                <Box display="flex" flexDirection="column">
                  {loginSuccessMessage && (
                      <Alert severity="success" sx={{ mb: 2 }}>
                        Login successful! Redirecting...
                      </Alert>
                  )}
                  {authError && !loginSuccessMessage && ( // Показываем ошибку только если нет сообщения об успехе
                      <Alert severity="error" sx={{ mb: 2 }}>
                        {authError}
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
                      autoFocus // Удобно для пользователя
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
                      control={
                        <Checkbox
                            checked={rememberMe}
                            onChange={(e) => setRememberMe(e.target.checked)}
                            disabled={isLoading}
                        />
                      }
                      label="Remember me"
                  />
                </Box>
              </CardContent>
              <CardActions sx={{ justifyContent: 'flex-end', paddingRight: 2, paddingBottom: 2 }}> {/* Выравниваем кнопку */}
                <Button
                    type="submit"
                    variant="contained" // Делаем кнопку более заметной
                    disabled={isLoading}
                    startIcon={isLoading ? <CircularProgress size={20} color="inherit" /> : null}
                >
                  {isLoading ? 'Logging in...' : 'Login'}
                </Button>
              </CardActions>
            </Card>
          </ModalBox>
        </form>
      </Modal>
  );
};

export default LoginModal;