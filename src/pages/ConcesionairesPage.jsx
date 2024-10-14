import React, { useEffect, useState } from 'react'
import { getConcesionairesInformation } from '../helpers/getConcesionairesInformation';
import { useNavigate } from 'react-router-dom';

export const ConcesionairesPage = () => {

    const [concessionaires, setConcessionaires] = useState([]);

    const navigate = useNavigate();
    const [isLoadingData, setIsLoadingData] = useState(true);
    

    useEffect( () => {
        loadConcessionairesInformation();
    }, [])

    const loadConcessionairesInformation = async () => {
        const concessionairesData = await getConcesionairesInformation();
        setConcessionaires(concessionairesData);
        
        setInterval(() => {
        }, 1500);
    
        setIsLoadingData(!isLoadingData)
      } 

    useEffect(( ) => {

    }, [concessionaires]);


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

      const handleViewConcessionaire = (id) =>{
        return navigate(`/concessionaire/${id}`);
      }

  return (
    <>
            <button className="NavigationButton" onClick={() => handleClickView("vehicles")} style={{marginRight: 10}}> Search Vehicles </button>
            <button className="NavigationButton" onClick={() => handleClickView("add")} style={{marginRight: 10}}> Add Vehicles </button>
            <button className="NavigationButton" onClick={() => handleClickView("concessionaires")}>Change to concesionaires</button>
            <div style={{ display: 'flex', gap: 10, }}>
            {
                concessionaires.map(conc => (

                    // Concesionaires Main card container
                    <div style={{width: '30%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', border: '1px solid white', borderRadius: 5}}>
                        
                        {/* Concesionaires name */}
                        <h1 style={{lineHeight: 0, marginTop: 50}}>{ conc.name }</h1>
                        
                        {/* Loop through the values of the concessionaire */}
                        <div key={conc.id} style={{width: '100%', display: 'flex', flexDirection:'column',  alignItems:'center', margin: 'auto'}}>
                            
                            {/* BRANDS CONTAINER  */}
                            <div style={{display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'space-around'}}>
                            <h4>Partners: </h4>
                            {conc.brand.map(brand => (
                                <div key={brand.id}  className="badge">
                                    <h5>{brand.name}</h5>
                                </div>
                            ))}
                            </div>
                            
                            {/* SOME IMFORMATION ABOUT THE SELLING CARS */}
                            <div style={{display:'flex', flexDirection: 'column', width: '100%', }}>
                                <h4> Cars for sale: <b> {conc.cars.length} </b></h4>
                                <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 5 }}>
                                    {conc.cars.map(car => (
                                        <div style={{display: 'flex', flexDirection: 'column'}}>
                                            <p style={{lineHeight: 0}}>{car.type}</p>
                                            <img src={car.image} width={100} height={100} />
                                        </div>
                                    ))}
                                </div>
                            </div>

                        </div>
                        <button className='NavigationButton' onClick={() => handleViewConcessionaire(conc.id)}>View Concesionaire</button>
                    </div>
            ))
        }
        </div>
    </>
  )

}
