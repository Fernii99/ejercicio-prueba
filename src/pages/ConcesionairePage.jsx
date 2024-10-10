import React, { useEffect, useState } from 'react'
import { getConcesionairesInformation } from '../helpers/getConcesionairesInformation';

export const ConcesionairePage = () => {

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

  return (
    <div >
    {
       concesionaires.map(conc => (
        <>
            <h1>{ conc.name }</h1>
            <div key={conc.id} style={{width: '100%', display: 'flex', justifyContent: 'space-around'}}>
                <div style={{width: '50%', display: 'flex', flexWrap: 'wrap', flexDirection: 'column', alignItems: 'center', justifyContent:' center' }}>
                    <h3>Concesionaire Selling Brands</h3>
                    {conc.brand.map(brand => (
                        <h4>{brand.name}</h4>
                    ))}
                </div>
                {conc.cars.map(vehicle => (
                    <div key={vehicle.id} style={{ width: '25%', display: 'flex', flexWrap: 'wrap',  alignItems: 'center', justifyContent: 'center',  }}>
                        <div style={{display: 'flex', width:'100%', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                            <img src={vehicle.image} width="300px" height="200px" alt="no image uploaded"/>
                            <p>{vehicle.brand}</p>
                            <p>{vehicle.model}</p>
                            <p>{vehicle.model}</p>
                        </div>
                    </div>
                ))}
            </div>
        </>
       ))
    }
    </div>
  )

}
