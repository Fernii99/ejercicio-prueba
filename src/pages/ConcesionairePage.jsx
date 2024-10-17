import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { getConcesionaireInformation } from '../helpers/getConcesionaireInformation';
import { getCommentsInformation } from '../helpers/getCommentsInformation';

export const ConcesionairePage = () => {

    const { id } = useParams();
    const navigate = useNavigate();
    const [concessionaire, setConcessionaire] = useState([]);
    const [comments, setComments] = useState([]);
    const [isDataLoading, setIsDataLoading] = useState(true);

    useEffect(() => {
        loadConcessionairesInformation();
    }, [])

    useEffect(() => {
    }, [isDataLoading])

    const loadConcessionairesInformation = async () => {
        const concessionairesData = await getConcesionaireInformation(id);
        const commentsData = await getCommentsInformation(id)
        console.log(commentsData)
        setInterval(() => {
        }, 1500);
        
        setConcessionaire(concessionairesData);
        setComments(commentsData);
        setIsDataLoading(false);
    } 


    const handleBack = () => {
      navigate('/concessionaires');
    }

    const handleAddVehicle = () => {
      navigate(`/add/${id}`, { state: { brands: concessionaire.brand } });
    }


  return (
    <>
    <button className='NavigationButton' onClick={handleBack}> Return to Concessionaires page </button>
    <button className='NavigationButton' onClick={handleAddVehicle}>Add Vehicle </button>
      
    <h1> VEHICLES: </h1>
    <div style={{display: 'flex', flexWrap: 'wrap', width: '100%', margin: 'auto'}}>
       {!isDataLoading && concessionaire != [] ?
        concessionaire.cars.map( vehicle => (
          <>
          <div style={{width: '40%', border: '1px solid white', margin: '10px', display: 'flex', justifyContent: 'space-between'}} >
            <img src={vehicle.image} width={200} alt="vehicle picture couldnt load" /> 
            <div style={{display: 'flex', flexWrap: 'wrap', width: '700px',  justifyContent: 'space-around'}}>
              <p>Brand: {vehicle.brand}</p>
              <p>Model: {vehicle.car_model}</p>
              <p>type: {vehicle.type}</p>
              <p>Color: {vehicle.color}</p>
              <p>Manufactur Year: {vehicle.manufacturingYear}</p>
            </div>
          </div>
          </>
        ))
        : <h1> Loading Data</h1>
      }
    </div>


    <h1> COMMENTS: </h1>
    <div style={{display: 'flex', flexWrap: 'wrap', width: '100%', margin: 'auto'}}>
       {comments.length > 0 ?
        comments.map( coment => (
          <>
            <div style={{width: '40%', border: '1px solid white', margin: '10px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}} >
                <span> User: {coment.user} <br/> Comment: {coment.comment_text} <br/> Publish Date: {coment.created_at} <br/> Car ID: {coment.car_id}</span>
            </div>
          </>
        ))
        : <h1> Loading Data</h1>
      }
    </div>

    </>
  )
}
