import React, { useEffect, useState } from 'react'
import { Form, useParams } from 'react-router-dom';
import { getAllBrands } from '../helpers/getAllBrands';
import { UpdateVehicleHook } from '../hooks/updateVehicleHook';
import { useQuery } from '@tanstack/react-query'

export const EditVehicle = ({vehicle}) => {

    const{updatedVehicle, setUpdatedVehicle, handleChange, handleSelectChange, handleSubmit, isEditMode, setIsEditMode} = UpdateVehicleHook();
    const [brands, setAllBrands] = useState([]);

    const {model, type, color, manufacturingYear} = updatedVehicle;
    const { id } = useParams();
    
    const {isPending, error, data } = useQuery({
        queryKey: ['brandsData'],
        queryFn: async () => {
            const response = await fetch('http://localhost:8000/api/brands');
            const json = response.json();
            console.log( json )
            return json
        }
    })

    useEffect(() => {
        getBrands();
        setUpdatedVehicle(vehicle);
    }, [])

    useEffect(() => {
    }, [brands, updatedVehicle, setIsEditMode])

    const getBrands = async () => {
        const brands = await getAllBrands();
        setAllBrands(brands)
    }

    const handleBack = () => {
        setIsEditMode(false);
    }


    if (isPending) return 'Loading...'

    if (error) return 'An error has occurred: ' + error.message
  
  return (
    <>
    <button onClick={handleBack}> Go Back to vehicle data </button>
        <h1>UPDATE VEHICLE</h1>
        <Form style={{margin: 'auto'}}>
            <label>Brand: </label>
            <select name="brand" onChange={handleSelectChange}> 
                <option value={updatedVehicle.brand} > Select the brand to change </option>
                { data &&
                    data.map( brand => (
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
            <input type='number' value={manufacturingYear} name="manufacturingYear" onChange={handleChange} maxLength={4} minLength={4} /><br/>
            
            <button type="submit" onClick={() => handleSubmit(id)}> Save updated Vehicle</button>
        </Form>
    </>
  )
}
