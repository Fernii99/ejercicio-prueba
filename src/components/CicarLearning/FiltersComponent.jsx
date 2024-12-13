import React, { useEffect, useState } from 'react'
import { ReservationHook } from '../../hooks/ReservationHook';

export const FiltersComponent = ({filters, setFilters}) => {

    /*****************************************************************
    ** handleCheckboxChange triggers when the checkboxes of filters **
    ** change and needs to update the filters state for the vehicles *
    *****************************************************************/
    const handleCheckboxChange = (event) => {
      const { name, value } = event.target;

      setFilters((prevFilters) => {
          return {
              ...prevFilters,
              [name]: {
              ...prevFilters[name],
              [String(value)]: !prevFilters[name][value], // Ensure string key
              }, // Ensure string key
            }
          });
    };

  return( 
    <div>
      <h2>Filter Options</h2>
        <div>
          <h3>Supplier</h3>
          { filters.Supplier &&
            Object.entries(filters.Supplier).map(([supplier, value]) => (
              <label key={supplier}>
                <input
                  type="checkbox"
                  name="Supplier"
                  value={supplier}
                  checked={value}
                  onChange={(event) => handleCheckboxChange(event)}
                />
                {supplier}
              </label>
            ))
          }
        </div>

      <div>
        <h3>Car Type</h3>
        { filters.CarType &&
          Object.entries(filters.CarType).map(([carType, value]) => (
            <label key={carType}>
              <input
                type="checkbox"
                name="CarType"
                value={carType}
                checked={value}
                onChange={(event) => handleCheckboxChange(event)}
              />
              {carType}
            </label>
          ))
        }
      </div>

      <div>
        <h3>Capacidad</h3>
        { filters.Capacidad &&
          Object.entries(filters.Capacidad).map(([capacidad, value]) => (
          <label key={capacidad}>
            <input
              type="checkbox"
              name="Capacidad"
              value={capacidad}
              checked={value}
              onChange={(event) => handleCheckboxChange(event)}
            />
            {capacidad}
          </label>
        ))}
      </div>

      <div>
        <h3>Tipo Tarifa</h3>
        { filters.TipoTarifa &&
         Object.entries(filters.TipoTarifa).map(([tarifa, value]) => (
          <label key={tarifa}>
            <input
              type="checkbox"
              name="TipoTarifa"
              value={tarifa}
              checked={value}
              onChange={(event) => handleCheckboxChange(event)}
            />
            {tarifa}
          </label>
        ))}
      </div>

       <div>
        <h3>Tipo Tarifa</h3>
        { filters.Anotation &&
          Object.entries(filters.Anotation).map(([anotation, value]) => (
              <label key={anotation}>
                <input
                  type="checkbox"
                  name="Anotation"
                  value={anotation}
                  checked={value}
                  onChange={(event) => handleCheckboxChange(event)}
                />
                {anotation}
              </label>
          ))
        }
      </div>  
    </div>
  )
}
