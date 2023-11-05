import React from 'react'
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import FunctionsOutlinedIcon from '@mui/icons-material/FunctionsOutlined';

function NavBar() {
  return (
    <AppBar position="static" color="secondary">
    <Toolbar variant="dense">
      <FunctionsOutlinedIcon edge="start"  sx={{ mr: 1 }}>    
      </FunctionsOutlinedIcon>
      <Typography variant="h5"  component="div">
      Binary Calculator
      </Typography>
    </Toolbar>
    </AppBar>
  )
}

export default NavBar