import React from 'react'

export const NavigationButtons = () => {

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
    <>
        <button className="NavigationButton" onClick={() => handleClickView("vehicles")} style={{marginRight: 10}}> Search Vehicles </button>
        <button className="NavigationButton" onClick={() => handleClickView("add")} style={{marginRight: 10}}> Add Vehicles </button>
        <button className="NavigationButton" onClick={() => handleClickView("concessionaires")}>Change to concesionaires</button>
    </>
  )
}
