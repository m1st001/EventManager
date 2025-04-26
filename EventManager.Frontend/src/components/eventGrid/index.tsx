import React, { useState, SyntheticEvent } from "react";
import { Tabs, Tab, Box } from "@mui/material";
import { StyledContentBox } from "../styles.ts";
import { useSelector } from "react-redux";
import { TabPanel, tabsProps } from "./utils.tsx";
import AllEventsTab from "./AllEventsTab.tsx";
import SubscribedEventsTab from "./SubscribedEventsTab.tsx";
import EventHistoryTab from "./EventHistoryTab.tsx";
import { RootState } from "../../store/store.ts";

const EventGrid = () => {
  const [tabValue, setTabValue] = useState(0);
  const { isLoggedIn } = useSelector((state: RootState) => state.session);

  const handleTabChange = (_event: SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };
  
  interface ITab {
      index: number;
      name: string;
  }
  
  const tabs : ITab[] = [
      {index: 0, name: "All Events"},
      {index: 1, name: "My Subscriptions"},
      {index: 2, name: "My Event History"}
  ];

  return (
    <StyledContentBox sx={{ flexGrow: 1, flexDirection: "column", marginTop: 0 }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs 
          value={tabValue} 
          onChange={handleTabChange} 
          aria-label="event tabs"
          centered
        >
            {tabs.map((tab) => {
                return <Tab label={tab.name} {...tabsProps(tab.index)} />;
            })}
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
