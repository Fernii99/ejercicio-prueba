import { useEffect, useState } from 'react'
import './App.css'
import { SearchVehicleHook } from './hooks/searchVehicleHook'
import { getAllCars } from './helpers/getAllCars'
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';

function App() {
  
  const navigate = useNavigate();

  const handleClickView = (route) => {
    
    switch (route){
        case 'vehicles':
            return navigate('/vehicles');
        case 'add':
            return navigate('/add');
        case 'concessionaires':
            return navigate('/concessionaires');
    }

  }
  
  return (

    
  <>
  <div className='NavigationBar'>
    <button className="NavigationButton" onClick={() => handleClickView("vehicles")} style={{marginRight: 10}}> Search Vehicles </button>
    <button className="NavigationButton" onClick={() => handleClickView("concessionaires")}>Change to concesionaires</button>
  </div>
    <div style={{width:'100%', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
   <h1> Where to navigate</h1>
    </div>

  

  </>

  )
}

export default App
