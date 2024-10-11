import React from 'react'
import { useState, useEffect } from 'react';
import { AddVehicleHook } from '../hooks/addVehicleHook';
import { getAllBrands } from '../helpers/getAllBrands';

export const AddVehicles = () => {
 
  const { newVehicle, handleChange, handleImageChange, handleSubmit, handleSelectChange  } = AddVehicleHook();

  const [brands, setBrands] = useState([]);

  useEffect( () => {
      loadData();
  }, [])
  
  useEffect( () => {
  }, [brands])

  const loadData = async () => {
      const allBrands = await getAllBrands();
      setBrands(allBrands);
  }


  return (
    <>
    <h1> Add cars</h1>
      <form style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly'}}>
          <label>Marca: </label>
            {brands.length > 0 ? 
            <select onChange={(event) => handleSelectChange(event)} name="brand" className='select'>
            <option> Select Brand: </option>
            {brands.map(brand => (
              <option key={brand.id} value={brand.id}>
                {brand.name}
              </option>
            ))}
          </select>
            :  
              null
            }
          <br/>

          <label>Modelo: </label>
          <input type="text" value={newVehicle.model} name="model" onChange={handleChange} className="select"/>
          <br/>

          <label>Imagen: </label>
          <input
                  type="file"
                  name="image"
                  id="fileInput"
                  accept="image/*"
                  onChange={event => handleImageChange(event)}/>
          <br/>

          <label>Tipo: </label>
          <input type="text" name="type" value={newVehicle.type} onChange={handleChange} className="select"/>
          <br/>

          <label>Color: </label>
          <input type="text" name="color" value={newVehicle.color} onChange={handleChange} className="select"/>
          <br/>

        
          <label>Año Fabricación: </label>
          <input type="text" name="manufacturingYear" value={newVehicle.manufacturingYear} onChange={handleChange} className="select"/>
          <br/>
        

      <br/>
      <button type="submit" onClick={ handleSubmit }> Add Vehicle </button>
      </form>
      

      
      </>
  )
}
