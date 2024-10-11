import React, { useEffect, useState  } from 'react'
import { useNavigate } from 'react-router-dom';
import { AddVehicles } from '../components/addVehicles';
import { getAllBrands } from '../helpers/getAllBrands';

export const AddVehicle = () => {
    
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
        <button className="NavigationButton" onClick={() => handleClickView("vehicles")} style={{marginRight: 10}}> Search Vehicles </button>
        <button className="NavigationButton" onClick={() => handleClickView("add")} style={{marginRight: 10}}> Add Vehicles </button>
        <button className="NavigationButton" onClick={() => handleClickView("concessionaires")}>Change to concesionaires</button>

        <div style={{margin: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent:'center', width: '50%'}}>
            <AddVehicles />
        </div>
    </>
  )
}
