import React, { useState, SyntheticEvent } from "react";
import { Tabs, Tab, Box } from "@mui/material";
import { StyledContentBox } from "../styles.ts";
import { TabPanel, tabsProps } from "./utils.tsx";
import AllEventsTab from "./tabs/AllEventsTab.tsx";
import SubscribedEventsTab from "./tabs/SubscribedEventsTab.tsx";
import {EventHistoryTab} from "./tabs/EventHistoryTab.tsx";

const EventGrid = () => {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (_event: SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  interface ITab {
    index: number;
    name: string;
    content: React.ReactNode;
  }

  const tabs: ITab[] = [
    { index: 0, name: "All Events", content: <AllEventsTab /> },
    { index: 1, name: "My Subscriptions", content: <SubscribedEventsTab /> },
    { index: 2, name: "My Event History", content: <EventHistoryTab /> },
  ];

  return (
    <StyledContentBox
      sx={{ flexGrow: 1, flexDirection: "column", marginTop: 0 }}
    >
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={tabValue} onChange={handleTabChange} centered>
          {tabs.map((tab) => {
            return (
              <Tab label={tab.name} {...tabsProps(tab.index)} key={tab.index} />
            );
          })}
        </Tabs>
      </Box>

      {tabs.map((tab) => {
        return (
          <TabPanel value={tabValue} index={tab.index} key={tab.index}>
            {tab.content}
          </TabPanel>
        );
      })}
    </StyledContentBox>
  );
};

export default EventGrid;
