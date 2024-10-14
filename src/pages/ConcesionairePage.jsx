import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { getConcesionaireInformation } from '../helpers/getConcesionaireInformation';

export const ConcesionairePage = () => {

    const { id } = useParams();
    const navigate = useNavigate();
    const [concessionaire, setConcessionaire] = useState([]);
    const [isDataLoading, setIsDataLoading] = useState(true);

    useEffect(() => {
        loadConcessionairesInformation();
    }, [])

    useEffect(() => {
    }, [isDataLoading])

    const loadConcessionairesInformation = async () => {
        const concessionairesData = await getConcesionaireInformation(id);
        
        setInterval(() => {
        }, 1500);
        
        setConcessionaire(concessionairesData);
        setIsDataLoading(false);
    } 


    const handleBack = () => {
      navigate('/concessionaires');
    }

  return (
    <>
    <button className='NavigationButton' onClick={handleBack}> Return to Concessionaires page </button>
      <h1> VEHICLES: </h1>
    <div style={{display: 'flex', flexWrap: 'wrap', width: '100%', justifyContent: 'space-around'}}>
       {!isDataLoading && concessionaire != [] ?
        concessionaire.cars.map( vehicle => (
          <div style={{width: '40%', border: '1px solid white', margin: '10px', display: 'flex', justifyContent: 'space-between'}} >
            <img src={vehicle.image} width={200} alt="vehicle picture couldnt load" /> 
            <div style={{display: 'flex', flexWrap: 'wrap', width: '700px', display: 'flex', justifyContent: 'space-around'  }}>
              <p>Brand: {vehicle.brand}</p>
              <p>Model: {vehicle.car_model}</p>
              <p>type: {vehicle.type}</p>
              <p>Color: {vehicle.color}</p>
              <p>Manufactur Year: {vehicle.manufacturingYear}</p>
            </div>
          </div>
        ))
        : null
      }
    </div>

    </>
  )
}
