import React from "react";
import * as Yup from "yup";
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
import { ErrorMessage, Form, Formik, FormikValues } from "formik";
import { CreateEventRequest } from "../api/data-contracts.ts";
import { useSelector } from "react-redux";
import { RootState } from "../store/store.ts";

const CreateEventForm = () => {
  const session = useSelector((state: RootState) => state.session);
  const initialValues: CreateEventRequest = {
    name: "",
    description: "",
    creatorId: session.userId,
    startDate: "",
    tags: [],
  };

  const handleSubmit = (values: CreateEventRequest) => {
    console.log("Form data", values);
    setSubmitting();
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, "Name must be at least 3 characters")
      .max(20, "Name must not exceed 20 characters")
      .nullable(),
    description: Yup.string()
      .max(80, "Description must not exceed 80 characters")
      .nullable(),
    startDate: Yup.date()
      .required("Start date is required")
      .typeError("Invalid date format"),
    creatorId: Yup.number().nullable(),
    tags: Yup.array().of(Yup.string()).nullable(),
  });

  return (
    <div>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {({ values, handleChange, isSubmitting, errors }) => (
          <Form>
            <Card sx={{ my: 4 }}>
              <CardContent>
                <Typography justifySelf="center" variant="h3">
                  Create event
                </Typography>
                <Box display="flex" flexDirection="column">
                  <TextField
                    label="Name"
                    name="name"
                    value={values.name ?? ""}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    error={Boolean(errors.name)}
                    helperText={errors.name}
                  />
                  <TextField
                    label="Description"
                    name="description"
                    value={values.description ?? ""}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    error={Boolean(errors.description)}
                    helperText={errors.description}
                  />
                  <Box sx={{ mt: 1 }}>
                    <LocalizationProvider dateAdapter={AdapterLuxon}>
                      <DatePicker
                        name="startDate"
                        label="Start Date"
                        sx={{ mr: 2 }}
                      />
                      <TimePicker
                        name="startTime"
                        label="Start Time"
                        sx={{ mr: 2 }}
                      />
                    </LocalizationProvider>
                    <TextField
                      id="participants"
                      name="participants"
                      label="Participants"
                    />
                  </Box>
                </Box>
              </CardContent>

              <CardActions>
                <Button type="submit" disabled={isSubmitting}>
                  Create
                </Button>
              </CardActions>
            </Card>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CreateEventForm;
