import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import Slider from 'rc-slider';
import { FiltersComponent } from '../../components/CicarLearning/FiltersComponent';
import { ReservationHook } from '../../hooks/ReservationHook';


export const ReservationPage = () => {

    const { calculateUniqueValues, handleChange, carsParameters, devMismaOficina, getFilteredVehicles } = ReservationHook();

    const navigate = useNavigate();

    const [ filters, setFilters ] = useState({});
    const [ vehiclesData, setVehiclesData ] = useState([]);
    
    const {isLoading, error, data} = useQuery({
        queryKey: ["zoneData"],
        queryFn: async () => {
            const response = await axios.get('http://localhost:8000/api/cicar');
           
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
            const response = await axios.get('http://localhost:8000/api/cicar/obtenerlistacombinada', {
                params: { zona: carsParameters },
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            console.log("response.data")
            console.log(response.data.data)
            setVehiclesData(response.data.data)
            return response.data;
        },
        enabled: false, 
    });

    /***********************************************************
    ************* Generation of the different filters **********
    ***********************************************************/
        useEffect(() => {
            if (!isLoading && AvailableCars) {
                const uniqueValuesArray = calculateUniqueValues(AvailableCars);

                setFilters(uniqueValuesArray); // State update
            }
        }, [isLoading, AvailableCars]);
    /***********************************************************
    ******** End of Generation of the different filters ********
    ***********************************************************/
    


    //LAS STEP - MAKE A RESERVATION OF A VEHICLE (MOVE TO NEXT SCREEN)
    const handleReservationClick = (model) => {
        const fechaInicio = `${carsParameters.FechaInicio}  ${carsParameters.HoraInicio}`
        const fechaFin = `${carsParameters.FechaFin}  ${carsParameters.HoraFin}`
        navigate('/reservation2', { state: { modelo: model, fechaInicio: fechaInicio, fechaFin: fechaFin }})
    }


    useEffect(() => {
        if(AvailableCars && filters != {} ){
            const vehicles = getFilteredVehicles(AvailableCars.data, filters);
            setVehiclesData(vehicles);
        }
    }, [filters])

    useEffect(() => {
        console.log("vehiclesDataaaaa")
        console.log(vehiclesData)
    }, [vehiclesData])

    //COMPROBATIONS OF DATA IS RETRIVED ON THE FIRST LOAD OR IF THERE IS AN ERROR OR SOMETHING
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
                    <option  value=""> Selecciona oficina de recogida </option>
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
                            <option key={index} name="OfiDev" value={JSON.stringify({ Codigo: office.Codigo, Nombre: office.Nombre })}> { office.Nombre } </option>
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
        
            <div style={{display:'flex', flexWrap: 'wrap', marginTop: 20}}>
                <div style={{width: '25%', float: 'left' }}>
                    {Object.keys(filters).length > 0 ? (
                        <FiltersComponent filters={filters} setFilters={setFilters} />
                    ) : (
                        <p>No data available</p>
                    )}
                </div>
                <div style={{width: '75%', display: 'flex', flexWrap: 'wrap', gap: 5}}>
                    {vehiclesData != [] ?
                        vehiclesData.map( modelo => (
                            modelo.Status === "Available" &&
                            <div style={{width: '100%',  border: '1px solid white', marginBottom: '5px', display: 'flex', flexDirection: 'column', alignItems: 'start', padding: '5px' }}>
                                <h4>{modelo.Nombre} | Vendedor: {modelo.Supplier}</h4>
                                <div style={{display: 'flex', width: '100%'}}>
                                    <img src={modelo.Foto} width={'20%'}  height={250}/>
                                    <div style={{width: '80%', marginLeft: 10 }}>
                                        <div style={{justifyContent: 'space-around', display: 'flex', width: '95%',  border: '1px solid',marginBottom: 10, borderRadius: 5 }}>
                                            <p>Capacidad: {modelo.Capacidad}</p>
                                            <p>Espacio Maletas: {modelo.Maletas}</p>
                                            <p>Puertas: {modelo.Puertas}</p>
                                            <p>Aire: {modelo.Aire === "Y" ? "Si" : "No"}</p>
                                            <p>Direccion: {modelo.IsAutomatic === "Y" ? "Automatico" : "Manual"}</p>
                                        </div>
                                        <div style={{ width: '95%', display: 'flex', flexDirection: 'row', border: '1px solid', flexWrap:'wrap', borderRadius: 5 }}>
                                            <p>{modelo.tipoTarifa}</p>
                                            {modelo.Anotation.map( note => (
                                                <div style={{width: '45%'}}>
                                                    <p >{note}</p>
                                                </div>
                                            ))}
                                        </div>
                                        <div>
                                            <p> Precio total, tasas incluidas: {modelo.Total}€ </p>
                                        </div> 
                                            <button onClick={ () => handleReservationClick(modelo) }>{modelo.Status}</button>
                                    </div>
                                </div>
                            </div>
                        ))
                        :
                        <p>No Vehicles to display yet</p>
                    }
                </div>
            </div>
        </>
    )
}
