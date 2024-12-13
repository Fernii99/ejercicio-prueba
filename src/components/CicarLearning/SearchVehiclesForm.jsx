import React from 'react'
import { ReservationHook } from '../../hooks/ReservationHook';

export const SearchVehiclesForm = (officesData) => {
    
    const { devMismaOficina, handleCheckboxChange, handleChange } = ReservationHook();
    
    return (
        <>
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <label>Oficina de recogida: </label>
                <select className='select' name="OfiEnt" onChange={(event) => handleChange(event)}>
                    <option value=""> Selecciona oficina de recogida </option>
                    {     
                        officesData.officesData.map(office => (
                            <option name="OfiEnt" value={JSON.stringify({ Codigo: office.Codigo, Nombre: office.Nombre })}> { office.Nombre } </option>
                        ))
                    }     
                </select> 
                
                <label>Devolucion Misma Oficina: </label>
                <input type="checkbox" name="Baca" onChange={() => handleCheckboxChange(prevData => !prevData)} checked={ devMismaOficina } />

                <label style={{visibility: devMismaOficina ? 'hidden' : 'visible'}}>Oficina de recogida: </label>
                <select className='select' name="OfiDev" onChange={(event) => handleChange(event)} style={{visibility: devMismaOficina ? 'hidden' : 'visible'}}> 
                    <option value=""> Selecciona oficina de recogida </option>
                    {      
                        officesData.officesData.map((office, index) => (
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
        </>
    )
}
