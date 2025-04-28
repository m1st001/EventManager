import React from "react";
import { Card, CardContent, Typography } from "@mui/material";

const UserStats = () => {
  return (
    <Card>
      <CardContent>
        <Typography gutterBottom sx={{ color: "text.secondary", fontSize: 14 }}>
          Word of the Day
        </Typography>
        <Typography variant="h5" component="div">
          1243
        </Typography>
        <Typography sx={{ color: "text.secondary", mb: 1.5 }}>
          adjective
        </Typography>
        <Typography variant="body2">
          well meaning and kindly.
          <br />
          {'"a benevolent smile"'}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default UserStats;
