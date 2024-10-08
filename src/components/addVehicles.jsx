import React from 'react'
import { useState, useEffect } from 'react';
import { SearchVehicleHook } from '../hooks/searchVehicleHook';
import axios from 'axios';
import { AddVehicleHook } from '../hooks/addVehicleHook';

export const AddVehicles = () => {
 
  const { newVehicle, handleChange, handleImageChange, handleSubmit } = AddVehicleHook();

  return (
    <>
    <h1> Add cars</h1>
      <form style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly'}}>
          <label>Marca: </label>
          <input type="text" name="brand" value={newVehicle.brand} placeholder="Marca del coche" onChange={handleChange} className="select"/>
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
