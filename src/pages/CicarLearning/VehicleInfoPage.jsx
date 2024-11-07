import React from 'react'
import { useLocation } from 'react-router-dom';

export const VehicleInfoPage = () => {

    const location = useLocation();
    const { modelo } = location.state || {};

  return (
      
    <>
        <div> { JSON.stringify(modelo) } </div>
        <div style={{width: '100%', height: '100px', backgroundColor: 'white', display: 'flex', alignItems: 'center'}}>
            <img src={`https://cicar.com/${modelo.Thumbnail}`} width={150} height={90} />
        </div>
    
    </>
  )

}
