
import { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

import { useMutation, useQuery } from '@tanstack/react-query'


export const AddVehicleHook = () => {

  const {id} = useParams();
  const navigate = useNavigate();

  
  const [newVehicle, setNewVehicle] = useState({
    "brand": '',
    "model": '',
    "image": '',
    "type": '',
    "color": '',
    "manufacturingYear": '',
    "concessionaire_id":''
  });
  
  const vehicleMutation = useMutation({
    mutationFn: async (formData) => {
      const response = await fetch('http://localhost:8000/api/cars/new', {
        method: 'POST',
        body: formData, // Pass the FormData object
      });
  }})

      const handleChange = (e) => {
        const { name, value } = e.target;
        setNewVehicle(prevData => ({
          ...prevData,
          [name]: value
        }));
      };
    
      const handleImageChange = (e) => {
        const { name, files } = e.target;
        setNewVehicle(prevData => ({
          ...prevData,
          [name]: files[0]
        }));
      };
    
      const handleSelectChange = (event) => {
        const { name, value } = event.target;
        console.log(name + value)
        setNewVehicle(prevData => ({
          ...prevData,
          [name]: value
        }));
      };

      const handleSubmit = async (event) => {
        event.preventDefault();
        
        const formData = new FormData();
        formData.append('brand', newVehicle.brand);
        formData.append('model', newVehicle.model);
        formData.append('color', newVehicle.color);
        formData.append('manufacturingYear', newVehicle.manufacturingYear);
        formData.append('type', newVehicle.type);
        formData.append('image', newVehicle.image); // Appending the image file
        formData.append('concessionaire_id', id); // Append the `concessionaire_id`
    
        // Mutate the data
        vehicleMutation.mutate(formData);
        try {
          
          vehicleMutation.mutate(data)
       
          navigate(`/concessionaire/${id}`)
        }catch (error){
          console.log('error uploading car: ', error)
        }
        

      };


  return {
    newVehicle, 
    setNewVehicle, 
    handleChange,
    handleImageChange,
    handleSubmit,
    handleSelectChange,
    vehicleMutation
    }
}
