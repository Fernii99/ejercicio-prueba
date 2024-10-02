import React from 'react'
import { useState, useEffect } from 'react';
import { SearchVehicleHook } from '../hooks/searchVehicleHook';
import axios from 'axios';

export const AddVehicles = () => {
 
  const [newVehicle, setNewVehicle] = useState({
    "brand": '',
    "model": '',
    "image": '',
    "type": '',
    "color": '',
    "manufacturingYear": ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewVehicle(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const { name, files } = e.target;
    console.log(files[0])
    setNewVehicle(prevData => ({
      ...prevData,
      [name]: files[0]
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(newVehicle)
    try {
      const response = await axios.post("http://localhost/car-test/save-car.php", newVehicle, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      console.log(response.data)
    }catch (error){
      console.log('error uploading car: ', error)
    }

    setNewVehicle({
      "brand": '',
      "model": '',
      "image": '',
      "type": '',
      "color": '',
      "manufacturingYear": ''
    })
  };

  return (
    <>
    <h1> Add cars</h1>
      <form>
        <label>Marca: </label>
        <input type="text" name="brand" value={newVehicle.brand} placeholder="Marca del coche" onChange={handleChange} />
        <br/>

        <label>Modelo: </label>
        <input type="text" value={newVehicle.model} name="model" onChange={handleChange}/>
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
        <input type="text" name="type" value={newVehicle.type} onChange={handleChange}/>
        <br/>

        <label>Color: </label>
        <input type="text" name="color" value={newVehicle.color} onChange={handleChange}/>
        <br/>

        <label>Año Fabricación: </label>
        <input type="text" name="manufacturingYear" value={newVehicle.manufacturingYear} onChange={handleChange}/>
        <br/>

      <br/>
      <button type="submit" onClick={ handleSubmit }> Add Vehicle </button>
      </form>
      

      
      </>
  )
}
