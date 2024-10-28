import React from 'react'
import { useEffect, useState } from 'react';
import { SearchVehicleHook2 } from '../hooks/searchVehicleHook2'

import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query'


export const SearchVehicles = () => {
  const navigate = useNavigate();
  const { calculateUniqueValues, handleSelectChange, filterVehicles, setFilterVehicles } = SearchVehicleHook2();

  // State to hold unique vehicle types data values and the different values on each vehicle
  const [filtersValues, setFiltersValues] = useState({});

  //LOAD OF THE VEHICLES DATA & GENERATION OF THE FILTERS ON THE COMPONENT LOAD
  // store of the values, unique identification name
  const { isPending, error, data } = useQuery({
    queryKey: ['vehicleData'],
    queryFn: async () => {
      const response = await fetch('http://localhost:8000/api/cars');
      const json = await response.json();

      // Process data for unique values
      const uniqueValues = calculateUniqueValues(json);
      const uniqueValuesArray = Object.fromEntries(
        Object.entries(uniqueValues).map(([key, valueSet]) => [key, Array.from(valueSet)])
      );

      // Update component state
      setFilterVehicles(json);
      setFiltersValues(uniqueValuesArray);

      // Return the data so `useQuery` can use it
      return json;
    },
    refetchOnWindowFocus: false, // Automatically refetches when window gains focus
  })

  /**
   *  NAVIGATION TO THE VEHICLE PAGE OR CONCESSIONAIRES PAGE  
   */
  const handleClickView = (route, id) => {
    route === "vehicle" ? 
      navigate(`/vehicle/${id}`)
    : 
      navigate(`/concesionaire`)
  } 

    
  
  if (isPending) return 'Loading...'

  if (error) return 'An error has occurred: ' + error.message

  return (
    <>
      <h1> Search cars</h1>
      <form style={{ width: '100%', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around', alignItems: 'center' }}>
        {Object.entries(filtersValues).map(([key, values]) => (
            (key != "id" && key != "image" && key != "brand_id")  ?
            (key != "manufacturingYear") ?
              <div key={key} style={{width: '15%'}}>
                <select id={key} name={key} onChange={(event) => handleSelectChange(event, data)} className='select'>
                  <option name={key} value="">select {key.charAt(0).toUpperCase()+ key.slice(1)}</option>
                  {values.map((value, index) => (
                    <option key={index} value={value}>
                      {value}
                    </option>
                  ))}
                </select>
              </div>
              :
              <div key={key} style={{width: '15%', }}>
                <h3> Manufacturing Years </h3>
                {values.map((value, index) => (
                  <>
                    <input type='checkbox' id="manufacturingYear" name="manufacturingYear" value={value} onChange={() => handleCheckboxChange(value)} style={{marginLeft: 25}}/>{value}
                  </>
                ))}
              </div>
              :
              null
        ))}
        
        <button type="submit" onClick={(event) => handleReset(event)} className="FiltersButton">Reset</button>
      </form>

      <div>
        <h1>List of all cars</h1>
        <div style={{ display: 'flex', flexWrap: 'wrap', flexDirection: 'row', gap: 20, marginBottom: 50 }}>
            {filterVehicles.map((car, index) => (
              <div key={index} className="card">
                <h4>{car.brand_name} - {car.car_model}</h4>
                <img src={car.image} alt="car image" width="200" height="150" />
                <span>{car.type}</span>
                <span>Color: {car.color}</span>
                <span>Manufacturing Year: {car.manufacturingYear}</span>
                <button type="submit" className="button" onClick={() => handleClickView("vehicle", car.id)}>View vehicle information</button>
              </div>  
            ))}
        </div>
      </div>
    </>
  );
};