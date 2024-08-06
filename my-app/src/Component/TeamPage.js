import React, { useState } from 'react';
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
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Typography,
  Menu,
  Chip,
  Divider
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import RefreshIcon from '@mui/icons-material/Refresh';

function TeamPage() {
  const [teams, setTeams] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [newTeam, setNewTeam] = useState({ name: '', id: '', clientNames: [], clientEmails: [] });
  const [searchTerm, setSearchTerm] = useState('');
  const [editingTeam, setEditingTeam] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [viewDialog, setViewDialog] = useState(false);

  const clients = [
    { name: 'Client 1', email: 'client1@example.com' },
    { name: 'Client 2', email: 'client2@example.com' },
    { name: 'Client 3', email: 'client3@example.com' },
    { name: 'Client 4', email: 'client4@example.com' },
    { name: 'Client 5', email: 'client5@example.com' },
    { name: 'Client 6', email: 'client6@example.com' },
    { name: 'Client 7', email: 'client7@example.com' },
    { name: 'Client 8', email: 'client8@example.com' },
    { name: 'Client 9', email: 'client9@example.com' },
    { name: 'Client 10', email: 'client10@example.com' },
  ];

  const handleOpenDialog = () => {
    setOpenDialog(true);
    setEditingTeam(null);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setNewTeam({ name: '', id: '', clientNames: [], clientEmails: [] });
    setEditingTeam(null);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (editingTeam) {
      setEditingTeam({ ...editingTeam, [name]: value });
    } else {
      setNewTeam({ ...newTeam, [name]: value });
    }
  };

  const handleClientNameChange = (event) => {
    const { value } = event.target;
    if (editingTeam) {
      setEditingTeam({ ...editingTeam, clientNames: value });
    } else {
      setNewTeam({ ...newTeam, clientNames: value });
    }
  };

  const handleClientEmailChange = (event) => {
    const { value } = event.target;
    if (editingTeam) {
      setEditingTeam({ ...editingTeam, clientEmails: value });
    } else {
      setNewTeam({ ...newTeam, clientEmails: value });
    }
  };

  const handleAddOrUpdateTeam = () => {
    if (editingTeam) {
      setTeams(teams.map(team => team.id === editingTeam.id ? editingTeam : team));
    } else {
      setTeams([...teams, newTeam]);
    }
    handleCloseDialog();
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredTeams = teams.filter((team) =>
    team.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleActionClick = (event, team) => {
    setAnchorEl(event.currentTarget);
    setSelectedTeam(team);
  };

  const handleActionClose = () => {
    setAnchorEl(null);
  };

  const handleView = () => {
    setViewDialog(true);
    handleActionClose();
  };

  const handleEdit = () => {
    setEditingTeam(selectedTeam);
    setOpenDialog(true);
    handleActionClose();
  };

  const handleDelete = () => {
    setTeams(teams.filter(team => team.id !== selectedTeam.id));
    handleActionClose();
  };

  return (
    <Box sx={{ p: 3, bgcolor: '#f5f5f5', fontFamily: 'Arial, sans-serif' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <TextField
            placeholder="Search items..."
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
            sx={{ width: '300px', mr: 2 }}
          />
          <IconButton>
            <RefreshIcon />
          </IconButton>
        </Box>
        <Button
          variant="contained"
          onClick={handleOpenDialog}
          sx={{
            bgcolor: '#1976D2',
            color: 'white',
            '&:hover': {
              bgcolor: '#7b1fa2',
            },
          }}
        >
          Add
        </Button>
      </Box>
      
      <TableContainer component={Paper} sx={{ boxShadow: 'none', border: '1px solid #e0e0e0' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }}>S.No</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Team Name</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Team Id</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Client Names</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Client Emails</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredTeams.map((team, index) => (
              <TableRow key={`${team.id}-${team.name}`}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Box sx={{ width: 20, height: 20, borderRadius: '50%', bgcolor: '#e0e0e0', mr: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '12px' }}>
                      {team.name[0].toUpperCase()}
                    </Box>
                    {team.name}
                  </Box>
                </TableCell>
                <TableCell>{team.id}</TableCell>
                <TableCell>{team.clientNames.join(', ')}</TableCell>
                <TableCell>{team.clientEmails.join(', ')}</TableCell>
                <TableCell>
                  <IconButton onClick={(e) => handleActionClick(e, team)}>
                    <MoreVertIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle>{editingTeam ? 'Edit Team Details' : 'Add Team Details'}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="name"
            label="Team Name"
            type="text"
            fullWidth
            variant="outlined"
            value={editingTeam ? editingTeam.name : newTeam.name}
            onChange={handleInputChange}
            required
            error={editingTeam ? editingTeam.name === '' : newTeam.name === ''}
            helperText={editingTeam ? (editingTeam.name === '' ? 'Team Name is required' : '') : (newTeam.name === '' ? 'Team Name is required' : '')}
          />
          <TextField
            margin="dense"
            name="id"
            label="Team Id"
            type="text"
            fullWidth
            variant="outlined"
            value={editingTeam ? editingTeam.id : newTeam.id}
            onChange={handleInputChange}
            required
            error={editingTeam ? editingTeam.id === '' : newTeam.id === ''}
            helperText={editingTeam ? (editingTeam.id === '' ? 'Team Id is required' : '') : (newTeam.id === '' ? 'Team Id is required' : '')}
          />
          <Box sx={{ mt: 2 }}>
            <Typography variant="subtitle1">Client Mapping</Typography>
            <FormControl fullWidth sx={{ mt: 1 }}>
              <InputLabel>Client Names</InputLabel>
              <Select
                multiple
                value={editingTeam ? editingTeam.clientNames : newTeam.clientNames}
                onChange={handleClientNameChange}
                renderValue={(selected) => (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {selected.map((value) => (
                      <Chip key={value} label={value} />
                    ))}
                  </Box>
                )}
                MenuProps={{
                  PaperProps: {
                    sx: {
                      maxHeight: 200,
                      overflowY: 'auto',
                      width: '300px',
                    }
                  }
                }}
              >
                {clients.map((client) => (
                  <MenuItem key={client.name} value={client.name}>
                    {client.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth sx={{ mt: 2 }}>
              <InputLabel>Client Emails</InputLabel>
              <Select
                multiple
                value={editingTeam ? editingTeam.clientEmails : newTeam.clientEmails}
                onChange={handleClientEmailChange}
                renderValue={(selected) => (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {selected.map((value) => (
                      <Chip key={value} label={value} />
                    ))}
                  </Box>
                )}
                MenuProps={{
                  PaperProps: {
                    sx: {
                      maxHeight: 200,
                      overflowY: 'auto',
                      width: '300px',
                    }
                  }
                }}
              >
                {clients.map((client) => (
                  <MenuItem key={client.email} value={client.email}>
                    {client.email}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} sx={{ color: '#7b1fa2' }}>
            Cancel
          </Button>
          <Button
            onClick={handleAddOrUpdateTeam}
            sx={{
              bgcolor: '#1976D2',
              color: 'white',
              '&:hover': {
                bgcolor: '#7b1fa2',
              },
            }}
          >
            {editingTeam ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>

      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleActionClose}>
        <MenuItem onClick={handleView}>View</MenuItem>
        <MenuItem onClick={handleEdit}>Edit</MenuItem>
        <MenuItem onClick={handleDelete}>Delete</MenuItem>
      </Menu>

      <Dialog open={viewDialog} onClose={() => setViewDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle
          sx={{
            bgcolor: '#1976D2',
            color: 'white',
            textAlign: 'center',
            fontWeight: 'bold',
            fontSize: '1.25rem'
          }}
        >
          View Team Details
        </DialogTitle>
        <DialogContent
          sx={{
            bgcolor: '#fafafa',
            padding: '24px',
            '&:last-child': {
              paddingBottom: '24px'
            }
          }}
        >
          {selectedTeam && (
            <Box>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
                Team Name
              </Typography>
              <Typography variant="body1" sx={{ mb: 2, fontSize: '1rem' }}>
                {selectedTeam.name}
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
                Team Id
              </Typography>
              <Typography variant="body1" sx={{ mb: 2, fontSize: '1rem' }}>
                {selectedTeam.id}
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
                Client Names
              </Typography>
              <Typography variant="body1" sx={{ mb: 2, fontSize: '1rem' }}>
                {selectedTeam.clientNames.join(', ')}
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
                Client Emails
              </Typography>
              <Typography variant="body1" sx={{ mb: 2, fontSize: '1rem' }}>
                {selectedTeam.clientEmails.join(', ')}
              </Typography>
            </Box>
          )}
        </DialogContent>
        <DialogActions
          sx={{
            bgcolor: '#eeeeee',
            padding: '12px',
            justifyContent: 'center'
          }}
        >
          <Button
            onClick={() => setViewDialog(false)}
            sx={{
              color: '#1976D2',
              borderColor: '#1976D2',
              '&:hover': {
                bgcolor: '#e3f2fd',
                borderColor: '#1976D2'
              },
              border: '1px solid'
            }}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default TeamPage;
