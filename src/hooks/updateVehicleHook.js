
import { useEffect, useState } from "react";
import axios from "axios";

export const UpdateVehicleHook = () => {
 

    const [updatedVehicle, setUpdatedVehicle] = useState({});
    const [isEditMode, setIsEditMode] = useState(false);
    
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

    const handleSubmit = async (id) => {
      console.log(updatedVehicle)
      try{
          const response = await axios.put(`http://localhost:8000/api/cars/update/${id}`, updatedVehicle, {
              headers: {
                  'Content-Type': 'application/json',
              },
          });
          if(response.status === 200){
            console.log( "Vehicle correctly updated!!!");
            console.log(response.data);
          }
          else{
              alert("Error updating vehicle data!")
          }

      }catch (e) {
          console.log(e )
      }
  }

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
