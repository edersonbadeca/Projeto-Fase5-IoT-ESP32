import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Divider,
  FormControl,
  FormControlLabel,
  FormGroup,
  Switch,
  Slider,
  TextField,
  Button,
  Alert,
  Snackbar,
  Grid,
} from '@mui/material';
import {
  Save as SaveIcon,
  Refresh as RefreshIcon,
} from '@mui/icons-material';

function SettingsPage() {
  const [settings, setSettings] = useState({
    // Display settings
    darkMode: false,
    refreshInterval: 30,
    
    // Notification settings
    enableNotifications: true,
    temperatureAlertThreshold: 30,
    humidityAlertThreshold: 20,
    phAlertThreshold: 5.5,
    
    // System settings
    autoIrrigation: true,
    irrigationThreshold: 40,
  });
  
  const [success, setSuccess] = useState(false);

  const handleSwitchChange = (event) => {
    setSettings({
      ...settings,
      [event.target.name]: event.target.checked,
    });
  };

  const handleSliderChange = (name) => (event, newValue) => {
    setSettings({
      ...settings,
      [name]: newValue,
    });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setSettings({
      ...settings,
      [name]: value,
    });
  };

  const handleSave = () => {
    // In a real app, this would save to backend
    console.log('Saving settings:', settings);
    setSuccess(true);
  };

  const handleReset = () => {
    setSettings({
      darkMode: false,
      refreshInterval: 30,
      enableNotifications: true,
      temperatureAlertThreshold: 30,
      humidityAlertThreshold: 20,
      phAlertThreshold: 5.5,
      autoIrrigation: true,
      irrigationThreshold: 40,
    });
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Settings
      </Typography>
      
      <Paper sx={{ p: 3, mt: 3 }}>
        <Typography variant="h6" gutterBottom>
          Display Settings
        </Typography>
        <FormGroup>
          <FormControlLabel
            control={
              <Switch
                checked={settings.darkMode}
                onChange={handleSwitchChange}
                name="darkMode"
                color="primary"
              />
            }
            label="Dark Mode"
          />
        </FormGroup>
        
        <Box sx={{ mt: 2 }}>
          <Typography id="refresh-interval-slider" gutterBottom>
            Dashboard Refresh Interval: {settings.refreshInterval} seconds
          </Typography>
          <Slider
            value={settings.refreshInterval}
            onChange={handleSliderChange('refreshInterval')}
            aria-labelledby="refresh-interval-slider"
            valueLabelDisplay="auto"
            step={5}
            marks
            min={5}
            max={60}
          />
        </Box>
        
        <Divider sx={{ my: 3 }} />
        
        <Typography variant="h6" gutterBottom>
          Notification Settings
        </Typography>
        <FormGroup>
          <FormControlLabel
            control={
              <Switch
                checked={settings.enableNotifications}
                onChange={handleSwitchChange}
                name="enableNotifications"
                color="primary"
              />
            }
            label="Enable Notifications"
          />
        </FormGroup>
        
        <Grid container spacing={3} sx={{ mt: 1 }}>
          <Grid item xs={12} md={4}>
            <TextField
              label="Temperature Alert Threshold (°C)"
              type="number"
              name="temperatureAlertThreshold"
              value={settings.temperatureAlertThreshold}
              onChange={handleInputChange}
              fullWidth
              InputProps={{
                inputProps: { min: 0, max: 50, step: 0.1 }
              }}
              disabled={!settings.enableNotifications}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              label="Humidity Alert Threshold (%)"
              type="number"
              name="humidityAlertThreshold"
              value={settings.humidityAlertThreshold}
              onChange={handleInputChange}
              fullWidth
              InputProps={{
                inputProps: { min: 0, max: 100, step: 1 }
              }}
              disabled={!settings.enableNotifications}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              label="pH Alert Threshold"
              type="number"
              name="phAlertThreshold"
              value={settings.phAlertThreshold}
              onChange={handleInputChange}
              fullWidth
              InputProps={{
                inputProps: { min: 0, max: 14, step: 0.1 }
              }}
              disabled={!settings.enableNotifications}
            />
          </Grid>
        </Grid>
        
        <Divider sx={{ my: 3 }} />
        
        <Typography variant="h6" gutterBottom>
          System Settings
        </Typography>
        <FormGroup>
          <FormControlLabel
            control={
              <Switch
                checked={settings.autoIrrigation}
                onChange={handleSwitchChange}
                name="autoIrrigation"
                color="primary"
              />
            }
            label="Automatic Irrigation"
          />
        </FormGroup>
        
        <Box sx={{ mt: 2 }}>
          <Typography id="irrigation-threshold-slider" gutterBottom>
            Irrigation Humidity Threshold: {settings.irrigationThreshold}%
          </Typography>
          <Slider
            value={settings.irrigationThreshold}
            onChange={handleSliderChange('irrigationThreshold')}
            aria-labelledby="irrigation-threshold-slider"
            valueLabelDisplay="auto"
            step={5}
            marks
            min={10}
            max={80}
            disabled={!settings.autoIrrigation}
            sx={{ color: '#4caf50' }}
          />
        </Box>
        
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
          <Button
            variant="outlined"
            startIcon={<RefreshIcon />}
            onClick={handleReset}
            sx={{ mr: 2 }}
          >
            Reset to Defaults
          </Button>
          <Button
            variant="contained"
            color="primary"
            startIcon={<SaveIcon />}
            onClick={handleSave}
          >
            Save Settings
          </Button>
        </Box>
      </Paper>
      
      <Snackbar
        open={success}
        autoHideDuration={3000}
        onClose={() => setSuccess(false)}
      >
        <Alert severity="success" sx={{ width: '100%' }}>
          Settings saved successfully!
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default SettingsPage; 