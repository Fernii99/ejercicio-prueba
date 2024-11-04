
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
      mutationFn: async () => {
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
  
      
      try {
          await updateVehicleMutation.mutateAsync();
          alert('Vehicle updated successfully');
          
      } catch (error) {
          alert('Failed to update vehicle, try again please ');
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
