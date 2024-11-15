import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'


export const ReservationPage = () => {

   

    const navigate = useNavigate();

    const [availableCarsFilters, setAvailableCarsFilters] = useState({
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
    const [selectedOptions, setSelectedOptions] = useState([]);
    const[filteredVehicles, setFilteredVehicles ] = useState(null)

    

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
            const response = await axios.get('http://localhost:8000/api/cicar/obtenermodelosdisponiblesengrupo', {
                params: { zona: availableCarsFilters }
            });
            return response.data;
        },

        enabled: false, 
    });
    
    

    const handleChange = (event) => {
        const { name, value } = event.target;
    
        setAvailableCarsFilters((prevData) => {
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
    
            console.log("Updated Filters:", updatedFilters);
    
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

    const calculateUniqueValues = () => {
        const fieldsToCheck = ['Total', 'Supplier', 'CarType', 'Capacidad'];  // Define the fields you want to check
        return AvailableCars.data.reduce((acc, vehicle) => {
            Object.keys(vehicle).forEach((key) => {
                if (fieldsToCheck.includes(key)) {  // Check if the key is in the fieldsToCheck array
                    if (!acc[key]) {
                        acc[key] = new Set(); // Initialize a new Set for each key
                    }
                    acc[key].add(vehicle[key]); // Add the vehicle's value to the Set
                }
            });
            return acc;
        }, {});
    }

    useEffect(() => {
        console.log(AvailableCars)
        if (!isLoading && AvailableCars) {
            const uniqueValues = calculateUniqueValues();

            const uniqueValuesArray = Object.fromEntries(
              Object.entries(uniqueValues).map(([key, valueSet]) => [key, Array.from(valueSet)])
            );
        
            console.log(uniqueValuesArray);

            // Update component state
            setFiltersValues(uniqueValuesArray);
        }
    }, [isLoading, AvailableCars]);

    useEffect( () => {
        setFilteredVehicles(AvailableCars)
    }, [AvailableCars])
    
    useEffect( () => {
        console.log(filteredVehicles)
    }, [])

    useEffect(() => {
        console.log("Selected Options:", selectedOptions);
    
        // Function to filter data based on selected filters
        const applyFilters = () => {
            if (!AvailableCars?.data) return; // Ensure data exists before filtering
    
            let updatedData = [...AvailableCars.data]; // Clone the data to avoid mutation
    
            // Iterate through each selected filter
            Object.entries(selectedOptions).forEach(([field, values]) => {
                if (Object.keys(selectedOptions).length > 0) {
                    updatedData = updatedData.filter((item) => 
                        // Check if the item matches any value in any field
                        Object.entries(selectedOptions).some(([field, values]) =>
                            values.some((value) => item[field] === value) // Match any value in the field
                        )
                    );
                }
            });
    
            setFilteredVehicles(updatedData); // Update the filtered data
        };
    
        applyFilters();
    }, [selectedOptions, AvailableCars]);

    const handleFilterChange = (event) => {
        const { name, value, checked } = event.target;

        setSelectedOptions((prev) => {
            const updatedOptions = { ...prev }; // Clone the previous state

            // Ensure that the selected value for the filter is not already present
            if (checked) {

                if (!updatedOptions[name]) {
                    updatedOptions[name] = [];  // Initialize the array if it doesn't exist
                }

                // Add value only if it's not already present
                if (!updatedOptions[name].includes(value)) {
                    updatedOptions[name].push(value); // Add the value
                }

            } else {
                // Remove value from the array if unchecked
                updatedOptions[name] = updatedOptions[name]?.filter((option) => option !== value);
            }

            return updatedOptions;
        });
    };

//LAS STEP - MAKE A RESERVATION OF A VEHICLE (MOVE TO NEXT SCREEN)
    const handleReservationClick = (model) => {
        const fechaInicio = `${availableCarsFilters.FechaInicio}  ${availableCarsFilters.HoraInicio}`
        const fechaFin = `${availableCarsFilters.FechaFin}  ${availableCarsFilters.HoraFin}`
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
                            <div style={{ float: 'left', width: '60%'}}>
                                <h3 >{title}</h3>
                                {values.map((value, index) => (
                                    <>
                                            <input type='checkbox' style={{ lineHeight: 1}} value={value} name={title} onClick={ (event) => handleFilterChange(event) } /> {value} <br/>
                                    </>
                                ))}
                            </div>
                        ))
                    ) : (
                        <p>No data available</p>
                    )}
                </div>
                <div style={{width: '75%', display: 'flex', flexWrap: 'wrap', gap: 5}}>
                    { filteredVehicles && !isCarsLoading && !isCarsError ?
                        filteredVehicles.map(modelo => (
                            <div style={{width: '32%',  border: '1px solid white', marginBottom: '5px', display: 'flex', flexDirection: 'column', alignItems: 'start', padding: '5px' }}>
                                <h4>{modelo.Nombre} | Vendedor: {modelo.Supplier}</h4>
                                <img src={modelo.Foto} width={'100%'}  height={250}/>
                                <span>Precio Total:{modelo.Total}€</span>
                                <div style={{display: 'flex', justifyContent: 'space-between', width: '100%', marginTop: 40, alignItems: 'center'}}>
                                    <div style={{justifyContent: 'start', width: '100%'}}>
                                        <p>Pasajeros: {modelo.Capacidad} | Maletas: {modelo.Maletas } | {modelo.Anotation && modelo.Anotation.length > 0 ? modelo.Anotation[0] : "No information available"} </p>
                                    </div>
                                    <button style={{position: 'relative', bottom: 0, right: 0, backgroundColor: !modelo.OnRequest && modelo.Disponible ? 'darkorange' : 'black', color: !modelo.OnRequest && modelo.Disponible ? 'black' : 'white' }} onClick={() => handleReservationClick(modelo)}> {!modelo.OnRequest && modelo.Disponible ? 'Reservar' : 'No Disponible'} </button>
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
