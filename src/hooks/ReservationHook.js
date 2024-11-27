import { useEffect, useState } from 'react';


export const ReservationHook = () => { 

    const [filters, setFilters] = useState({});
    const [selectedOptions, setSelectedOptions ] = useState([]);

    const [devMismaOficina, setDevMismaOficina] = useState(true);

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

    /***********************************************************
    ************* Generation of the different filters **********
    ***********************************************************/
    const calculateUniqueValues = ( AvailableCars) => { 
        const fieldsToCheck = ['Total', 'Supplier', 'CarType', 'Capacidad', 'TipoTarifa', 'Anotation']; // Define the fields you want to check
    const Filters = {}; // Initialize the Filters object

    // Loop through the fields to initialize them in Filters
    fieldsToCheck.forEach(field => {
        Filters[field] = {}; // Each field gets its own sub-object
    });

    // Process each vehicle in AvailableCars
    AvailableCars.data.forEach(vehicle => {
        fieldsToCheck.forEach(field => {
            if (vehicle[field] !== undefined) {
                const value = vehicle[field];
                if (!Filters[field][value]) {
                    Filters[field][value] = false; // Initialize each unique value to false
                }
            }
        });
    });


    return Filters;
    };

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

    useEffect( () => { 
        console.log("FILTERS UPDATED")
        console.log(filters)
    }, [filters])
    

    return {
       filters,
       setFilters,
       calculateUniqueValues,
       handleFilterChange,
       setSelectedOptions,
       selectedOptions,
       handleChange,
       carsParameters,
       setCarsParameters,
       devMismaOficina,
       setDevMismaOficina
    };

}