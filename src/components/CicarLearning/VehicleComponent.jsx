import React from 'react'

export const VehicleComponent = ({vehiclesData, AvailableCars}) => {

    //LAS STEP - MAKE A RESERVATION OF A VEHICLE (MOVE TO NEXT SCREEN)
        const handleReservationClick = (model) => {
            const fechaInicio = `${carsParameters.FechaInicio}  ${carsParameters.HoraInicio}`
            const fechaFin = `${carsParameters.FechaFin}  ${carsParameters.HoraFin}`
            navigate('/reservation2', { state: { modelo: model, fechaInicio: fechaInicio, fechaFin: fechaFin }})
        }

  return (
    <div style={{width: '75%', display: 'flex', flexWrap: 'wrap', gap: 5}}>
        { vehiclesData == [] || AvailableCars != undefined  ?
            vehiclesData.map( modelo => (
                modelo.Status === "Available" &&
                <div  style={{width: '100%',  border: '1px solid white', marginBottom: '5px', display: 'flex', flexDirection: 'column', alignItems: 'start', padding: '5px' }}>
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
                            <div key={modelo.nombre + modelo.Code} style={{ width: '95%', display: 'flex', flexDirection: 'row', border: '1px solid', flexWrap:'wrap', borderRadius: 5 }}>
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
                                <button  onClick={ () => handleReservationClick(modelo) }>{modelo.Status}</button>
                        </div>
                    </div>
                </div>
            ))
            :
            <p>No Vehicles to display yet</p>
        }
    </div>
  )
}


