import React, { useEffect, useState } from 'react'
import { getConcesionairesInformation } from '../helpers/getConcesionairesInformation';
import { useNavigate } from 'react-router-dom';

export const ConcesionairePage = () => {

    const navigate = useNavigate();
    const [concesionaires, setConcesionaires] = useState([])
    const [isLoadingData, setIsLoadingData] = useState(true);
    

    useEffect( () => {
        loadConcessionairesInformation();
    }, [])

    const loadConcessionairesInformation = async () => {
        const concessionairesData = await getConcesionairesInformation();
        setConcesionaires(concessionairesData);
        
        setInterval(() => {
          
        }, 1500);
    
        setIsLoadingData(!isLoadingData)
    
      } 

    useEffect( ( ) => {

    }, [concesionaires]);


    const handleClickView = (route) => {
        switch (route){
            case 'vehicles':
                return navigate('/vehicles');
            case 'add':
                return navigate('/add');
            case 'concessionaires':
                return navigate('/concessionaires');
        }
      }

  return (
      
      <div >
        <button className="NavigationButton" onClick={() => handleClickView("vehicles")} style={{marginRight: 10}}> Search Vehicles </button>
        <button className="NavigationButton" onClick={() => handleClickView("add")} style={{marginRight: 10}}> Add Vehicles </button>
        <button className="NavigationButton" onClick={() => handleClickView("concessionaires")}>Change to concesionaires</button>
    {
       concesionaires.map(conc => (
        <>
            <h1>{ conc.name }</h1>
            <div key={conc.id} style={{width: '30%', display: 'flex', justifyContent: 'space-around', alignItems:'center', margin: 'auto'}}>
                <h3>Partners: </h3>
                {conc.brand.map(brand => (
                    <div key={brand.id}  className="badge">
                        <h4>{brand.name}</h4>
                    </div>
                ))}
            </div>
            {conc.cars.map( car => ( 
                <div className='vehicleConcesionaireCard'>
                    <div> </div>
                </div>
             ) 
            )}
        </>
       ))
    }
    </div>
  )

}
