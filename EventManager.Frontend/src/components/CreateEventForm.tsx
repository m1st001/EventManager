import React, { useState } from "react";
import {
  Alert,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CircularProgress,
  TextField,
  Typography,
} from "@mui/material";
import {
  DatePicker,
  LocalizationProvider,
  TimePicker,
} from "@mui/x-date-pickers";
import { AdapterLuxon } from "@mui/x-date-pickers/AdapterLuxon";
import { DateTime } from "luxon";
import { CreateEventRequest } from "../api/data-contracts.ts";
import { eventsClient } from "../api/apiConfig.ts";
import { useSelector } from "react-redux";
import { RootState } from "../store/store.ts";

const CreateEventForm = () => {
  // Form state
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [startDate, setStartDate] = useState<DateTime | null>(null);
  const [startTime, setStartTime] = useState<DateTime | null>(null);
  const [maxParticipants, setMaxParticipants] = useState<string>("");

  // UI state
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<boolean>(false);

  // Validation state
  const [nameError, setNameError] = useState<string>("");
  const [descriptionError, setDescriptionError] = useState<string>("");
  const [dateTimeError, setDateTimeError] = useState<string>("");
  const [participantsError, setParticipantsError] = useState<string>("");

  // Get current user ID from Redux store
  const userId = useSelector((state: RootState) => state.auth.user?.id);

  const validateForm = (): boolean => {
    let isValid = true;

    // Validate name (3-20 chars)
    if (!name || name.length < 3 || name.length > 20) {
      setNameError("Name must be between 3 and 20 characters");
      isValid = false;
    } else {
      setNameError("");
    }

    // Validate description (max 80 chars)
    if (description && description.length > 80) {
      setDescriptionError("Description must be less than 80 characters");
      isValid = false;
    } else {
      setDescriptionError("");
    }

    // Validate date and time
    if (!startDate || !startTime) {
      setDateTimeError("Start date and time are required");
      isValid = false;
    } else {
      setDateTimeError("");
    }

    // Validate participants (min 2)
    const participants = parseInt(maxParticipants);
    if (isNaN(participants) || participants < 2) {
      setParticipantsError("Minimum 2 participants required");
      isValid = false;
    } else {
      setParticipantsError("");
    }

    return isValid;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    // Reset states
    setError("");
    setSuccess(false);

    // Validate form
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    // Combine date and time
    let combinedDateTime = null;
    if (startDate && startTime) {
      combinedDateTime = startDate.set({
        hour: startTime.hour,
        minute: startTime.minute,
        second: 0,
        millisecond: 0
      });
    }

    const request: CreateEventRequest = {
      name: name,
      description: description,
      startDate: combinedDateTime ? (combinedDateTime.toISO())! : "",
      creatorId: userId,
      tags: [],
      maxParticipants: parseInt(maxParticipants)
    };

    try {
      await eventsClient.eventsCreate(request);
      setSuccess(true);

      // Reset form after successful submission
      setName("");
      setDescription("");
      setStartDate(null);
      setStartTime(null);
      setMaxParticipants("");

      // Hide success message after 3 seconds
      setTimeout(() => {
        setSuccess(false);
      }, 3000);
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message || "Failed to create event");
      } else {
        setError("An unexpected error occurred");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Card sx={{ my: 4 }}>
          <CardContent>
            <Typography justifySelf="center" variant="h3">
              Create event
            </Typography>

            {success && (
              <Alert severity="success" sx={{ mt: 2, mb: 2 }}>
                Event created successfully!
              </Alert>
            )}

            {error && (
              <Alert severity="error" sx={{ mt: 2, mb: 2 }}>
                {error}
              </Alert>
            )}

            <Box display="flex" flexDirection="column">
              <TextField
                id="name"
                label="Name"
                variant="outlined"
                size="small"
                margin="dense"
                value={name}
                onChange={(e) => setName(e.target.value)}
                error={!!nameError}
                helperText={nameError}
                disabled={isLoading}
                required
              />
              <TextField
                id="description"
                label="Description"
                variant="outlined"
                size="small"
                margin="dense"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                error={!!descriptionError}
                helperText={descriptionError}
                disabled={isLoading}
              />
              <Box sx={{ mt: 1 }}>
                <LocalizationProvider dateAdapter={AdapterLuxon}>
                  <DatePicker 
                    label="Start Date" 
                    sx={{ mr: 2 }} 
                    value={startDate}
                    onChange={(newDate) => setStartDate(newDate)}
                    disabled={isLoading}
                  />
                  <TimePicker 
                    label="Start Time" 
                    sx={{ mr: 2 }} 
                    value={startTime}
                    onChange={(newTime) => setStartTime(newTime)}
                    disabled={isLoading}
                  />
                  <TextField 
                    id="participants" 
                    label="Max Participants" 
                    type="number"
                    value={maxParticipants}
                    onChange={(e) => setMaxParticipants(e.target.value)}
                    error={!!participantsError}
                    helperText={participantsError}
                    disabled={isLoading}
                    inputProps={{ min: 2 }}
                    required
                  />
                </LocalizationProvider>
                {dateTimeError && (
                  <Typography color="error" variant="caption" display="block" sx={{ mt: 1 }}>
                    {dateTimeError}
                  </Typography>
                )}
                {participantsError && (
                  <Typography color="error" variant="caption" display="block" sx={{ mt: 1 }}>
                    {participantsError}
                  </Typography>
                )}
              </Box>
            </Box>
          </CardContent>

          <CardActions>
            <Button 
              type="submit" 
              disabled={isLoading}
              startIcon={isLoading ? <CircularProgress size={20} /> : null}
            >
              {isLoading ? 'Creating...' : 'Create'}
            </Button>
          </CardActions>
        </Card>
      </form>
    </div>
  );
};

export default CreateEventForm;
