
import { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
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
        
        const data = new FormData();
        data.append('brand', newVehicle.brand);
        data.append('model', newVehicle.model);
        data.append('color', newVehicle.color);
        data.append('manufacturingYear', newVehicle.manufacturingYear);
        data.append('type', newVehicle.type);
        data.append('image', newVehicle.image);
        data.append('concessionaire_id', id)

        try {
          const response = await axios.post('http://localhost:8000/api/cars/new', data, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
          });
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
    }
}
