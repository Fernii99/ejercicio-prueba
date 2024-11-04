import React, { useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios';

export const CicarPage = () => {

    const {isPending, error, data} = useQuery({
        queryKey: ['getZonasData'],
        queryFn: async () => {
            const response = await axios.get('http://localhost:8000/api/cicar');
           
            return response;
        }
    })
    
    
    useEffect( () => {

    }, [data])

    if(isPending) return <h1> Loading data </h1>

    if(error) return console.log(error)

  return (

    <>
        <h1> DATA </h1>    
        {
            data.data != {} ?
            data.data.zones.map( zone => (
                <div style={{border: '1px solid white', marginBottom: 10}}>
                   <p>{zone.Codigo}</p>
                   <p>{zone.Nombre}</p> 
                   <p>Descripcion: {zone.Descripcion === "" ? "no hay descripcion" : zone.Descripcion }</p> 
                </div>    
            ))
            :
            <h1> No HAY DATOS QUE MOSTRAR</h1>
        }
    </>

  )
}
