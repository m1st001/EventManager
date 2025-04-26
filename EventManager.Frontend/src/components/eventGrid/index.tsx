import React, { useState, SyntheticEvent } from "react";
import { Tabs, Tab, Box } from "@mui/material";
import { StyledContentBox } from "../styles.ts";
import { useSelector } from "react-redux";
import { TabPanel, a11yProps } from "./utils.tsx";
import AllEventsTab from "./AllEventsTab.tsx";
import SubscribedEventsTab from "./SubscribedEventsTab.tsx";
import EventHistoryTab from "./EventHistoryTab.tsx";

const EventGrid = () => {
  const [tabValue, setTabValue] = useState(0);
  const { isLoggedIn } = useSelector((state: any) => state.session);

  const handleTabChange = (_event: SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <StyledContentBox sx={{ flexGrow: 1, flexDirection: "column" }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs 
          value={tabValue} 
          onChange={handleTabChange} 
          aria-label="event tabs"
          centered
        >
          <Tab label="All Events" {...a11yProps(0)} />
          <Tab 
            label="My Subscriptions" 
            {...a11yProps(1)} 
            disabled={!isLoggedIn}
            title={!isLoggedIn ? "Please log in to view your subscriptions" : ""}
          />
          <Tab 
            label="My Event History" 
            {...a11yProps(2)} 
            disabled={!isLoggedIn}
            title={!isLoggedIn ? "Please log in to view your event history" : ""}
          />
        </Tabs>
      </Box>

      <TabPanel value={tabValue} index={0}>
        <AllEventsTab />
      </TabPanel>

      <TabPanel value={tabValue} index={1}>
        <SubscribedEventsTab />
      </TabPanel>

      <TabPanel value={tabValue} index={2}>
        <EventHistoryTab />
      </TabPanel>
    </StyledContentBox>
  );
};

export default EventGrid;