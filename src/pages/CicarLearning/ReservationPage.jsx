import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import Slider from 'rc-slider';
import { FiltersComponent } from '../../components/CicarLearning/FiltersComponent';
import { ReservationHook } from '../../hooks/ReservationHook';
import { VehicleComponent } from '../../components/CicarLearning/VehicleComponent';
import { SearchVehiclesForm } from '../../components/CicarLearning/SearchVehiclesForm';


export const ReservationPage = () => {

    const { calculateUniqueValues, handleChange, carsParameters, devMismaOficina, getFilteredVehicles } = ReservationHook();

    const navigate = useNavigate();

    const [ filters, setFilters ] = useState({});
    const [ vehiclesData, setVehiclesData ] = useState([]);
    
    const {isLoading, error, data:officesData} = useQuery({
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

    //LAS STEP - MAKE A RESERVATION OF A VEHICLE (MOVE TO NEXT SCREEN)
    const handleReservationClick = (model, carsParameters) => {
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
            <>
                <button  style={{marginBottom: 10}} onClick={() => fetchCarsData()} > Buscar Vehiculos </button>
                <SearchVehiclesForm officesData={officesData} />
            </>
            <div style={{display:'flex', flexWrap: 'wrap', marginTop: 20}}>
                <div style={{width: '25%', float: 'left' }}>
                    {Object.keys(filters).length > 0 ? (
                        <FiltersComponent filters={filters} setFilters={setFilters} />
                    ) : (
                        <p></p>
                    )}
                </div>
                <VehicleComponent vehiclesData={vehiclesData} AvailableCars={AvailableCars} carsParameters={carsParameters} handleReservationClick={handleReservationClick} />
            </div>
        </>
    )
}
