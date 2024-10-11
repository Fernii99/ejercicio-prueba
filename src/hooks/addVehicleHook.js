
import { useState } from "react";
import axios from "axios";
export const AddVehicleHook = () => {

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
        console.log("newVehicle DATA");
        console.log(newVehicle);
        try {
          const response = await axios.post("http://localhost:8000/api/cars/new", newVehicle, {
            headers:
            {
            'Content-Type': 'multipart/form-data',
            }
        },)
          return response
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


  return {
    newVehicle, 
    setNewVehicle, 
    handleChange,
    handleImageChange,
    handleSubmit,
    handleSelectChange,
    }
}
