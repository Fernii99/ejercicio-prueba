
import React from 'react'
import { useEffect } from 'react';

import { SearchVehicleHook } from '../hooks/searchVehicleHook';

import { SearchVehicles } from '../components/searchVehicles';
import { NavigationButtons } from '../components/navigationButtons';
import { useNavigate } from 'react-router-dom';
import { getAllCars } from '../helpers/getAllCars';

export const ViewCars = () => {

    const navigate = useNavigate();

  const { setVehicles, vehicles } = SearchVehicleHook();

  useEffect( () => {
    loadData();
  }, [])

  useEffect( () => {
    
  }, [vehicles])

  const loadData = async () =>{
    const allVehicles = await getAllCars();
    setVehicles(allVehicles);
  }

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
