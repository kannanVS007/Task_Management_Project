import React, { useState, useEffect, useCallback } from 'react';
import {
  Box,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  InputAdornment,
  IconButton,
  Menu,
  MenuItem,
  Grid,
  CircularProgress,
  Snackbar,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import MoreVertIcon from '@mui/icons-material/MoreVert';

function CustomerPage() {
  const [clients, setClients] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogMode, setDialogMode] = useState('add');
  const [selectedClientIndex, setSelectedClientIndex] = useState(null);
  const [selectedClient, setSelectedClient] = useState(null);
  const [newClient, setNewClient] = useState({ name: '', customerID: '', contact: '', email: '', address: '', branch: '' });
  const [searchTerm, setSearchTerm] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const fetchClients = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch('https://192.168.1.12:5000/customer/getAllCustomers');
      if (!response.ok) {
        throw new Error('Failed to fetch clients');
      }
      const data = await response.json();
      console.log("data===========",data);
      
      setClients(data);
    } catch (error) {
      console.error('Error fetching clients:', error);
      showSnackbar('Failed to fetch clients');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchClients();
  }, [fetchClients]);

  const handleOpenDialog = (mode, index = null) => {
    setDialogMode(mode);
    setSelectedClientIndex(index);
    if (mode === 'edit' || mode === 'view') {
      setNewClient(clients[index]);
    } else {
      setNewClient({ name: '', customerID: '', contact: '', email: '', address: '', branch: '' });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setNewClient({ name: '', customerID: '', contact: '', email: '', address: '', branch: '' });
    setSelectedClientIndex(null);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewClient({ ...newClient, [name]: value });
  };

  const handleAddOrUpdateClient = async () => {
    try {
      if (dialogMode === 'edit') {
        const response = await fetch(`https://192.168.1.12:5000/customer/editCustomer/${newClient._id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newClient),
        });
        if (!response.ok) throw new Error('Failed to update client');
        showSnackbar('Client updated successfully');
      } else if (dialogMode === 'add') {
        const response = await fetch('https://192.168.1.12:5000/customer/addCustomer', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newClient),
        });
        if (!response.ok) throw new Error('Failed to add client');
        showSnackbar('Client added successfully');
      }
      fetchClients();
      handleCloseDialog();
    } catch (error) {
      console.error('Error:', error);
      showSnackbar(error.message);
    }
  };

  const handleDeleteClient = async () => {
    if (selectedClientIndex !== null) {
      try {
        const response = await fetch(`http://localhost:5000/api/clients/${selectedClient._id}`, {
          method: 'DELETE',
        });
        if (!response.ok) throw new Error('Failed to delete client');
        showSnackbar('Client deleted successfully');
        fetchClients();
      } catch (error) {
        console.error('Error deleting client:', error);
        showSnackbar(error.message);
      }
    }
    handleCloseMenu();
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredClients = clients.filter((client) =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOpenMenu = (event, index) => {
    setAnchorEl(event.currentTarget);
    setSelectedClientIndex(index);
    setSelectedClient(clients[index]);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleMenuAction = (action) => {
    handleCloseMenu();
    switch (action) {
      case 'view':
        setViewDialogOpen(true);
        break;
      case 'edit':
        handleOpenDialog('edit', selectedClientIndex);
        break;
      case 'delete':
        handleDeleteClient();
        break;
      default:
        break;
    }
  };

  const showSnackbar = (message) => {
    setSnackbarMessage(message);
    setSnackbarOpen(true);
  };

  return (
    <Box sx={{ p: 3, bgcolor: '#f5f5f5', fontFamily: 'Arial, sans-serif' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2, mt: 4 }}>
        <TextField
          placeholder="Search by customer name"
          variant="outlined"
          size="small"
          value={searchTerm}
          onChange={handleSearchChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          sx={{ width: '300px' }}
        />
        <Button 
          variant="contained" 
          onClick={() => handleOpenDialog('add')} 
          sx={{ 
            backgroundColor: '#007bff', 
            color: 'white', 
            '&:hover': { 
              backgroundColor: '#0056b3' 
            } 
          }}
        >
          Add Customer
        </Button>
      </Box>
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
          <CircularProgress />
        </Box>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Customer ID</TableCell>
                <TableCell>Contact</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Address</TableCell>
                <TableCell>Branch</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredClients.map((client, index) => (
                <TableRow key={client._id}>
                  <TableCell>{client.name}</TableCell>
                  <TableCell>{client.customerID}</TableCell>
                  <TableCell>{client.contact}</TableCell>
                  <TableCell>{client.email}</TableCell>
                  <TableCell>{client.address}</TableCell>
                  <TableCell>{client.branch}</TableCell>
                  <TableCell>
                    <IconButton
                      size="small"
                      onClick={(event) => handleOpenMenu(event, index)}
                    >
                      <MoreVertIcon />
                    </IconButton>
                    <Menu
                      anchorEl={anchorEl}
                      open={Boolean(anchorEl)}
                      onClose={handleCloseMenu}
                    >
                      <MenuItem onClick={() => handleMenuAction('view')}>View</MenuItem>
                      <MenuItem onClick={() => handleMenuAction('edit')}>Edit</MenuItem>
                      <MenuItem onClick={() => handleMenuAction('delete')}>Delete</MenuItem>
                    </Menu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>{dialogMode === 'add' ? 'Add New Customer' : 'Edit Customer'}</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Name"
                fullWidth
                variant="outlined"
                name="name"
                value={newClient.name}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Customer ID"
                fullWidth
                variant="outlined"
                name="customerID"
                value={newClient.customerID}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Contact"
                fullWidth
                variant="outlined"
                name="contact"
                value={newClient.contact}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Email"
                fullWidth
                variant="outlined"
                name="email"
                value={newClient.email}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Address"
                fullWidth
                variant="outlined"
                name="address"
                value={newClient.address}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Branch"
                fullWidth
                variant="outlined"
                name="branch"
                value={newClient.branch}
                onChange={handleInputChange}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleAddOrUpdateClient} color="primary">
            {dialogMode === 'add' ? 'Add' : 'Update'}
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
        message={snackbarMessage}
      />
    </Box>
  );
}
export default CustomerPage;
