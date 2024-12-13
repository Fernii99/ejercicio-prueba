import { useEffect, useMemo, useState } from 'react';


export const ReservationHook = () => { 

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

    const [filteredVehicles, setFilteredVehicles ] = useState(null);

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
    ** Triggers when a filter is changed and finds the vehicles that **
    *** match the values of the fields with the ones of the fields ****
    ******************************************************************/
    const getFilteredVehicles = (vehicles, filters) => {

        const areAllFiltersUnchecked = Object.values(filters).every(filterGroup => 
          Object.values(filterGroup).every(isChecked => !isChecked)
        );

        // If all filters are unchecked, return all vehicles
        if (areAllFiltersUnchecked) {
            return vehicles;
        }
        
        return vehicles.filter(vehicle => {
            return (
              Object.entries(filters.Supplier).some(([supplier, isChecked]) => {
                if (isChecked && vehicle.Supplier === supplier) {
                  
                  return true; // Return true instead of vehicle
                }
                return false;
              })||
          
              Object.entries(filters.CarType).some(([carType, isChecked]) => {
                if (isChecked && vehicle.CarType === carType) {
                  return true;
                }
                return false;
              }) ||
          
              Object.entries(filters.Capacidad).some(([capacidad, isChecked]) => {
                if (isChecked && vehicle.Capacidad === capacidad) {
                  return true;
                }
                return false;
              }) ||
          
              Object.entries(filters.TipoTarifa).some(([tipoTarifa, isChecked]) => {
                if (isChecked && vehicle.TipoTarifa === tipoTarifa) {
                  return true;
                }
                return false;
              }) ||
          
              Object.entries(filters.Anotation).some(([anotation, isChecked]) => {
                if (isChecked && vehicle.Anotation === anotation) {
                  return true;
                }
                return false;
              })
            );
          });
    };

    return {
        filteredVehicles,
        setFilteredVehicles,
        calculateUniqueValues,
        handleChange,
        carsParameters,
        setCarsParameters,
        devMismaOficina,
        setDevMismaOficina,
        getFilteredVehicles,
    };

} 