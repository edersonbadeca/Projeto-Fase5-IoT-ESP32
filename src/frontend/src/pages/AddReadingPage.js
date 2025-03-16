import React, { useState } from 'react';
import { Box, Typography, Alert, Snackbar, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import SensorDataForm from '../components/SensorDataForm';
import { sensorDataApi } from '../services/api';

function AddReadingPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (formData) => {
    try {
      setLoading(true);
      setError(null);
      
      await sensorDataApi.create(formData);
      
      setSuccess(true);
      setTimeout(() => {
        navigate('/sensor-data');
      }, 2000);
    } catch (err) {
      console.error('Error adding sensor data:', err);
      setError('Failed to add sensor data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate('/sensor-data');
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Add New Sensor Reading
      </Typography>
      
      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}
      
      <Paper sx={{ p: 3, mt: 3 }}>
        <SensorDataForm
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />
      </Paper>
      
      <Snackbar
        open={success}
        autoHideDuration={2000}
        onClose={() => setSuccess(false)}
      >
        <Alert severity="success" sx={{ width: '100%' }}>
          Sensor reading added successfully!
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default AddReadingPage; 