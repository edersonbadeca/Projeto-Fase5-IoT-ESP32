import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';

/**
 * A card component for displaying sensor data
 * 
 * @param {Object} props - Component props
 * @param {string} props.title - Card title
 * @param {string} props.value - Value to display
 * @param {string} props.icon - Icon component to display
 * @param {string} props.color - Color for the icon and value
 * @param {string} props.unit - Unit for the value (optional)
 * @param {string} props.description - Additional description (optional)
 */
function SensorCard({ title, value, icon, color, unit = '', description = '' }) {
  return (
    <Card 
      sx={{ 
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'transform 0.3s, box-shadow 0.3s',
        '&:hover': {
          transform: 'translateY(-5px)',
          boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
        },
      }}
    >
      <CardContent sx={{ flexGrow: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Box 
            sx={{ 
              mr: 2, 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              bgcolor: `${color}20`, // 20% opacity of the color
              color: color,
              borderRadius: '50%',
              p: 1,
              width: 40,
              height: 40,
            }}
          >
            {icon}
          </Box>
          <Typography variant="h6" component="div" color="text.secondary">
            {title}
          </Typography>
        </Box>
        
        <Typography variant="h4" component="div" sx={{ fontWeight: 'bold', color }}>
          {value}
          {unit && (
            <Typography component="span" variant="h6" color="text.secondary" sx={{ ml: 0.5 }}>
              {unit}
            </Typography>
          )}
        </Typography>
        
        {description && (
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            {description}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
}

export default SensorCard; 