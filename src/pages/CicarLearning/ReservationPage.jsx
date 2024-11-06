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
        'FechaInicio': Date.now(),
        'FechaFin': Date.now(),
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
    
    const [selectedZone, setSelectedZone] = useState("");
    const [devMismaOficina, setDevMismaOficina] = useState(false);

    useEffect(() => {
        if (selectedZone) {
            fetchOfficesData();  // Fetch data for the updated zone
        }
    }, [selectedZone]);

   

    const {isLoading, error, data} = useQuery({
        queryKey: ["zoneData"],
        queryFn: async () => {
            const response = await axios.get('http://localhost:8000/api/cicar');
            console.log("ZONES DATA")
            console.log(response.data.OficinaArray)
            return response.data.OficinaArray
        }
    })

    const {
        data: OfficeData,
        isLoading: isOfficesLoading,
        isError: isOfficesError,
        refetch: fetchOfficesData
    } = useQuery({
        queryKey: ["officeData", selectedZone],
        queryFn: async () => {
            if (!selectedZone) {
                return [];  // Return an empty array if no zone is selected
            }
    
            const response = await axios.get('http://localhost:8000/api/cicar/obtenerlistadeoficinasenzona', {
                params: { zona: selectedZone }
            });
            console.log(response.data.offices);
            return response.data.offices;
        },
        enabled: !!selectedZone,  // Enable query only if a zone is selected
        refetchOnWindowFocus: false,  // Disable refetching when window is focused
    });

    const {
        data: AvailableCars,
        isLoading: isCarsLoading,
        isError: isCarsError,
        refetch: fetchCarsData
    } = useQuery({
        queryKey: ['vehicleData'],
        queryFn: async () => {
            const response = await axios.get('http://localhost:8000/api/cicar/obtenermodelosdisponiblesengrupo', {
                params: { zona: availableCarsFilters }
            });
            console.log("FETCH DATA CARS")
            console.log(response.data)
            return response.data;
        },

        enabled: false, 
    });

    const handleChange = (event) => {
        const { value } = event.target;

        const selectedOffice = JSON.parse(value);
        const { Codigo, Zona } = selectedOffice;
        
        if ( !devMismaOficina ) {
            setAvailableCarsFilters(prevData => ({
                ...prevData,
                [OfiDev]: value.Codigo,
            }));
        } else {
            setAvailableCarsFilters(prevData => ({
                ...prevData,
                OfiEnt: Codigo,
                OfiDev: Codigo,
                Zona: Zona
            }));
        }

        console.log(availableCarsFilters)
    }

    if( isOfficesLoading ) {
        return <h1> Loading Data... </h1>
    }

    if( isOfficesError ) {
        return console.log(error)
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
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <label>Oficina de recogida: </label>
                <select className='select' name="OfiEnt" onChange={(event) => handleChange(event)}>
                    <option  value="" > Selecciona oficina de recogida</option>
                    {
                        data.map(office => (
                            <option name="OfiEnt" value={JSON.stringify(office)}> { office.Nombre } </option>
                        ))
                    }
                </select>
                
                <label>Devolucion Misma Oficina: </label>
                <input type="checkbox" name="Baca" onChange={() => setDevMismaOficina(prevData => !prevData)} checked={ devMismaOficina } />

                <label>Oficina de recogida: </label>
                <select className='select' name="OfiDev" onChange={(event) => handleChange(event)}>
                    <option value=""> Selecciona oficina de recogida </option>
                    {
                        data.map(office => (
                            <option name="OfiDev" value={office.Codigo}> { office.Nombre } </option>
                        ))
                    }
                </select>

                <label> Sillas de Bebe: </label>
                <input type="number" name="SillasBebe" className='select' onChange={(event) => handleChange(event)} value={ availableCarsFilters.SillasBebe } />
                
                <label>Elevadores para ninños: </label>
                <input type="number" name="Elevadores" className='select'  onChange={(event) => handleChange(event)} value={ availableCarsFilters.Elevadores } />
                
                <label>Conductores adicionales: </label>
                <input type="number" name="ConductoresAdicionales" onChange={(event) => handleChange(event)} className='select' value={ availableCarsFilters.ConductoresAdicionales } />
                
                <label>Devolucion Misma Oficina: </label>
                <input type="checkbox" name="Baca" onChange={(event) => handleChange(event)} value={ availableCarsFilters.Baca } />
            </div>
        
        <div>
            {  AvailableCars && !isCarsLoading && !isCarsError ?

                AvailableCars.ModeloArray.map(modelo => (
                    <>
                        <img src={`http${modelo.Thumbnail}`}  width={300} height={300} />
                        <p> {modelo.Nombre} - Capacidad: {modelo.Capacidad} </p>
                    </>
                ))

                :
                <p>No Vehicles to display yet</p>
                
            }
        </div>

        </>
    )
}
