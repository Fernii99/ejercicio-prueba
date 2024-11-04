import { useNavigate, useParams } from 'react-router-dom';
import { useQueries} from '@tanstack/react-query'

export const ConcesionairePage = () => {

    const { id } = useParams();
    const navigate = useNavigate();
    
    const results = useQueries({
    queries: [
      {
        queryKey: ['concessionaire', id],
        queryFn: async () => {
          const response = await fetch(`http://localhost:8000/api/concessionaire/${id}`);
          return response.json();
        }
      },
      {
        queryKey: ['concessionaireComments', id],
        queryFn: async () => {
          const response = await fetch(`http://localhost:8000/api/concessionaire/${id}/comments`);
          return response.json();
        }
      }
    ]
  });

  const concessionaire = results[0];
  const comments = results[1];
    
    const handleBack = () => {
      navigate('/concessionaires');
    }

    const handleAddVehicle = () => {
      navigate(`/add/${id}`, { state: { brands: results[0].data.brand } });
    }

    if (concessionaire.isLoading || comments.isLoading) {
      return <div>Loading...</div>;
    }
    
    if (concessionaire.error || comments.error) {
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
       {comments.data &&
        comments.data.map( coment => (
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
