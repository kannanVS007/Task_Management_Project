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
  Menu,
  MenuItem,
  Grid,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import MoreVertIcon from '@mui/icons-material/MoreVert';

function ProjectPage() {
  const [projects, setProjects] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogMode, setDialogMode] = useState('add');
  const [selectedProjectIndex, setSelectedProjectIndex] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [newProject, setNewProject] = useState({ name: '', description: '', manager: '' });
  const [searchTerm, setSearchTerm] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);

  const handleOpenDialog = (mode, index = null) => {
    setDialogMode(mode);
    setSelectedProjectIndex(index);
    if (mode === 'edit' || mode === 'view') {
      setNewProject(projects[index]);
    } else {
      setNewProject({ name: '', description: '', manager: '' });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setNewProject({ name: '', description: '', manager: '' });
    setSelectedProjectIndex(null);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewProject({ ...newProject, [name]: value });
  };

  const handleAddOrUpdateProject = () => {
    if (dialogMode === 'edit') {
      const updatedProjects = projects.map((project, index) =>
        index === selectedProjectIndex ? newProject : project
      );
      setProjects(updatedProjects);
    } else if (dialogMode === 'add') {
      setProjects([...projects, newProject]);
    }
    handleCloseDialog();
  };

  const handleDeleteProject = () => {
    if (selectedProjectIndex !== null) {
      const updatedProjects = projects.filter((_, index) => index !== selectedProjectIndex);
      setProjects(updatedProjects);
      setSelectedProjectIndex(null);
      setSelectedProject(null);
    }
    handleCloseMenu();
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredProjects = projects.filter((project) =>
    project.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOpenMenu = (event, index) => {
    setAnchorEl(event.currentTarget);
    setSelectedProjectIndex(index);
    setSelectedProject(projects[index]);
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
        handleOpenDialog('edit', selectedProjectIndex);
        break;
      case 'delete':
        handleDeleteProject();
        break;
      default:
        break;
    }
  };

  return (
    <Box sx={{ p: 3, bgcolor: '#f5f5f5', fontFamily: 'Arial, sans-serif' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2, mt: 4 }}>
        <TextField
          placeholder="Search by project name"
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
            bgcolor: '#1976d2', 
            color: 'white',
            '&:hover': {
              bgcolor: '#1565c0',
            },
          }}
        >
          ADD PROJECT
        </Button>
      </Box>
      
      <TableContainer component={Paper} sx={{ maxHeight: 440, overflow: 'auto', boxShadow: 'none', border: '1px solid #e0e0e0', mb: 4 }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell sx={{ bgcolor: '#f0f0f0', fontWeight: 'bold', borderBottom: '1px solid #e0e0e0' }}>S.No</TableCell>
              <TableCell sx={{ bgcolor: '#f0f0f0', fontWeight: 'bold', borderBottom: '1px solid #e0e0e0' }}>Project Name</TableCell>
              <TableCell sx={{ bgcolor: '#f0f0f0', fontWeight: 'bold', borderBottom: '1px solid #e0e0e0' }}>Description</TableCell>
              <TableCell sx={{ bgcolor: '#f0f0f0', fontWeight: 'bold', borderBottom: '1px solid #e0e0e0' }}>Project Manager</TableCell>
              <TableCell sx={{ bgcolor: '#f0f0f0', fontWeight: 'bold', borderBottom: '1px solid #e0e0e0' }}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredProjects.map((project, index) => (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{project.name}</TableCell>
                <TableCell>{project.description}</TableCell>
                <TableCell>{project.manager}</TableCell>
                <TableCell>
                  <IconButton onClick={(event) => handleOpenMenu(event, index)}>
                    <MoreVertIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
      >
        <MenuItem onClick={() => handleMenuAction('view')}>View</MenuItem>
        <MenuItem onClick={() => handleMenuAction('edit')}>Edit</MenuItem>
        <MenuItem onClick={() => handleMenuAction('delete')}>Delete</MenuItem>
      </Menu>
      
      <Dialog 
        open={openDialog} 
        onClose={handleCloseDialog}
        PaperProps={{
          style: {
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
            backdropFilter: 'blur(4px)',
            borderRadius: '10px',
          },
        }}
      >
        <DialogTitle sx={{ textAlign: 'center', color: '#1976d2' }}>
          {dialogMode === 'edit' ? 'Edit Project' : 'Add New Project'}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoFocus
                margin="dense"
                name="name"
                label="Project Name"
                type="text"
                fullWidth
                variant="outlined"
                value={newProject.name}
                onChange={handleInputChange}
                disabled={dialogMode === 'view'}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                margin="dense"
                name="description"
                label="Description"
                type="text"
                fullWidth
                variant="outlined"
                value={newProject.description}
                onChange={handleInputChange}
                disabled={dialogMode === 'view'}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                margin="dense"
                name="manager"
                label="Project Manager"
                type="text"
                fullWidth
                variant="outlined"
                value={newProject.manager}
                onChange={handleInputChange}
                disabled={dialogMode === 'view'}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'center', mb: 2 }}>
          <Button 
            onClick={handleCloseDialog}
            sx={{
              bgcolor: '#f44336',
              color: 'white',
              '&:hover': {
                bgcolor: '#d32f2f',
              },
              mr: 1,
            }}
          >
            Cancel
          </Button>
          {dialogMode !== 'view' && (
            <Button 
              onClick={handleAddOrUpdateProject}
              sx={{
                bgcolor: '#4caf50',
                color: 'white',
                '&:hover': {
                  bgcolor: '#45a049',
                },
              }}
            >
              {dialogMode === 'edit' ? 'Update' : 'Add'}
            </Button>
          )}
        </DialogActions>
      </Dialog>
      
      <Dialog open={viewDialogOpen} onClose={() => setViewDialogOpen(false)}>
        <DialogTitle>View Project</DialogTitle>
        <DialogContent>
          {selectedProject && (
            <>
              <p><strong>Name:</strong> {selectedProject.name}</p>
              <p><strong>Description:</strong> {selectedProject.description}</p>
              <p><strong>Project Manager:</strong> {selectedProject.manager}</p>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setViewDialogOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default ProjectPage;