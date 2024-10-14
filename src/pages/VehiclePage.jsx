import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { GetVehicleInformation } from '../helpers/getVehicleInformation';
import { CommentCard } from '../components/commentCard';

export const VehiclePage = () => {
  
  const navigate = useNavigate();
  
  const { id } = useParams();

  const [vehicleData, setVehicleData] = useState({});
  const [isLoadingData, setIsLoadingData] = useState(true);

  const [name, setName] = useState('');
  const [comment, setComment] = useState('');

  useEffect(() => {
    loadCarInformation();
  }, [])

  useEffect( () => {
   console.log(vehicleData)
  }, [vehicleData])

  const loadCarInformation = async () => {
    const retrievedVehicleData = await GetVehicleInformation(id)
    setVehicleData(retrievedVehicleData);
    
    setInterval(() => {
      
    }, 1500);

    setIsLoadingData(!isLoadingData)

  } 

  const handleBack = () =>{
    navigate('/');
  }

  

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Create an object with the name and comment
    const commentObject = {
      "car_id": id,
      "user": name,
      "comment_text": comment,
    };


    console.log(commentObject)

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
       <>
        <div style={{width: '100%', display: 'flex'}} >
          <button style={{marginBottom: '20px'}} onClick={handleBack} className="button"> ← Return To Vehicle List </button>
        </div>
      
        <div style={{width: '100%', display: 'flex', marginBottom: 70, gap: 90}}>
          <aside style={{width: '50%'}}>
            <img src={vehicleData.image} alt="vehicles image" width="100%" height="auto" />
          </aside>
          
          <div style={{display: 'flex', flexDirection: 'column', alignItems: 'left', width: '100%'}}>
              <h1 style={{textAlign: 'left'}} > {vehicleData.brand}</h1>
              <p style={{textAlign: 'left', fontSize: 25, marginTop: '-20px'}}> {vehicleData.model}</p>
              <p style={{textAlign: 'left', marginTop: '-10px'}}><strong>Type:</strong> {vehicleData.type}</p>
              <p style={{textAlign: 'left', marginTop: '-10px'}}><strong>Color:</strong> {vehicleData.color}</p>
              <p style={{textAlign: 'left', marginTop: '-10px'}}><strong>Manufacturing Year:</strong> {vehicleData.manufacturingYear}</p>
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
