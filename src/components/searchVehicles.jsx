import React from 'react'
import { useEffect, useState } from 'react';
import { SearchVehicleHook } from '../hooks/searchVehicleHook'

import { getAllCars } from '../helpers/getAllCars';
import { useNavigate } from 'react-router-dom';

export const SearchVehicles = () => {
  const { vehicles, setVehicles, handleSelectChange, formData, handleSubmit, selectedYears, setSelectedYears, handleCheckboxChange } = SearchVehicleHook();

  const navigate = useNavigate();
  
  const handleClickView = (route, id) => {

    route === "vehicle" ? 
      navigate(`/vehicle/${id}`)
    : 
      navigate(`/concesionaire`)
  }


  // State to hold unique vehicle types data values and the different values on each vehicle
  const [uniqueValues, setUniqueValues] = useState({});
  
  useEffect(() => {
    loadData();
  }, [])

  useEffect(() => {
    // Function to calculate unique values for each field
    const calculateUniqueValues = () => {
      return vehicles.reduce((acc, vehicle) => {
        Object.keys(vehicle).forEach((key) => {
          if (!acc[key]) {
            acc[key] = new Set(); // Initialize a new Set for each key
          }
          acc[key].add(vehicle[key]); // Add the vehicle's value to the Set
        });
        return acc;
      }, {});
    };
  
    // Calculate unique values and convert Sets to arrays
    const uniqueValues = calculateUniqueValues();
    const uniqueValuesArray = Object.fromEntries(
      Object.entries(uniqueValues).map(([key, valueSet]) => [key, Array.from(valueSet)])
    );
  
    setUniqueValues(uniqueValuesArray);
  }, [vehicles]);

  useEffect(()=> {
    console.log(uniqueValues)
  }, [uniqueValues])

  const loadData = async () => {
    const allVehicles = await getAllCars();
    setVehicles(allVehicles);
  };


  return (
    <>
      <h1> Search cars</h1>
      <form style={{ width: '100%', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around', alignItems: 'center' }}>
        {Object.entries(uniqueValues).map(([key, values]) => (
            (key != "id" && key != "image")  ?
              <div key={key} style={{width: '15%'}}>
                <select id={key} name={key} onChange={handleSelectChange} className='select'>
                  <option>select {key.charAt(0).toUpperCase()+ key.slice(1)}</option>
                  {values.map((value, index) => (
                    <option key={index} value={value}>
                      {value}
                    </option>
                  ))}
                </select>
              </div>
              :
              null
        ))}
        
        <button type="submit" onClick={handleSubmit} className="FiltersButton">Search Vehicle</button>
      </form>

      <div>
        <h1>List of all cars</h1>
        <div style={{ display: 'flex', flexWrap: 'wrap', flexDirection: 'row', gap: 20, marginBottom: 50 }}>
          

          { vehicles.length > 0 ? (
            vehicles.map((car, index) => (
              <div key={index} className="card">
                <h4>{car.brand_name} - {car.car_model}</h4>
                <img src={car.image} alt="car image" width="200" height="150" />
                <span>{car.type}</span>
                <span>Color: {car.color}</span>
                <span>Manufacturing Year: {car.manufacturingYear}</span>
                <button type="submit" className="button" onClick={() => handleClickView("vehicle", car.id)}>View vehicle information</button>
              </div>  
            ))
          ) : (
            <h3>No cars matching this criteria</h3>
          )}
        </div>
      </div>
    </>
  );
};