import React from "react";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  TextField,
  Typography,
} from "@mui/material";
import {
  DatePicker,
  LocalizationProvider,
  TimePicker,
} from "@mui/x-date-pickers";
import { AdapterLuxon } from "@mui/x-date-pickers/AdapterLuxon";

const CreateEventForm = () => {
  return (
    <div>
      <Card sx={{ my: 4 }}>
        <CardContent>
          <Typography justifySelf="center" variant="h3">
            Create event
          </Typography>
          <Box display="flex" flexDirection="column">
            <TextField
              id="name"
              label="Name"
              variant="outlined"
              size="small"
              margin="dense"
            />
            <TextField
              id="description"
              label="Descriprion"
              variant="outlined"
              size="small"
              margin="dense"
            />
            <Box sx={{ mt: 1 }}>
              <LocalizationProvider dateAdapter={AdapterLuxon}>
                <DatePicker label="Start Date" sx={{ mr: 2 }} />
                <TimePicker label="Start Time" sx={{ mr: 2 }} />
              </LocalizationProvider>
              <TextField id="participants" label="Participants" />
            </Box>
          </Box>
        </CardContent>

        <CardActions>
          <Button>Create</Button>
        </CardActions>
      </Card>
    </div>
  );
};

export default CreateEventForm;
