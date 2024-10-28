
import { useEffect, useState } from "react";

import { useMutation, useQuery } from '@tanstack/react-query'
import { json, useParams } from "react-router-dom";
import axios from "axios";


export const UpdateVehicleHook = () => {

    const {id} = useParams();
    const [updatedVehicle, setUpdatedVehicle] = useState({
      brand: '',
      model: '',
      type: '',
      color: '',
      manufacturingYear: '',
    });
    const [isEditMode, setIsEditMode] = useState(false);

    const updateVehicleMutation = useMutation({
      mutationFn: async (id, updatedVehicle) => {
          try {
              const response = await axios.put(`http://localhost:8000/api/cars/update/${id}`, updatedVehicle, {
                  headers: {
                      'Content-Type': 'application/json',
                  },
              });
  
              return response.data; // Axios response is already parsed as JSON
          } catch (error) {
              console.error('Error updating vehicle:', error);
              throw error; // Rethrow to handle it later in your app
          }
      },
    });

  useEffect( () => {
    console.log(updatedVehicle)
  }, [updatedVehicle])
    
    const handleChange = (e) => {
      const { name, value } = e.target;
      setUpdatedVehicle(prevData => ({
        ...prevData,
        [name]: value
      }));
    };
    
    const handleSelectChange = (event) => {
      const { name, value } = event.target;
      setUpdatedVehicle(prevData => ({
        ...prevData,
        [name]: value
      }));
    };

    const handleSubmit = async (event) => {
      event.preventDefault; // Prevent default form submission
  
      const vehicleId = id; // Ensure this ID is set correctly
      const vehicleData = updatedVehicle; // Make sure this is the correct data structure
  
      try {
          const response = await updateVehicleMutation.mutateAsync(vehicleId, vehicleData);
          console.log('Vehicle updated successfully:', response);
      } catch (error) {
          console.error('Failed to update vehicle:', error);
      }
  };

  const handleEdit = () => {
    setIsEditMode(true)
  }


  return {
    updatedVehicle, 
    setUpdatedVehicle,
    isEditMode,
    setIsEditMode,
    handleChange,
    handleSelectChange,
    handleSubmit,
    handleEdit,
  }
}
