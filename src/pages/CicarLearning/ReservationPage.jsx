import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import Slider from 'rc-slider';


export const ReservationPage = () => {

    const navigate = useNavigate();

    const [carsParameters, setCarsParameters] = useState({
        'Tarifa': "",
        "Grupo": "",
        'FechaInicio': "",
        'HoraInicio': "",
        'FechaFin': "",
        'HoraFin': "",
        'Zona': "",
        'OfiEnt': "",
        'OfiDev': "",
        "EntHotel": "",
        "DevHotel": "",
        "Oficina": "",
    });


    
    const [filtersValues, setFiltersValues ] = useState([])
    const [selectedOptions, setSelectedOptions ] = useState([]);
    const [filteredVehicles, setFilteredVehicles ] = useState(null)

    

    const [devMismaOficina, setDevMismaOficina] = useState(true);

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
            return response.data;
        },

        enabled: false, 
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
    
        setCarsParameters((prevData) => {
            let updatedFilters = { ...prevData };
    
            // Handle 'OfiEnt' selection
            if (name === "OfiEnt") {
                const selectedOffice = JSON.parse(value); // Parse the JSON string from the <select> option
                updatedFilters = {
                    ...updatedFilters,
                    OfiEnt: selectedOffice.Codigo,
                    Zona: selectedOffice.Zona,  // Assuming Zona is part of the office data
                    Oficina: selectedOffice.Nombre
                };
    
                // If devMismaOficina is true, synchronize OfiDev with OfiEnt
                if (devMismaOficina) {
                    updatedFilters.OfiDev = selectedOffice.Codigo;
                }
            } 
            // Handle 'OfiDev' selection
            else if (name === "OfiDev") {
                const selectedOffice = JSON.parse(value); // Parse the JSON string for OfiDev
                updatedFilters.OfiDev = selectedOffice.Codigo;
            } 
            // Handle other fields like FechaInicio, HoraInicio, etc.
            else { 
                updatedFilters[name] = value;
            }
            return updatedFilters;
        });
    };
    
    // Checkbox change to toggle devMismaOficina
    const handleCheckboxChange = () => {
        setDevMismaOficina((prevValue) => {
            const newValue = !prevValue;
            
            // Sync OfiDev with OfiEnt if devMismaOficina is checked
            setCarsParameters((prevData) => ({
                ...prevData,
                OfiDev: newValue ? prevData.OfiEnt : "", // Clear OfiDev if unchecked
            }));
    
            return newValue;
        });
    };

    const calculateUniqueValues = () => { 
    const fieldsToCheck = ['Total', 'Supplier', 'CarType', 'Capacidad', 'TipoTarifa', 'Anotation']; // Define the fields you want to check

    return AvailableCars.data.reduce((acc, vehicle) => {
        Object.keys(vehicle).forEach((key) => {
            if (fieldsToCheck.includes(key)) {
                if (key === 'Anotation') {
                    // Handle 'Anotation' specifically for 'Fuel'
                    if (!acc[key]) {
                        acc[key] = new Set(); // Initialize a Set for 'Anotation'
                    }
                    if (Array.isArray(vehicle[key]) && vehicle[key][0] ) {
                        acc[key].add(vehicle[key][0]); // Add only the first value if it is 'Fuel'
                    }
                } else {
                    // Handle other fields
                    if (!acc[key]) {
                        acc[key] = new Set(); // Initialize a Set for each key
                    }
                    acc[key].add(vehicle[key]); // Add the vehicle's value to the Set
                }
            }
        });
        return acc;
        }, {});
    };
    
    useEffect(() => {

        if (!isLoading && AvailableCars) {
            const uniqueValues = calculateUniqueValues();

            const uniqueValuesArray = Object.fromEntries(
              Object.entries(uniqueValues).map(([key, valueSet]) => [key, Array.from(valueSet)])
            );
        
            // Update component state
            setFiltersValues(uniqueValuesArray);
        }

    }, [isLoading, AvailableCars]);

    useEffect(() => {
        setFilteredVehicles(AvailableCars)
    }, [AvailableCars])
    
    useEffect(() => {
        const applyFilters = () => {

            if (!AvailableCars?.data) return; // Ensure data exists before filtering
    
            const updatedData = AvailableCars.data.filter((item) => {
                return Object.entries(selectedOptions).every(([field, value]) => {
                    if (value.length === 0) {
                        return true; // No filter applied for this field
                    }
    
                    if (field === 'Anotation' && Array.isArray(item.Anotation)) {
                        // Check if any value in `selectedOptions['Anotation']` matches `item.Anotation`
                        return value.some((val) => item.Anotation.includes(val));
                    }
    
                    if (field === 'Total') {
                        // Ensure `value` is a number for comparison
                        return item.Total > 0 && item.Total <= value; // Use `item.Total` (case-sensitive)
                    }
    
                    // Handle other fields (general fields)
                    return value.includes(item[field]);
                });
            });
            console.log(updatedData)
            setFilteredVehicles(updatedData); // Update the filtered data
        };
    
        applyFilters();
    }, [selectedOptions, AvailableCars, setFilteredVehicles]);

    const handleFilterChange = (event) => {
        const { name, value, checked } = event.target;
    
        setSelectedOptions((prev) => {
            const updatedOptions = { ...prev };
    
            if (name === "Total") {
                // Convert the range value to a number
                updatedOptions[name] = Number(value); // Parse as a number
            } else if (checked) {
                if (!updatedOptions[name]) {
                    updatedOptions[name] = [];
                }
                if (!updatedOptions[name].includes(value)) {
                    updatedOptions[name].push(value);
                }
            } else {
                if (Array.isArray(updatedOptions[name])) {
                    updatedOptions[name] = updatedOptions[name].filter((option) => option !== value);
    
                    if (updatedOptions[name].length === 0) {
                        delete updatedOptions[name];
                    }
                }
            }
            console.log(updatedOptions)
            return updatedOptions;
        });
    };

    const filteredResults = filteredVehicles || [];

    //LAS STEP - MAKE A RESERVATION OF A VEHICLE (MOVE TO NEXT SCREEN)
    const handleReservationClick = (model) => {
        const fechaInicio = `${carsParameters.FechaInicio}  ${carsParameters.HoraInicio}`
        const fechaFin = `${carsParameters.FechaFin}  ${carsParameters.HoraFin}`
        navigate('/reservation2', { state: { modelo: model, fechaInicio: fechaInicio, fechaFin: fechaFin }})
    }



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
                    {Object.keys(filtersValues).length > 0 ? (
                        Object.entries(filtersValues).map(([title, values]) => (
                            <div style={{  width: '60%'}}>
                                { title === "Anotation" ? <h3> Politica de combustible</h3> : <h3>{title}</h3>  }
                                { title === "Total" &&
                                    <>
                                        <div style={{display: 'flex', justifyContent: 'space-around', height: 35}}>
                                            <h3 style={{lineHeight: 0}}>{Math.round(values[0])  + "€" }</h3> <input type="range" min={Math.round(values[0])} max={Math.round(values[values.length-1]) } name="Total" onMouseUp={(event) => handleFilterChange(event)} /><h3 style={{lineHeight: 0}}>{Math.round(values[values.length-1]) + "€" }</h3>
                                        </div>
                                        <p>Precio máximo: {selectedOptions.Total}€ </p>
                                    </>
                                }
                                {values.map((value, index) => (
                                    value != null && title != "Total" &&
                                    <>
                                        <input type='checkbox' style={{ lineHeight: 1 }} value={value} name={title} onClick={ (event) => handleFilterChange(event) } /> {value} <br/>
                                    </>
                                ))}

                            </div>
                        ))
                    ) : (
                        <p>No data available</p>
                    )}
                </div>
                <div style={{width: '75%', display: 'flex', flexWrap: 'wrap', gap: 5}}>
                    {filteredResults  && !isCarsLoading && !isCarsError ?
                        filteredResults.map(modelo => (
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
                                            <p>Precio total, tasas incluidas: {modelo.Total}€</p>
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
