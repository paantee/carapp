import React, { useState, useEffect, useRef } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css'; // Core grid CSS, always needed
import 'ag-grid-community/styles/ag-theme-material.css'; // Optional theme CSS
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import Addcar from './Addcar';


export default function Carlist() {

    const gridRef = useRef();
    const [cars, setCars] = useState([]);
    const [open, setOpen] = useState(false);

    useEffect(() => fetchData(), []);

    const columns = [
        {
            field: 'brand',
            sortable: true,
            filter: true
        },
        {
            field: 'model',
            sortable: true,
            filter: true
        },
        {
            field: 'color',
            sortable: true,
            filter: true
        },
        {
            field: 'fuel',
            sortable: true,
            filter: true
        },
        {
            field: 'year',
            sortable: true,
            filter: true
        },
        {
            field: 'price',
            sortable: true,
            filter: true
        }
    ]

    const fetchData = () => {
        fetch('https://carstockrest.herokuapp.com/cars')
        .then(response => response.json())
        .then(data => setCars(data._embedded.cars))
        console.log("cars")
    }

    const deleteCar = () => {
        if (gridRef.current.getSelectedNodes().length > 0) {
        setCars(cars.filter((car, index) =>
        index !== gridRef.current.getSelectedNodes()[0].childIndex));
        setOpen(true);
        } else {
          alert('Select row first!');
        }
      }

      const saveCar = (car) => {
        fetch('https://carstockrest.herokuapp.com/cars', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(car)
        })
        .then(res => fetchData())
        .catch(err => console.error(err))
      }
    return (
        <body>
        <div>
        <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Teemu's Carshop
            <Button startIcon={<AddIcon/>} onClick={<Addcar saveCar={saveCar}/>} variant="contained">Add</Button>
            <Button startIcon={<DeleteIcon/>} onClick={deleteCar} variant="contained">Delete</Button>
            
          </Typography>
        </Toolbar>
      </AppBar>
      <Addcar saveCar={saveCar}/>
            <div className="ag-theme-material"style={{height: '800px', width: '80%', margin: 'auto'}} >
            <AgGridReact className='grid'
            columnDefs={columns}
            rowData={cars}
            animateRows={true}
            ref={gridRef}
            onGridReady={params => gridRef.current = params.api}
            rowSelection='single'>
            </AgGridReact>
            </div>
        </div>
        </body>
    );
}