import React from "react";
import { CardContent, Typography } from "@mui/material";
import { StyledContentBox, StyledWarningCard } from "../../styles.ts";
import ErrorIcon from "@mui/icons-material/Error";

const WarningCard = ({
  message,
  title,
}: {
  message: string;
  title: string;
}) => {
  return (
    <StyledWarningCard>
      <CardContent sx={{ pt: "5px" }}>
        <StyledContentBox alignItems="center" justifySelf="flex-start">
          <ErrorIcon />
          <Typography sx={{ ml: "10px", fontSize: "20px" }}>{title}</Typography>
        </StyledContentBox>
        <Typography component="div">{message}</Typography>
      </CardContent>
    </StyledWarningCard>
  );
};

export default WarningCard;
