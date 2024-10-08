
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
    
      const handleSubmit = async (event) => {
        event.preventDefault();
        try {
          const response = await axios.post("http://localhost/car-test/save-car.php", newVehicle, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          })
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
    }
}
