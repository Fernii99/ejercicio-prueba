import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query'

export const ConcesionairePage = () => {

    const { id } = useParams();
    const navigate = useNavigate();

    
    const concessionaire = useQuery({
      queryKey: ['concessionaireData'],
      queryFn: () => fetch(`http://localhost:8000/api/concessionaire/${id}`).then((res) => res.json()).then((json) => {return json})
    })
    
    const comment = useQuery({
      queryKey: ['commentData'],
      queryFn: () => fetch(`http://localhost:8000/api/concessionaire/${id}/comments`).then((res) => res.json()).then((json) => {return json})
    })
    
    const handleBack = () => {
      navigate('/concessionaires');
    }

    const handleAddVehicle = () => {
      navigate(`/add/${id}`, { state: { brands: concessionaire.data.brand } });
    }

    if (concessionaire.isLoading || comment.isLoading) {
      return <div>Loading...</div>;
    }
    
    if (concessionaire.error || comment.error) {
      return <div>Error loading data</div>;
    }

  return (
    <>
    <button className='NavigationButton' onClick={handleBack}> Return to Concessionaires page </button>
    <button className='NavigationButton' onClick={handleAddVehicle}> Add Vehicle </button>
      
    <h1> VEHICLES: </h1>
    <div style={{display: 'flex', flexWrap: 'wrap', width: '100%', margin: 'auto'}}>
       {concessionaire.data.cars &&
        concessionaire.data.cars.map( vehicle => (
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
      }
    </div>


    <h1> COMMENTS: </h1>
    <div style={{display: 'flex', flexWrap: 'wrap', width: '100%', margin: 'auto'}}>
       {comment.data &&
        comment.data.map( coment => (
          <>
            <div style={{width: '40%', border: '1px solid white', margin: '10px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}} >
                <span> User: {coment.user} <br/> Comment: {coment.comment_text} <br/> Publish Date: {coment.created_at} <br/> Car ID: {coment.car_id}</span>
            </div>
          </>
        ))
      }
    </div>

    </>
  )
}
