import React, { useState } from 'react'
import { useEffect } from 'react';
import { SearchVehicleHook } from '../hooks/searchVehicleHook';
import { getAllCars } from '../helpers/getAllCars';

export const VehicleList = () => {

  const { setVehicles, vehicles } = SearchVehicleHook();
  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect( () => {
    console.log("[] LOAD OF VEHICLE LIST BEFORE LOAD DATA")
    console.log(vehicles)
    if(!dataLoaded){ 
        loadData()
    } else {

    } 

    console.log("vehicle list [] load")
    console.log(vehicles)
  }, [])

  useEffect( () => {
    console.log("VEHICLE LIST UPDATED VEHICLES DETECTION AFTER SUBMIT?")
  }, [setVehicles])
  
  
  const loadData = async () =>{
    const allVehicles = await getAllCars();
    setVehicles(allVehicles);
    setDataLoaded(true)
  }

  return (
    <div>
    <h1> List of all cars </h1>
    <h1> {JSON.stringify}</h1>
    <div style={{ display:'flex', flexDirection:'row', justifyContent: 'space-between', width: '50vw' }}>
        {vehicles.length === undefined ?
        <h3> Cars not found </h3>  
        
        :
        vehicles.map( car => 
          <div key={car.model} className="card">
              <h4> { car.brand }</h4>
              <img src={car.image} alt="car image" width="100" height="100" />
              <span> { car.model }</span>
              <span> { car.type }</span>
              <span> { car.color }</span>
              <span> { car.manufacturingYear }</span>
          </div>
          ) 
        }
    </div>
  </div>
  )
}
