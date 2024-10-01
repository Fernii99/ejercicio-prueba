import React from 'react'
import { useEffect, useState } from 'react';
import { SearchVehicleHook } from '../hooks/searchVehicleHook'
import bbdd  from '../../data/bbdd.json'

export const SearchVehicles = () => {
  const {handleChange, manufacturingYear, uniqueBrands, uniqueTypes, handleSelectChange, selectedBrand, handleSubmit, searchResult, setSearchResult, uniqueColors, formData} = SearchVehicleHook();

  useEffect( () => {
    setSearchResult(bbdd)
  }, [])

  return (
    <>
    <h1> Search cars</h1>
      <form>
        <label>Marca: </label>
        <select name="brand" value={formData.brand} onChange={handleSelectChange}>
          <option  name="brand"  value="">Seleccione la marca</option>
          {uniqueBrands.map((brand, index) => <option key={index} name="brand"  value={brand}>{brand}</option> )}
        </select>
        <br/>

        <label>Modelo: </label>
        <input type="text" name="model" onChange={handleChange}/>
        <br/>

        <label>Tipo: </label>
        <select name="type" value={formData.type} onChange={handleSelectChange}>
            {uniqueTypes.map((type, index) => <option key={index}  name="type" value={type}>{type}</option> )}
          </select>
        <br/>

        <label>Color: </label>
          <select name="color" value={formData.color} onChange={handleSelectChange}>
            {uniqueColors.map((color, index) => <option key={index}  name="color" value={color}>{color}</option> )}
          </select>
        <br/>

        <label>Año Fabricación: </label>
        <input type="text" name="manufacturingYear" onChange={handleChange}/>
        <br/>

      <br/>
        <button type="submit" onClick={ handleSubmit }> Seach Vehicle </button>
      </form>
      

      <div>
        <div>
          <h1> List of all cars </h1>
          <div style={{ display:'flex', flexDirection:'row', justifyContent: 'space-between', width: '50vw' }}>
          {searchResult.length > 0 ? 
          
            searchResult.map( car => 
                <div key={car.model} className="card">
                  <h4> { car.brand }</h4>
                  <img src={`../public/images/${car.image}`} alt="car image" width="50" height="50" />
                  <span> { car.model }</span>
                  <span> { car.type }</span>
                  <span> { car.color }</span>
                </div>
            )
          :
          <h3> Cars not found </h3>

          }
          </div>
        </div>
      </div>
      </>
  )
}
