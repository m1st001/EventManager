import React from "react";
import { useNavigate } from "react-router";
import { 
  Box, 
  Typography, 
  Button, 
  Paper, 
  Container,
  Stack
} from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import HomeIcon from "@mui/icons-material/Home";

const ErrorPage = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <Container maxWidth="md" sx={{ mt: 8, mb: 8 }}>
      <Paper 
        elevation={3} 
        sx={{ 
          p: 4, 
          borderRadius: 2,
          border: '1px solid #f44336',
          backgroundColor: 'rgba(244, 67, 54, 0.08)'
        }}
      >
        <Stack spacing={3} alignItems="center">
          <ErrorOutlineIcon color="error" sx={{ fontSize: 64 }} />

          <Typography variant="h4" component="h1" color="error" gutterBottom>
            Oops! Something went wrong
          </Typography>

          <Typography variant="body1" align="center">
            We're sorry, but we encountered an unexpected error while processing your request.
          </Typography>

          <Box sx={{ mt: 2 }}>
            <Typography variant="body1" component="div" align="center">
              <strong>What you can try:</strong>
              <ul style={{ textAlign: 'left', marginTop: '8px' }}>
                <li>Refresh the page</li>
                <li>Check your internet connection</li>
                <li>Return to the home page</li>
                <li>Try again later</li>
              </ul>
            </Typography>
          </Box>

          <Button 
            variant="contained" 
            color="primary" 
            startIcon={<HomeIcon />}
            onClick={handleGoHome}
            sx={{ mt: 2 }}
          >
            Back to Home
          </Button>
        </Stack>
      </Paper>
    </Container>
  );
};

export default ErrorPage;
