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
    *********** Generation of the different filters  ***********
    ***********************************************************/
    const calculateUniqueValues = (AvailableCars) => {
        const fieldsToCheck = ["Total", "Supplier", "CarType", "Capacidad", "TipoTarifa", "Anotation"];
        const Filters = {};
    
        fieldsToCheck.forEach((field) => {
            Filters[field] = {};
        });
    
        AvailableCars.data.forEach((vehicle) => {
            fieldsToCheck.forEach((field) => {
                if (vehicle[field] !== undefined) {
                    const value = vehicle[field];
    
                    // Special handling for Anotation field
                    if (field === "Anotation") {
                        //Store the value of the first position of the array Anotations
                        const anotationKey = value[0].trim();
                        Filters[field][anotationKey] = Filters[field][anotationKey] || false;
                    } else {
                        Filters[field][value] = Filters[field][value] || false;
                    }
                }
            });
        });
        setFilters(Filters);
        return Filters;
    };


    



    /* ****************************************************************
    ** HandleChange triggers on the change of the Office DropBoxes,  **
    ** Date and Time Inputs, Before retrieveing the cars information **
    ******************************************************************/

    const handleChange = (event) => {
        const { name, value } = event.target;

        setCarsParameters((prevData) => {
            let updatedFilters = { ...prevData };

            if (name === "OfiEnt") {
                const selectedOffice = JSON.parse(value);
                updatedFilters = {
                    ...updatedFilters,
                    OfiEnt: selectedOffice.Codigo,
                    Zona: selectedOffice.Zona,
                    Oficina: selectedOffice.Nombre,
                };
                if (devMismaOficina) {
                    updatedFilters.OfiDev = selectedOffice.Codigo;
                }
            } else if (name === "OfiDev") {
                const selectedOffice = JSON.parse(value);
                updatedFilters.OfiDev = selectedOffice.Codigo;
            } else {
                updatedFilters[name] = value;
            }
            return updatedFilters;
        });
    };

    /******************************************************************
    **** HandlefilterChange on the change of the Office DropBoxes, ****
    ** Date and Time Inputs, Before retrieveing the cars information **
    ******************************************************************/
    const handleCheckboxChange = (event) => {
        const { name, value } = event.target;
    
        console.log("Filters State:", filters);
        console.log("Name:", name, "Value:", value);

        console.log( "FILTERS INSIDE HANDLE CHECKBOX FIELDS");
        console.log(filters)
    
        setFilters((prevFilters) => {
            return {
            ...prevFilters,
            [name]: {
                ...prevFilters[name],
                [String(value)]: !prevFilters[name][value], // Ensure string key
            },
            };
        });
    };



    useEffect(() => {
        console.log("Filters updated, USEEFFECT FILTERS DEPENDENCY:", filters);
    }, [filters]);   

    useEffect(() => {     
        console.log("Selected options updated:", selectedOptions);
    }, [selectedOptions]);

    return {
       filters,
       setFilters,
       calculateUniqueValues,
       setSelectedOptions,
       selectedOptions,
       handleChange,
       carsParameters,
       setCarsParameters,
       devMismaOficina,
       setDevMismaOficina, 
       handleCheckboxChange,
    };

} 