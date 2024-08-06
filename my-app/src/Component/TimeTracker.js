import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

function TimeTracker() {
  const [timer, setTimer] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [intervalId, setIntervalId] = useState(null);

  useEffect(() => {
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [intervalId]);

  const startTimer = () => {
    setIsRunning(true);
    const start = Date.now() - timer;
    const id = setInterval(() => {
      setTimer(Date.now() - start);
    }, 1000);
    setIntervalId(id);
  };

  const stopTimer = () => {
    setIsRunning(false);
    if (intervalId) {
      clearInterval(intervalId);
    }
  };

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Card sx={{ mb: 2, boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)' }}>
        <CardContent sx={{ display: 'flex', alignItems: 'center', p: '10px !important' }}>
          <TextField 
            placeholder="What are you working on?" 
            variant="standard" 
            fullWidth 
            InputProps={{ disableUnderline: true }}
            sx={{ mr: 1, fontSize: '14px' }}
          />
          <Button 
            variant="text" 
            startIcon={<Typography sx={{ color: '#03a9f4', fontSize: '20px', fontWeight: 'bold' }}>+</Typography>} 
            sx={{ mr: 1, textTransform: 'none', color: '#03a9f4' }}
          >
            Project
          </Button>
          <LocalOfferIcon sx={{ color: '#999', mr: 1 }} />
          <AttachMoneyIcon sx={{ color: '#999', mr: 1 }} />
          <Typography variant="h6" sx={{ fontWeight: 'bold', mr: 1 }}>
            {new Date(timer).toISOString().substr(11, 8)}
          </Typography>
          <Button 
            variant="contained" 
            color={isRunning ? "secondary" : "primary"} 
            onClick={isRunning ? stopTimer : startTimer}
            sx={{ textTransform: 'uppercase', fontWeight: 'bold' }}
          >
            {isRunning ? 'Stop' : 'Start'}
          </Button>
        </CardContent>
      </Card>
      <Card sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <CardContent sx={{ textAlign: 'center' }}>
          <img src="https://app.clockify.me/assets/ui-icons/empty-tracker-icon.png" alt="Clockify Icon" style={{ width: '80px', height: '90px', marginBottom: '20px' }} />
          <Typography variant="h5" component="div" sx={{ mb: 1 }}>
            Let's start tracking!
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Install Clockify and track time anywhere.
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
            <img src="https://cdn-icons-png.flaticon.com/512/15465/15465583.png" alt="Android" style={{ marginRight: '10px', width: '20px', height: '20px' }} />
            <img src="https://cdn-icons-png.flaticon.com/512/2175/2175370.png" alt="Apple" style={{ marginRight: '10px', width: '20px', height: '20px' }} />
            <img src="https://cdn-icons-png.flaticon.com/512/732/732205.png" alt="Chrome" style={{ marginRight: '10px', width: '20px', height: '20px' }} />
            <img src="https://cdn-icons-png.flaticon.com/512/888/888932.png" alt="Windows" style={{ width: '20px', height: '20px' }} />
          </Box>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            50+ integrations
          </Typography>
          <Typography variant="body2" color="primary" sx={{ mt: 2, cursor: 'pointer' }}>
            Enable timesheet mode
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}

export default TimeTracker;