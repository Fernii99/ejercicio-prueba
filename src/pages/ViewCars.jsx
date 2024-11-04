
import React from 'react'
import { SearchVehicles } from '../components/searchVehicles';
import { useNavigate } from 'react-router-dom';

export const ViewCars = () => {

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
        <button className="NavigationButton" onClick={() => handleClickView("concessionaires")}>Change to concesionaires</button>
        <SearchVehicles />
    </>
  )
}
