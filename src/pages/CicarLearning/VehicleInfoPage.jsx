import React from 'react'
import { useLocation } from 'react-router-dom';

export const VehicleInfoPage = (carsParameters) => {

    const location = useLocation();
    const { modelo, fechaInicio, fechaFin } = location.state || {};

    const handleBackButton = () => {

    }

    const handleContinueButton = () => {

    }

  return (
      
    <>
      <div style={{width: '100%', backgroundColor: 'white', display: 'flex',  justifyContent: 'space-around', color:'black'}}>
        <div>
          <h2>1º Zona y periodo de alquiler </h2>
          <p> Recogida: {fechaInicio} </p>
          <p> Devolucion: {fechaFin} </p>
        </div>
        <div>
          <h2>2º Modelo del vehiculo</h2>
          <img src={modelo.Foto} width={150} height={90} />
          <p style={{lineHeight: 0}}>{modelo.Nombre}</p>
        </div>
        <div>
          <h2 >3º Preferencia y datos adicionales</h2>
        </div>
        <div>
          <h2 style={{color: 'GrayText'}}>4º Datos del conductor </h2>
        </div>
      </div>

      <div>
        <h1> Preferencia y datos adicionales </h1>

        <div style={{display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap'}}>
          <div style={{display: 'flex', flexDirection:'column', alignItems: 'start',  flexWrap: 'wrap'}}>
            <h3>EQUIPAMIENTO EXTRA GRATIS </h3>
            <h4>Silla De Niños (0-18Kg)</h4>
            <select className='select'>
              <option> 1 silla </option>
              <option> 2 sillas </option>
              <option> 3 sillas </option>
            </select>
            <br/>
            <h4>Elevador sin respaldo (15-36kg)</h4>
            <select className='select' >
              <option> 1 elevador </option>
              <option> 2 elevadores </option>
              <option> 3 elevadores </option>
            </select>
            <br/>
            <h4>Cobertura de seguro</h4>
            <select className='select'>
              <option> Seguro 100% TODO RIESGO, sin franquicia </option>
            </select>
            <br/>
            <h4>Mapas Y Audioguía</h4>
            <select className='select'>
              <option> Audioguía y mapa de la isla </option>
            </select>

            <h4>También son gratuitos los siguientes servicios:</h4>
              <p style={{lineHeight: 0}}>Kilometraje ilimitado</p>
              <p style={{lineHeight: 0}}>Segundo conductor</p>
              <p style={{lineHeight: 0}}>Entrega/devolución en hotel (*)</p>
              <p style={{lineHeight: 0}}>Pago en efectivo, tarjeta crédito/débito</p>
              <p style={{lineHeight: 0}}>Cambio y anulación de reserva</p>
          </div>

          <div style={{display: 'flex', flexDirection:'column', flexWrap: 'wrap'}}>
            <h3> DATOS ADICIONALES </h3>
            Nº de Vuelo/Crucero <input type='trea'  className='select'/>
            <small style={{ color: 'orange'}}> Recomendable informar del Nº Vuelo </small><br/>
            Direccion Temporal <input type='trea'  className='select'/><br/>
            Nº de Vuelo/Crucero <input type='trea'  className='select'/><br/>
          </div>
        </div>

        <button onClick={handleBackButton}> Volver al paso anterior </button>
        <button onClick={handleContinueButton}> Continuar </button>

      </div>
    </>
  )

}
