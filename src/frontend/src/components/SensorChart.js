import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { formatDate } from '../utils/formatters';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

/**
 * A component for displaying sensor data in a line chart
 * 
 * @param {Object} props - Component props
 * @param {string} props.title - Chart title
 * @param {Array} props.data - Array of sensor data objects
 * @param {string} props.dataKey - Key to extract from data objects
 * @param {string} props.color - Color for the chart line
 * @param {string} props.unit - Unit for the values
 */
function SensorChart({ title, data, dataKey, color, unit = '' }) {
  // Sort data by created_at date
  const sortedData = [...data].sort((a, b) => 
    new Date(a.created_at) - new Date(b.created_at)
  );

  // Extract labels (dates) and values
  const labels = sortedData.map(item => formatDate(item.created_at));
  const values = sortedData.map(item => item[dataKey]);

  // Calculate min and max for better chart display
  const min = Math.min(...values) * 0.9;
  const max = Math.max(...values) * 1.1;

  const chartData = {
    labels,
    datasets: [
      {
        label: `${title} (${unit})`,
        data: values,
        borderColor: color,
        backgroundColor: `${color}20`, // 20% opacity
        fill: true,
        tension: 0.4,
        pointRadius: 4,
        pointHoverRadius: 6,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            return `${context.dataset.label}: ${context.raw}`;
          }
        }
      }
    },
    scales: {
      y: {
        min: min,
        max: max,
        ticks: {
          callback: function(value) {
            return `${value}${unit}`;
          }
        }
      },
      x: {
        ticks: {
          maxRotation: 45,
          minRotation: 45
        }
      }
    },
  };

  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="h6" component="div" color="text.secondary" gutterBottom>
          {title} History
        </Typography>
        <Box sx={{ height: 300 }}>
          <Line data={chartData} options={options} />
        </Box>
      </CardContent>
    </Card>
  );
}

export default SensorChart; 