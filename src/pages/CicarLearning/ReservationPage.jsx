import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'


export const ReservationPage = () => {

    const [availableCarsFilters, setAvailableCarsFilters] = useState({
        'Idioma': "ES",
        'Empresa': "K11",
        'Usuario': "DitGes",
        'Clave': "DitCan2023",
        'Tarifa': "",
        'FechaInicio': '2024-11-04',
        'FechaFin': '2024-11-07',
        'Zona': "",
        'OfiEnt': "",
        'OfiDev': "",
        "EntHotel": "",
        "DevHotel": "",
        'SillasBebe': 0, // Default or client-provided Categoria
        'Elevadores': 0, // Default or client-provided SubCategoria
        'ConductoresAdicionales': 0,
        'Baca': false,
    });

    useEffect( () => {

    }, [availableCarsFilters])
    

    const {isLoading, error, data} = useQuery({
        queryKey: ["officeData"],
        queryFn: async () => {
            const response = await axios.get('http://localhost:8000/api/cicar/obtenerlistadeoficinascompleto');
            console.log(response.data.offices)
            return response.data.offices
        }
    })

    const {
        data: AvailableCars,
        isLoading: isCarsLoading,
        isError: isCarsError,
        refetch: fetchCarsData
      } = useQuery({
            queryKey: ['vehicleData'],
            queryFn: async () => {
                const response = await axios.get('http://localhost:8000/api/cicar/obtenermodelosdisponibles', {availableCarsFilters} );
                
                return response.data;
                },
            enabled: false, // Prevents automatic fetching
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setAvailableCarsFilters(prevData => ({
            ...prevData,
            [name]: value
        }));

        console.log(availableCarsFilters)
    }

    if( isLoading ) {
        return <h1> Loading Data... </h1>
    }

    if( error ) {
        return console.log(error)
    }

    return (
        <>
            <h1>Busqueda de Coches</h1>
            <button  style={{marginBottom: 10}} onClick={() => fetchCarsData()} > Buscar Vehiculos </button>

            <div >
                <select className='select' name="OfiEnt" onChange={(event) => handleChange(event)}>
                    <option  value="" > Selecciona oficina de recogida</option>
                    {
                        data.map(office => (
                            <option name="OfiEnt" value={office.Codigo}> { office.Nombre } </option>
                        ))
                    }
                </select>

                <input type="number" name="SillasBebe" value={ availableCarsFilters.SillasBebe } />
                <input type="number" name="Elevadores" value={ availableCarsFilters.Elevadores } />
                <input type="number" name="ConductoresAdicionales" value={ availableCarsFilters.ConductoresAdicionales } />
                <input type="checkbox" name="Baca" value={ availableCarsFilters.Baca } />
            </div>
        </>
        
    )
}
