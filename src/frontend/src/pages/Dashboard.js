import React, { useState, useEffect } from 'react';
import { Grid, Typography, Box, CircularProgress, Alert } from '@mui/material';
import {
  Thermostat as ThermostatIcon,
  Opacity as OpacityIcon,
  Science as ScienceIcon,
  WaterDrop as WaterDropIcon,
} from '@mui/icons-material';
import SensorCard from '../components/SensorCard';
import SensorChart from '../components/SensorChart';
import { sensorDataApi } from '../services/api';
import {
  formatTemperature,
  formatHumidity,
  formatPH,
  getTemperatureColor,
  getHumidityColor,
  getPHColor,
} from '../utils/formatters';

function Dashboard() {
  const [sensorData, setSensorData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await sensorDataApi.getAll();
        setSensorData(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching sensor data:', err);
        setError('Failed to load sensor data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Get the most recent reading
  const latestReading = sensorData.length > 0 
    ? sensorData.reduce((latest, current) => 
        new Date(current.created_at) > new Date(latest.created_at) ? current : latest
      )
    : null;

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Farm Monitoring Dashboard
      </Typography>
      
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Alert severity="error" sx={{ my: 2 }}>{error}</Alert>
      ) : (
        <>
          {/* Current Readings */}
          <Typography variant="h6" sx={{ mt: 4, mb: 2 }}>
            Current Readings
          </Typography>
          <Grid container spacing={3}>
            {/* Temperature Card */}
            <Grid item xs={12} sm={6} md={3}>
              <SensorCard
                title="Temperature"
                value={latestReading ? formatTemperature(latestReading.temperature) : 'N/A'}
                icon={<ThermostatIcon />}
                color={latestReading ? getTemperatureColor(latestReading.temperature) : '#757575'}
                unit="°C"
                description={latestReading ? (
                  latestReading.temperature < 18 ? 'Cold' :
                  latestReading.temperature > 28 ? 'Hot' : 'Normal'
                ) : ''}
              />
            </Grid>

            {/* Humidity Card */}
            <Grid item xs={12} sm={6} md={3}>
              <SensorCard
                title="Humidity"
                value={latestReading ? formatHumidity(latestReading.humidity) : 'N/A'}
                icon={<OpacityIcon />}
                color={latestReading ? getHumidityColor(latestReading.humidity) : '#757575'}
                unit="%"
                description={latestReading ? (
                  latestReading.humidity < 30 ? 'Dry' :
                  latestReading.humidity > 70 ? 'Wet' : 'Normal'
                ) : ''}
              />
            </Grid>

            {/* pH Card */}
            <Grid item xs={12} sm={6} md={3}>
              <SensorCard
                title="pH Level"
                value={latestReading ? formatPH(latestReading.ph) : 'N/A'}
                icon={<ScienceIcon />}
                color={latestReading ? getPHColor(latestReading.ph) : '#757575'}
                description={latestReading ? (
                  latestReading.ph < 6.0 ? 'Acidic' :
                  latestReading.ph > 7.5 ? 'Alkaline' : 'Neutral'
                ) : ''}
              />
            </Grid>

            {/* Irrigation Card */}
            <Grid item xs={12} sm={6} md={3}>
              <SensorCard
                title="Irrigation"
                value={latestReading ? (latestReading.irrigation ? 'ON' : 'OFF') : 'N/A'}
                icon={<WaterDropIcon />}
                color={latestReading ? (latestReading.irrigation ? '#4caf50' : '#757575') : '#757575'}
                description={latestReading ? (
                  latestReading.irrigation ? 'System is actively watering' : 'System is idle'
                ) : ''}
              />
            </Grid>
          </Grid>

          {/* Charts */}
          {sensorData.length > 0 && (
            <>
              <Typography variant="h6" sx={{ mt: 4, mb: 2 }}>
                Sensor History
              </Typography>
              <Grid container spacing={3}>
                {/* Temperature Chart */}
                <Grid item xs={12} md={6}>
                  <SensorChart
                    title="Temperature"
                    data={sensorData}
                    dataKey="temperature"
                    color="#f44336"
                    unit="°C"
                  />
                </Grid>

                {/* Humidity Chart */}
                <Grid item xs={12} md={6}>
                  <SensorChart
                    title="Humidity"
                    data={sensorData}
                    dataKey="humidity"
                    color="#2196f3"
                    unit="%"
                  />
                </Grid>

                {/* pH Chart */}
                <Grid item xs={12} md={6}>
                  <SensorChart
                    title="pH Level"
                    data={sensorData}
                    dataKey="ph"
                    color="#9c27b0"
                  />
                </Grid>

                {/* Irrigation Chart (as a boolean, we'll convert to 0/1) */}
                <Grid item xs={12} md={6}>
                  <SensorChart
                    title="Irrigation Status"
                    data={sensorData.map(item => ({
                      ...item,
                      irrigation: item.irrigation ? 1 : 0
                    }))}
                    dataKey="irrigation"
                    color="#4caf50"
                  />
                </Grid>
              </Grid>
            </>
          )}
        </>
      )}
    </Box>
  );
}

export default Dashboard; 