import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';


export default function Appbar() {
    

    return (
      <div>
        <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Teemu's Carshop
            <Button startIcon={<AddIcon/>} variant="contained">Add</Button>
            <Button startIcon={<DeleteIcon/>} variant="contained">Delete</Button>
          </Typography>
        </Toolbar>
      </AppBar>
      </div>
    );
}