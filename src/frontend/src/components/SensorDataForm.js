import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  FormControlLabel,
  Grid,
  Slider,
  Switch,
  TextField,
  Typography,
} from '@mui/material';
import {
  Thermostat as ThermostatIcon,
  Opacity as OpacityIcon,
  Science as ScienceIcon,
  WaterDrop as WaterDropIcon,
  Save as SaveIcon,
  Cancel as CancelIcon,
} from '@mui/icons-material';

/**
 * A form component for adding or editing sensor data
 * 
 * @param {Object} props - Component props
 * @param {Object} props.initialData - Initial data for the form (for editing)
 * @param {Function} props.onSubmit - Function to call when form is submitted
 * @param {Function} props.onCancel - Function to call when form is cancelled
 */
function SensorDataForm({ initialData = null, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    temperature: 25.0,
    humidity: 50.0,
    ph: 7.0,
    irrigation: false,
  });

  // If initialData is provided, use it to initialize the form
  useEffect(() => {
    if (initialData) {
      setFormData({
        temperature: initialData.temperature,
        humidity: initialData.humidity,
        ph: initialData.ph,
        irrigation: initialData.irrigation,
      });
    }
  }, [initialData]);

  const handleChange = (field) => (event, newValue) => {
    setFormData({
      ...formData,
      [field]: field === 'irrigation' ? event.target.checked : (newValue !== undefined ? newValue : event.target.value),
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({
      ...formData,
      temperature: Number(formData.temperature),
      humidity: Number(formData.humidity),
      ph: Number(formData.ph),
    });
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {initialData ? 'Edit Sensor Reading' : 'Add New Sensor Reading'}
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
          <Grid container spacing={3}>
            {/* Temperature */}
            <Grid item xs={12} md={6}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <ThermostatIcon sx={{ mr: 1, color: '#f44336' }} />
                <Typography variant="subtitle1">Temperature (°C)</Typography>
              </Box>
              <Slider
                value={typeof formData.temperature === 'number' ? formData.temperature : 25}
                onChange={handleChange('temperature')}
                aria-labelledby="temperature-slider"
                valueLabelDisplay="auto"
                step={0.1}
                min={0}
                max={50}
                sx={{ color: '#f44336' }}
              />
              <TextField
                margin="dense"
                id="temperature"
                label="Temperature"
                type="number"
                fullWidth
                variant="outlined"
                value={formData.temperature}
                onChange={handleChange('temperature')}
                InputProps={{
                  endAdornment: <Typography variant="body2">°C</Typography>,
                  inputProps: { step: 0.1, min: 0, max: 50 },
                }}
              />
            </Grid>

            {/* Humidity */}
            <Grid item xs={12} md={6}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <OpacityIcon sx={{ mr: 1, color: '#2196f3' }} />
                <Typography variant="subtitle1">Humidity (%)</Typography>
              </Box>
              <Slider
                value={typeof formData.humidity === 'number' ? formData.humidity : 50}
                onChange={handleChange('humidity')}
                aria-labelledby="humidity-slider"
                valueLabelDisplay="auto"
                step={0.1}
                min={0}
                max={100}
                sx={{ color: '#2196f3' }}
              />
              <TextField
                margin="dense"
                id="humidity"
                label="Humidity"
                type="number"
                fullWidth
                variant="outlined"
                value={formData.humidity}
                onChange={handleChange('humidity')}
                InputProps={{
                  endAdornment: <Typography variant="body2">%</Typography>,
                  inputProps: { step: 0.1, min: 0, max: 100 },
                }}
              />
            </Grid>

            {/* pH Level */}
            <Grid item xs={12} md={6}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <ScienceIcon sx={{ mr: 1, color: '#9c27b0' }} />
                <Typography variant="subtitle1">pH Level</Typography>
              </Box>
              <Slider
                value={typeof formData.ph === 'number' ? formData.ph : 7}
                onChange={handleChange('ph')}
                aria-labelledby="ph-slider"
                valueLabelDisplay="auto"
                step={0.1}
                min={0}
                max={14}
                sx={{ color: '#9c27b0' }}
              />
              <TextField
                margin="dense"
                id="ph"
                label="pH Level"
                type="number"
                fullWidth
                variant="outlined"
                value={formData.ph}
                onChange={handleChange('ph')}
                InputProps={{
                  inputProps: { step: 0.1, min: 0, max: 14 },
                }}
              />
            </Grid>

            {/* Irrigation */}
            <Grid item xs={12} md={6}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <WaterDropIcon sx={{ mr: 1, color: '#4caf50' }} />
                <Typography variant="subtitle1">Irrigation</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={formData.irrigation}
                      onChange={handleChange('irrigation')}
                      color="success"
                    />
                  }
                  label={formData.irrigation ? "ON" : "OFF"}
                />
              </Box>
            </Grid>

            {/* Form Actions */}
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                <Button
                  variant="outlined"
                  onClick={onCancel}
                  startIcon={<CancelIcon />}
                  sx={{ mr: 1 }}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  startIcon={<SaveIcon />}
                >
                  {initialData ? 'Update' : 'Save'}
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </CardContent>
    </Card>
  );
}

export default SensorDataForm; 