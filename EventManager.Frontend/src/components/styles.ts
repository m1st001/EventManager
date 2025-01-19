import {
  AppBar,
  AppBarProps,
  Box,
  BoxProps,
  Card,
  CardProps,
  styled,
} from "@mui/material";

export const StyledNavbar = styled(AppBar)<AppBarProps>(() => ({}));
export const StyledContentBox = styled(Box)<BoxProps>(() => ({
  marginTop: 20,
  marginBottom: 20,
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
}));
export const StyledEventCard = styled(Card)<CardProps>(() => ({
  transition: "transform 0.2s, box-shadow 0.2s",
  "&:hover": {
    transform: "scale(1.05)",
    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
  },
  "&:active": {
    transform: "scale(1)",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
  },
}));
export const StyledLoginGroup = styled("div")(() => ({
  position: "relative",
}));
export const ModalBox = styled(Box)<BoxProps>(() => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  p: 4,
}));
