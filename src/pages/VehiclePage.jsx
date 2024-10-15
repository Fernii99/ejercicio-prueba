import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { GetVehicleInformation } from '../helpers/getVehicleInformation';
import { CommentCard } from '../components/commentCard';
import { EditVehicle } from '../components/editVehicle';
import { UpdateVehicleHook } from '../hooks/updateVehicleHook';

export const VehiclePage = () => {
  
  const navigate = useNavigate();
  
  const { id } = useParams();

  // Getting state and handlers from the custom hook
  const { updatedVehicle, setUpdatedVehicle, isEditMode, handleEdit } = UpdateVehicleHook();

  const [vehicleData, setVehicleData] = useState({});
  const [isLoadingData, setIsLoadingData] = useState(true);

  const loadCarInformation = async () => {
    const retrievedVehicleData = await GetVehicleInformation(id);
    setUpdatedVehicle(retrievedVehicleData);
    setIsLoadingData(false); // No need for interval here
  };

  useEffect(() => {
    loadCarInformation();
  }, []);

  useEffect(() => {
  }, [isEditMode]); // Trigger re-render when isEditMode changes

  const handleBack = () => {
    navigate('/Vehicles');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Create an object with the name and comment
    const commentObject = {
      "car_id": id,
      "user": name,
      "comment_text": comment,
    };
    try {
      const response = await axios.post("http://localhost:8000/api/comments/new", commentObject);
      setVehicleData((prevCar) => ({
        ...prevCar, // Spread the previous car object properties
        comments: [...prevCar.comments, commentObject] // Add new comment to the existing comments array
      }));
    }catch (error){
      console.log(error)
    }
  };

  

  
  return (
    isLoadingData 
      ? <h1> LOADING VEHICLE DATA </h1>
      : 
        isEditMode ? 
          <EditVehicle  vehicle={updatedVehicle}/>
        : 
        <>
          <div style={{width: '100%', display: 'flex'}} >
            <button style={{marginBottom: '20px'}} onClick={handleBack} className="button"> ← Return To Vehicle List </button>
            <button style={{marginBottom: '20px'}} onClick={handleEdit} className="button"> Edit Vehicle Information </button>
          </div>
        
          <div style={{width: '100%', display: 'flex', marginBottom: 70, gap: 90}}>
            <aside style={{width: '50%'}}>
              <img src={updatedVehicle.image} alt="vehicles image" width="100%" height="auto" />
            </aside>
            
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'left', width: '100%'}}>
                <h1 style={{textAlign: 'left'}} > {updatedVehicle.brand}</h1>
                <p style={{textAlign: 'left', fontSize: 25, marginTop: '-20px'}}> {updatedVehicle.model}</p>
                <p style={{textAlign: 'left', marginTop: '-10px'}}><strong>Type:</strong> {updatedVehicle.type}</p>
                <p style={{textAlign: 'left', marginTop: '-10px'}}><strong>Color:</strong> {updatedVehicle.color}</p>
                <p style={{textAlign: 'left', marginTop: '-10px'}}><strong>Manufacturing Year:</strong> {updatedVehicle.manufacturingYear}</p>
            </div>


          </div>
        
          <div style={{display: 'flex', flexDirection: 'row'}}>
            <div style={{display: 'flex', flexDirection: 'column', width: '30%'}} >
              <label style={{ textAlign:'left',marginBottom:10}}>Usuario: </label>
              <input type="text" style={{width: 400, marginBottom: 30 }} onChange={(e) => setName(e.target.value)}/>
              <label style={{textAlign: 'left', width: '100%'}}>Comentario:</label> 
              <textarea style={{width: 400, marginBottom: 30 }}  onChange={(e) => setComment(e.target.value)} />
              <button type="submit" style={{width: 300, marginTop: 20}} className='button' onClick={(event) => handleSubmit(event)}> Publish comment </button>
            </div>

          <h2> Vehicle Reviews:</h2>  
            
            <div style={{display: 'flex', flexWrap:'wrap', flexDirection: 'row', width: '50%', justifyContent: 'space-around'}}>
            
              {
              (vehicleData.comments && vehicleData.comments.length > 0)
                ?
                  vehicleData.comments.map(comentario => (
                    <CommentCard key={comentario.comment_id} comentario={comentario}  />
                  )) 
                :
                <p> There are no comments on this vehicle</p>
              }

            </div>
          </div>
        </>
      
  )
}
