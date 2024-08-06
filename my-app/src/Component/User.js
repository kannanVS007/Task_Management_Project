import React, { useState, useEffect } from 'react';
import {
  Button, Grid, Typography, Container, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, IconButton, Dialog, DialogTitle, DialogContent,
  DialogActions, TextField, Select, MenuItem, FormControl, InputLabel
} from '@mui/material';
import { Edit, Delete, Visibility, Add } from '@mui/icons-material';
import { createUser, getUsers, updateUser, deleteUser } from '../services/api';

const User = () => {
  const [users, setUsers] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogMode, setDialogMode] = useState('create');
  const [selectedUser, setSelectedUser] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    team: '',
    role: '',
    reporting: ''
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await getUsers();
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      if (dialogMode === 'create') {
        await createUser(formData);
      } else if (dialogMode === 'edit') {
        await updateUser(selectedUser.id, formData);
      }
      setOpenDialog(false);
      resetForm();
      fetchUsers();
    } catch (error) {
      console.error('Error saving user:', error);
    }
  };

  const handleOpenDialog = (mode, user = null) => {
    setDialogMode(mode);
    setSelectedUser(user);
    if (user) {
      setFormData({ ...user, password: '' });
    } else {
      resetForm();
    }
    setOpenDialog(true);
  };

  const handleDelete = async (userId) => {
    try {
      await deleteUser(userId);
      fetchUsers();
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      password: '',
      team: '',
      role: '',
      reporting: ''
    });
  };

  return (
    <Container maxWidth="lg">
      <Grid container justifyContent="space-between" alignItems="center" style={{ marginBottom: '20px' }}>
        <Typography variant="h4">User Management</Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<Add />}
          onClick={() => handleOpenDialog('create')}
        >
          Add User
        </Button>
      </Grid>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Team</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Reporting To</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.team}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>{user.reporting}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleOpenDialog('view', user)}>
                    <Visibility />
                  </IconButton>
                  <IconButton onClick={() => handleOpenDialog('edit', user)}>
                    <Edit />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(user.id)}>
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>
          {dialogMode === 'create' ? 'Create User' : dialogMode === 'edit' ? 'Edit User' : 'User Details'}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                disabled={dialogMode === 'view'}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                disabled={dialogMode === 'view'}
                required
              />
            </Grid>
            {dialogMode !== 'view' && (
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  required={dialogMode === 'create'}
                />
              </Grid>
            )}
            <Grid item xs={12}>
              <FormControl fullWidth disabled={dialogMode === 'view'}>
                <InputLabel>Team</InputLabel>
                <Select
                  name="team"
                  value={formData.team}
                  onChange={handleChange}
                  required
                >
                  <MenuItem value="Team A">Team A</MenuItem>
                  <MenuItem value="Team B">Team B</MenuItem>
                  <MenuItem value="Team C">Team C</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth disabled={dialogMode === 'view'}>
                <InputLabel>Role</InputLabel>
                <Select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  required
                >
                  <MenuItem value="Admin">Admin</MenuItem>
                  <MenuItem value="User">User</MenuItem>
                  <MenuItem value="Manager">Manager</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth disabled={dialogMode === 'view'}>
                <InputLabel>Reporting To</InputLabel>
                <Select
                  name="reporting"
                  value={formData.reporting}
                  onChange={handleChange}
                  required
                >
                  <MenuItem value="">None</MenuItem>
                  <MenuItem value="John Doe">John Doe</MenuItem>
                  <MenuItem value="Jane Smith">Jane Smith</MenuItem>
                  <MenuItem value="Mike Johnson">Mike Johnson</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          {dialogMode !== 'view' && (
            <Button onClick={handleSubmit} variant="contained" color="primary">
              {dialogMode === 'create' ? 'Create' : 'Update'}
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default User;