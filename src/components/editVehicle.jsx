import React, { useEffect, useState } from 'react'
import { Form, useNavigate, useParams } from 'react-router-dom';
import { getAllBrands } from '../helpers/getAllBrands';
import { UpdateVehicleHook } from '../hooks/updateVehicleHook';

export const EditVehicle = ({vehicle}) => {

    const{updatedVehicle, setUpdatedVehicle, handleChange, handleSelectChange, handleSubmit, isEditMode, setIsEditMode} = UpdateVehicleHook();
    const [brands, setAllBrands] = useState([]);

    const {model, type, color, manufacturingYear} = updatedVehicle;
    const { id } = useParams();
    
    useEffect(() => {
        getBrands();
        setUpdatedVehicle(vehicle);
    }, [])

    useEffect(() => {
    }, [brands, updatedVehicle])

    const getBrands = async () => {
        const brands = await getAllBrands();
        setAllBrands(brands)
    }

    const handleBack = () => {
        setIsEditMode(false);
    }

  return (
    <>
    <button onClick={handleBack}> Go Back to vehicle data </button>
        <h1>UPDATE VEHICLE</h1>
        <Form style={{margin: 'auto'}}>
            <label>Brand: </label>

            <select name="brand" onChange={handleSelectChange}> 
                <option value={updatedVehicle.brand} > Select the brand to change </option>
                {
                    brands.map( brand => (
                        <option value={brand.id} key={brand.name}>{brand.name}</option>
                    ))
                }
            </select><br/>
            <label>Model: </label>
            <input type='text' value={model} name="model" onChange={handleChange}/><br/>
            <label>Type: </label>
            <input type='text' value={type} name="type" onChange={handleChange}/><br/>
            <label>Color: </label>
            <input type='text' value={color} name="color" onChange={handleChange}/><br/>
            <label>Manufacturing Year: </label>
            <input type='text' value={manufacturingYear} name="manufacturingYear" onChange={handleChange} /><br/>
            <button type="submit" onClick={() => handleSubmit(id)}> Save updated Vehicle</button>
        </Form>
    </>
  )
}
