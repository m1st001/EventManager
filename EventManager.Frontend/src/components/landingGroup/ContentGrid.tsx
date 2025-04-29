import React from "react";
import { StyledContentBox } from "../styles.ts";
import { Grid } from "@mui/material";
import WarningCard from "./content/WarningCard.tsx";
import Recommendations from "./content/Recommendations.tsx";
import InfoPage from "./content/InfoPage.tsx";
import UserStats from "./content/UserStats.tsx";

const ContentGrid = () => {
  return (
    <StyledContentBox>
      <Grid container spacing={2} justifyContent="center">
        <Grid size={4}>
          <WarningCard
            title="Early access product"
            message="EventManager is in early access, please report any bug or issue you might find."
          />
        </Grid>
        <Grid size={8}>
          <Recommendations />
        </Grid>
        <Grid size={4}>
          <InfoPage />
        </Grid>
        <Grid size={8}>
          <UserStats />
        </Grid>
      </Grid>
    </StyledContentBox>
  );
};

export default ContentGrid;
