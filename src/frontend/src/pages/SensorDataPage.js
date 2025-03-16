import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  CircularProgress,
  Alert,
  IconButton,
} from '@mui/material';
import {
  Add as AddIcon,
  Close as CloseIcon,
} from '@mui/icons-material';
import SensorDataTable from '../components/SensorDataTable';
import SensorDataForm from '../components/SensorDataForm';
import { sensorDataApi } from '../services/api';

function SensorDataPage() {
  const [sensorData, setSensorData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openForm, setOpenForm] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedData, setSelectedData] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [formMode, setFormMode] = useState('add'); // 'add' or 'edit'

  // Fetch sensor data
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

  useEffect(() => {
    fetchData();
  }, []);

  // Handle form open for adding new data
  const handleAddClick = () => {
    setSelectedData(null);
    setFormMode('add');
    setOpenForm(true);
  };

  // Handle form open for editing existing data
  const handleEditClick = (data) => {
    setSelectedData(data);
    setFormMode('edit');
    setOpenForm(true);
  };

  // Handle form close
  const handleFormClose = () => {
    setOpenForm(false);
    setSelectedData(null);
  };

  // Handle form submit
  const handleFormSubmit = async (formData) => {
    try {
      setLoading(true);
      if (formMode === 'add') {
        await sensorDataApi.create(formData);
      } else {
        await sensorDataApi.update(selectedData.id, formData);
      }
      
      // Refresh data
      await fetchData();
      
      // Close form
      handleFormClose();
    } catch (err) {
      console.error('Error saving sensor data:', err);
      setError(`Failed to ${formMode === 'add' ? 'add' : 'update'} sensor data. Please try again.`);
      setLoading(false);
    }
  };

  // Handle delete click
  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setOpenDeleteDialog(true);
  };

  // Handle delete confirm
  const handleDeleteConfirm = async () => {
    try {
      setLoading(true);
      await sensorDataApi.delete(deleteId);
      
      // Refresh data
      await fetchData();
      
      // Close dialog
      setOpenDeleteDialog(false);
      setDeleteId(null);
    } catch (err) {
      console.error('Error deleting sensor data:', err);
      setError('Failed to delete sensor data. Please try again.');
      setLoading(false);
      setOpenDeleteDialog(false);
    }
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">
          Sensor Data
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={handleAddClick}
        >
          Add Reading
        </Button>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {loading && sensorData.length === 0 ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <SensorDataTable
          data={sensorData}
          onEdit={handleEditClick}
          onDelete={handleDeleteClick}
        />
      )}

      {/* Add/Edit Form Dialog */}
      <Dialog
        open={openForm}
        onClose={handleFormClose}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            {formMode === 'add' ? 'Add New Sensor Reading' : 'Edit Sensor Reading'}
            <IconButton onClick={handleFormClose}>
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>
          <SensorDataForm
            initialData={selectedData}
            onSubmit={handleFormSubmit}
            onCancel={handleFormClose}
          />
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete this sensor reading? This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeleteDialog(false)}>Cancel</Button>
          <Button onClick={handleDeleteConfirm} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default SensorDataPage; 