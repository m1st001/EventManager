import {
  AppBar,
  AppBarProps,
  Box,
  BoxProps,
  Card,
  CardProps,
  styled,
} from "@mui/material";

export const StyledNavbar = styled(AppBar)<AppBarProps>(() => ({
  border: "solid",
  borderRadius: 18,
}));
export const StyledContentBox = styled(Box)<BoxProps>(() => ({
  border: "solid",
  marginTop: 20,
  marginBottom: 20,
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
}));
export const StyledEventCard = styled(Card)<CardProps>(() => ({}));
export const StyledLoginGroup = styled("div")(() => ({
  position: "relative",
}));
