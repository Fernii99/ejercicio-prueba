import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'


export const ReservationPage = () => {

    const navigate = useNavigate();

    const [availableCarsFilters, setAvailableCarsFilters] = useState({
        'Tarifa': "",
        "Grupo": "",
        'FechaInicio': null,
        'HoraInicio': null,
        'FechaFin': "",
        'HoraFin': "",
        'Zona': "",
        'OfiEnt': "",
        'OfiDev': "",
        "EntHotel": "",
        "DevHotel": "",
    });
    
   
    const [devMismaOficina, setDevMismaOficina] = useState(true);

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
        const { name, value } = event.target;
    
        setAvailableCarsFilters((prevData) => {
            let updatedFilters = { ...prevData };
    
            // Check if it's an office selection and parse the value
            if (name === "OfiEnt") {
                const selectedOffice = JSON.parse(value); // Parse the office data
                updatedFilters = {
                    ...updatedFilters,
                    OfiEnt: selectedOffice.Codigo,
                    Zona: selectedOffice.Zona,  // Update the Zona if needed
                };
    
                // If devMismaOficina is true, set OfiDev to match OfiEnt
                if (devMismaOficina) {
                    updatedFilters.OfiDev = selectedOffice.Codigo;
                }
            } else if (name === "OfiDev") {
                updatedFilters.OfiDev = value; // Set OfiDev when devMismaOficina is false
            } else {
                // For other fields like FechaInicio, HoraInicio, etc.
                updatedFilters[name] = value;
            }
            console.log(availableCarsFilters)
    
            return updatedFilters;
        });
    };
    
    // Checkbox change to toggle devMismaOficina
    const handleCheckboxChange = () => {
        setDevMismaOficina((prevValue) => {
            const newValue = !prevValue;
            
            // Sync OfiDev with OfiEnt if devMismaOficina is checked
            setAvailableCarsFilters((prevData) => ({
                ...prevData,
                OfiDev: newValue ? prevData.OfiEnt : "", // Clear OfiDev if unchecked
            }));
    
            console.log(availableCarsFilters)
            return newValue;
        });
    };

    if( isLoading ) {
        return <h1> Loading Data... </h1>
    }

    if( error ) {
        return console.log(error)
    }

    const handleReservationClick = (model) => {
        navigate('/reservation2', { state: { modelo: model }})
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
                <input type="checkbox" name="Baca" onChange={() => handleCheckboxChange(prevData => !prevData)} checked={ devMismaOficina } />

                <label style={{visibility: devMismaOficina ? 'hidden' : 'visible'}}>Oficina de recogida: </label>
                <select className='select' name="OfiDev" onChange={(event) => handleChange(event)} style={{visibility: devMismaOficina ? 'hidden' : 'visible'}}> 
                    <option value=""> Selecciona oficina de recogida </option>
                    {
                        data.map((office, index) => (
                            <option key={index} name="OfiDev" value={office.Codigo}> { office.Nombre } </option>
                        ))
                    }
                </select>

                <label>Día y Hora de recogida: </label>
                <input type="date" name="FechaInicio" onChange={(event) => handleChange(event)}  />
                <input type="time" name="HoraInicio" onChange={(event) => handleChange(event)}  />

                <label>Día y Hora de Entrega: </label>
                <input type="date" name="FechaFin" onChange={(event) => handleChange(event)} />
                <input type="time" name="HoraFin" onChange={(event) => handleChange(event)} />
            </div>
        
            <div style={{display:'flex', flexWrap: 'wrap'}}>
                {  AvailableCars && !isCarsLoading && !isCarsError ?
                    
                    AvailableCars.map(modelo => (
                        <div style={{width: '32%', height: '400px', border: '1px solid white', marginBottom: '5px', display: 'flex', flexDirection: 'column', alignItems: 'start', padding: '5px',}}>
                            <h4>{modelo.Nombre.toUpperCase()}</h4>
                            <img src={`https://cicar.com/${modelo.Foto}`} width={'100%'}  height={250}/>
                            <span>Precio Total:{modelo.Total}€</span>
                            <div style={{display: 'flex', justifyContent: 'space-between', width: '100%', marginTop: 40, alignItems: 'center'}}>
                                <div style={{justifyContent: 'start'}}>
                                    <p> Pasajeros: {modelo.Pax} <br/> Maletas: {modelo.Capacidad} </p>
                                </div>
                                <button style={{position: 'relative', bottom: 0, right: 0,  }} onClick={() => handleReservationClick(modelo)}> {!modelo.OnRequest && modelo.Disponible ? 'Reservar' : 'No Disponible'} </button>
                            </div>    
                        </div>
                    ))

                    :

                    <p>No Vehicles to display yet</p>
                    
                }
            </div>

        </>
    )
}
