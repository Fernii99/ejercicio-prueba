import React from 'react'
import { useState, useEffect } from 'react';
import bbdd from '../../data/bbdd.json'
import { SearchVehicleHook } from '../hooks/searchVehicleHook';

export const AddVehicles = () => {
 

  const [image, setImage] = useState('')
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

  const handleSubmit = (event) => {
    event.preventDefault();
  
    console.log(newVehicle)
    bbdd.push( newVehicle )
    console.log(bbdd)
  };


  const handleImageChange = (event) => {
    const file = event.target.files[0];
        if (file) {
            setNewVehicle((prev) => ({
                ...prev,
                image: `../public/images/${newVehicle.brand}${newVehicle.model}.jpg`,
            }));
        }
};




  return (
    <>
    <h1> Add cars</h1>
      <form>
        <label>Marca: </label>
        <input type="text" name="brand" placeholder="Marca del coche" onChange={handleChange} />
        <br/>

        <label>Modelo: </label>
        <input type="text" name="model" onChange={handleChange}/>
        <br/>

        <label>Imagen: </label>
        <input type="file"
                id="fileInput"
                accept="image/*"
                onChange={handleImageChange}/>
        <br/>

        <label>Tipo: </label>
        <input type="text" name="type" onChange={handleChange}/>
        <br/>

        <label>Color: </label>
        <input type="text" name="color" onChange={handleChange}/>
        <br/>

        <label>Año Fabricación: </label>
        <input type="text" name="manufacturingYear" onChange={handleChange}/>
        <br/>

      <br/>
        <button type="submit" onClick={ handleSubmit }> Add Vehicle </button>
      </form>
      

      
      </>
  )
}
