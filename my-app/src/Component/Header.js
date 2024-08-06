import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Avatar, Box, InputBase, Menu, MenuItem } from '@mui/material';
import { Settings as SettingsIcon, Notifications as NotificationsIcon, HelpOutline as HelpOutlineIcon, Search as SearchIcon, MoreVert as MoreVertIcon } from '@mui/icons-material';
// import logo from '../assets/images/maz-logo.jpeg';
import logo from '../assets/images/mazz-logo.png';

function Header() {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static" sx={{
      backgroundColor: '#fff',
      color: '#000',
      boxShadow: 'none',
      borderBottom: '1px solid #e0e0e0',
      height: '48px'
    }}>
      <Toolbar sx={{ minHeight: '48px !important', padding: '0 16px' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
          <img
            src={logo}
            alt="Maz Logo"
            style={{ height: '25px', marginRight: '16px' }}
          />
          <Typography variant="body1" sx={{
            fontWeight: 400,
            fontSize: '14px',
            color: '#666',
            marginRight: '16px',
            '&:after': {
              content: '"  Maz workspace"',
              marginLeft: '4px',
              color: '#999'
            }
          }}>
          
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', backgroundColor: '#f5f5f5', borderRadius: '8px', padding: '4px 8px', width: "50%" }}>
            <SearchIcon sx={{ color: '#999', marginRight: '8px' }} />
            <InputBase
              placeholder="Search..."
              sx={{ color: '#666', fontSize: '14px' }}
            />
          </Box>
        </Box>
        <Button
          variant="contained"
          sx={{
            textTransform: 'uppercase',
            backgroundColor: '#03a9f4',
            fontSize: '12px',
            padding: '4px 16px',
            marginRight: '16px',
            fontWeight: 500,
            '&:hover': {
              backgroundColor: '#0288d1'
            }
          }}
        >
          Upgrade
        </Button>
        <IconButton size="small" sx={{ color: '#666', padding: '8px' }}>
          <SettingsIcon fontSize="small" />
        </IconButton>
        <IconButton size="small" sx={{ color: '#666', padding: '8px' }}>
          <NotificationsIcon fontSize="small" />
        </IconButton>
        <IconButton size="small" sx={{ color: '#666', padding: '8px' }}>
          <HelpOutlineIcon fontSize="small" />
        </IconButton>
        <IconButton
          size="small"
          sx={{ color: '#666', padding: '8px' }}
          onClick={handleClick}
        >
          <MoreVertIcon fontSize="small" />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={handleClose}>Workspace settings</MenuItem>
          <MenuItem onClick={handleClose}>Manage workspaces</MenuItem>
        </Menu>
        <Avatar
          sx={{
            width: 24,
            height: 24,
            fontSize: '14px',
            marginLeft: '16px', // Increased margin for padding effect
            backgroundColor: '#4caf50',
            padding:"5px"
          }}
        >
          VS
        </Avatar>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
