import React, { useEffect, useState  } from 'react'
import { useNavigate } from 'react-router-dom';
import { AddVehicles } from '../components/addVehicles';

export const AddVehicle = () => {
    
    const navigate = useNavigate();
   

    const handleClickView = (route) => {
    
        switch (route){
            case 'vehicles':
                return navigate('/vehicles');
            case 'back':
                return navigate(-1);
            case 'concessionaires':
                return navigate('/concessionaires');
        }
    
      }

  return (
    <>
        <button className="NavigationButton" onClick={() => handleClickView("vehicles")} style={{marginRight: 10}}> Search Vehicles </button>
        <button className="NavigationButton" onClick={() => handleClickView("back")} style={{marginRight: 10}}> Back to Concesionaire information </button>
        <button className="NavigationButton" onClick={() => handleClickView("concessionaires")}>Change to concesionaires</button>

        <div style={{margin: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent:'center', width: '50%'}}>
            <AddVehicles />
        </div>
    </>
  )
}
