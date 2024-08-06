import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

import {
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Collapse,
  IconButton,
  Typography
} from '@mui/material';
import {
  AccessTime as AccessTimeIcon,
  CalendarToday as CalendarTodayIcon,
  Dashboard as DashboardIcon,
  BarChart as BarChartIcon,
  Assignment as AssignmentIcon,
  Group as GroupIcon,
  People as PeopleIcon,
  LocalOffer as LocalOfferIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon
} from '@mui/icons-material';

function Sidebar() {
  const [openReports, setOpenReports] = useState(false);
  const [openSales, setOpenSales] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleReportsClick = () => setOpenReports(!openReports);
  const handleSalesClick = () => setOpenSales(!openSales);
  const toggleSidebar = () => setIsCollapsed(!isCollapsed);

  const sidebarItemStyle = {
    color: '#666',
    py: 0.75,
    '&.active': {
      color: '#03a9f4',
      bgcolor: 'transparent',
      '& .MuiListItemIcon-root': {
        color: '#03a9f4',
      },
    },
  };

  return (
    <Box sx={{
      width: isCollapsed ? 60 : 200,
      bgcolor: '#f8f8f8',
      borderRight: '1px solid #e0e0e0',
      position: 'relative',
      transition: 'width 0.3s',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      padding: 0.5,
      marginBottom: 2,
      maxHeight: '100vh',
      '&::-webkit-scrollbar': {
        width: '1px',
      },
      '&::-webkit-scrollbar-thumb': {
        backgroundColor: '#b0b0b0',
        borderRadius: '4px',
      },
      '&::-webkit-scrollbar-track': {
        backgroundColor: '#f0f0f0',
        borderRadius: '4px',
      },
    }}>
      <Box sx={{
        overflowY: 'auto', 
        flexGrow: 1,
        paddingBottom: 8
      }}>
        <List sx={{ pt: 0 }}>
          <ListItem component={NavLink} to="/time-tracker" sx={sidebarItemStyle}>
            <ListItemIcon sx={{ color: 'inherit', minWidth: 40 }}>
              <AccessTimeIcon />
            </ListItemIcon>
            {!isCollapsed && <ListItemText primary="TIME TRACKER" primaryTypographyProps={{ fontSize: 13, fontWeight: 500 }} />}
          </ListItem>

          <ListItem component={NavLink} to="/calendar" sx={sidebarItemStyle}>
            <ListItemIcon sx={{ color: 'inherit', minWidth: 40 }}>
              <CalendarTodayIcon />
            </ListItemIcon>
            {!isCollapsed && <ListItemText primary="TIMESHEET" primaryTypographyProps={{ fontSize: 13, fontWeight: 500 }} />}
          </ListItem>

          {!isCollapsed && (
            <Typography variant="caption" sx={{ pl: 2, pt: 2, pb: 1, fontWeight: 500, color: '#999', display: 'block' }}>
              ANALYZE
            </Typography>
          )}

          <ListItem component={NavLink} to="/dashboard" sx={sidebarItemStyle}>
            <ListItemIcon sx={{ color: 'inherit', minWidth: 40 }}>
              <DashboardIcon />
            </ListItemIcon>
            {!isCollapsed && <ListItemText primary="DASHBOARD" primaryTypographyProps={{ fontSize: 13, fontWeight: 500 }} />}
          </ListItem>

          <ListItem button onClick={handleReportsClick} sx={sidebarItemStyle}>
            <ListItemIcon sx={{ color: 'inherit', minWidth: 40 }}>
              <BarChartIcon />
            </ListItemIcon>
            {!isCollapsed && (
              <>
                <ListItemText primary="REPORTS" primaryTypographyProps={{ fontSize: 13, fontWeight: 500 }} />
                {openReports ? <ExpandLessIcon sx={{ fontSize: 18, color: '#999' }} /> : <ExpandMoreIcon sx={{ fontSize: 18, color: '#999' }} />}
              </>
            )}
          </ListItem>
          {!isCollapsed && (
            <Collapse in={openReports} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItem button component={NavLink} to="/reports/summary" sx={{ pl: 4 }}>
                  <ListItemText primary="Summary" primaryTypographyProps={{ fontSize: 13 }} />
                </ListItem>
                <ListItem button component={NavLink} to="/reports/detailed" sx={{ pl: 4 }}>
                  <ListItemText primary="Detailed" primaryTypographyProps={{ fontSize: 13 }} />
                </ListItem>
                <ListItem button component={NavLink} to="/reports/weekly" sx={{ pl: 4 }}>
                  <ListItemText primary="Weekly" primaryTypographyProps={{ fontSize: 13 }} />
                </ListItem>
              </List>
            </Collapse>
          )}

          {!isCollapsed && (
            <Typography variant="caption" sx={{ pl: 2, pt: 2, pb: 1, fontWeight: 500, color: '#999', display: 'block' }}>
              MANAGE
            </Typography>
          )}

          <ListItem button onClick={handleSalesClick} sx={sidebarItemStyle}>
            <ListItemIcon sx={{ color: 'inherit', minWidth: 40 }}>
              <AssignmentIcon />
            </ListItemIcon>
            {!isCollapsed && (
              <>
                <ListItemText primary="SALES" primaryTypographyProps={{ fontSize: 13, fontWeight: 500 }} />
                {openSales ? <ExpandLessIcon sx={{ fontSize: 18, color: '#999' }} /> : <ExpandMoreIcon sx={{ fontSize: 18, color: '#999' }} />}
              </>
            )}
          </ListItem>
          {!isCollapsed && (
            <Collapse in={openSales} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItem button component={NavLink} to="/sales/deals" sx={{ pl: 4 }}>
                  <ListItemText primary="Deals" primaryTypographyProps={{ fontSize: 13 }} />
                </ListItem>
                <ListItem button component={NavLink} to="/sales/forecasts" sx={{ pl: 4 }}>
                  <ListItemText primary="Forecasts" primaryTypographyProps={{ fontSize: 13 }} />
                </ListItem>
                <ListItem button component={NavLink} to="/sales/activities" sx={{ pl: 4 }}>
                  <ListItemText primary="Activities" primaryTypographyProps={{ fontSize: 13 }} />
                </ListItem>
              </List>
            </Collapse>
          )}

          {!isCollapsed && (
            <Typography variant="caption" sx={{ pl: 2, pt: 2, pb: 1, fontWeight: 500, color: '#999', display: 'block' }}>
              TEAM
            </Typography>
          )}

          <ListItem component={NavLink} to="/team" sx={sidebarItemStyle}>
            <ListItemIcon sx={{ color: 'inherit', minWidth: 40 }}>
              <GroupIcon />
            </ListItemIcon>
            {!isCollapsed && <ListItemText primary="TEAM" primaryTypographyProps={{ fontSize: 13, fontWeight: 500 }} />}
          </ListItem>

          <ListItem component={NavLink} to="/customer" sx={sidebarItemStyle}>
            <ListItemIcon sx={{ color: 'inherit', minWidth: 40 }}>
              <PeopleIcon />
            </ListItemIcon>
            {!isCollapsed && <ListItemText primary="CUSTOMER" primaryTypographyProps={{ fontSize: 13, fontWeight: 500 }} />}
          </ListItem>

          <ListItem component={NavLink} to="/Project" sx={sidebarItemStyle}>
            <ListItemIcon sx={{ color: 'inherit', minWidth: 40 }}>
              <LocalOfferIcon />
            </ListItemIcon>
            {!isCollapsed && <ListItemText primary="PROJECTS" primaryTypographyProps={{ fontSize: 13, fontWeight: 500 }} />}
          </ListItem>
        </List>
      </Box>
      <Box sx={{
        flexGrow: 0,
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center',
        padding: 1
      }}>
        <img
          src="https://d31g2a6snus4ly.cloudfront.net/zbooks/assets/images/paid-live-webinar-cdf05a87fc.png"
          alt="Company Logo"
          style={{ width: '70%', maxWidth: 90, height: 'auto' }}
        />
      </Box>
      <IconButton onClick={toggleSidebar} sx={{ position: 'absolute', bottom: 26, right: 10 }}>
        {isCollapsed ? <ChevronRightIcon /> : <ChevronLeftIcon />}
      </IconButton>
    </Box>
  );
}

export default Sidebar;