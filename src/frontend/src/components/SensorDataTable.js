import React, { useState } from 'react';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  IconButton,
  Tooltip,
  Box,
  Typography,
  Chip,
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Thermostat as ThermostatIcon,
  Opacity as OpacityIcon,
  Science as ScienceIcon,
  WaterDrop as WaterDropIcon,
} from '@mui/icons-material';
import { formatDate, formatTemperature, formatHumidity, formatPH } from '../utils/formatters';

/**
 * A component for displaying sensor data in a table
 * 
 * @param {Object} props - Component props
 * @param {Array} props.data - Array of sensor data objects
 * @param {Function} props.onEdit - Function to call when edit button is clicked
 * @param {Function} props.onDelete - Function to call when delete button is clicked
 */
function SensorDataTable({ data, onEdit, onDelete }) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Apply pagination to the data
  const paginatedData = data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 600 }}>
        <Table stickyHeader aria-label="sensor data table">
          <TableHead>
            <TableRow>
              <TableCell>Date & Time</TableCell>
              <TableCell>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <ThermostatIcon sx={{ mr: 1, color: '#f44336' }} />
                  Temperature
                </Box>
              </TableCell>
              <TableCell>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <OpacityIcon sx={{ mr: 1, color: '#2196f3' }} />
                  Humidity
                </Box>
              </TableCell>
              <TableCell>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <ScienceIcon sx={{ mr: 1, color: '#9c27b0' }} />
                  pH Level
                </Box>
              </TableCell>
              <TableCell>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <WaterDropIcon sx={{ mr: 1, color: '#4caf50' }} />
                  Irrigation
                </Box>
              </TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedData.length > 0 ? (
              paginatedData.map((row) => (
                <TableRow hover key={row.id}>
                  <TableCell component="th" scope="row">
                    {formatDate(row.created_at)}
                  </TableCell>
                  <TableCell>{formatTemperature(row.temperature)}</TableCell>
                  <TableCell>{formatHumidity(row.humidity)}</TableCell>
                  <TableCell>{formatPH(row.ph)}</TableCell>
                  <TableCell>
                    <Chip 
                      label={row.irrigation ? "ON" : "OFF"} 
                      color={row.irrigation ? "success" : "default"}
                      size="small"
                    />
                  </TableCell>
                  <TableCell align="right">
                    <Tooltip title="Edit">
                      <IconButton 
                        aria-label="edit" 
                        size="small" 
                        onClick={() => onEdit(row)}
                        sx={{ color: '#2196f3' }}
                      >
                        <EditIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <IconButton 
                        aria-label="delete" 
                        size="small" 
                        onClick={() => onDelete(row.id)}
                        sx={{ color: '#f44336' }}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  <Typography variant="body1" sx={{ py: 2 }}>
                    No sensor data available
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25, 50]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}

export default SensorDataTable; 