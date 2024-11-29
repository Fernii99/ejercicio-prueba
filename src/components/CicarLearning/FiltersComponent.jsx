import React, { useEffect } from 'react'
import { ReservationHook } from '../../hooks/ReservationHook';

export const FiltersComponent = (filter) => {
    
  const { handleCheckboxChange, filters } = ReservationHook();

  useEffect(() => {

  }, [filters])

  return( 
      Object.keys(filters).map((category) => (
        <div key={category}>
          <h3>{category}</h3>
          <div>
            {Object.keys(filters[category]).map((key) => (
              <>
              <label key={key} style={{ display: "block", margin: "5px 0" }}>
                <input
                  type="checkbox"
                  checked={filters[category][key]}
                  name={category}
                  value={key}
                  onChange={(event) => handleCheckboxChange(event)}
                  />
                {key}
              </label>
              </>
            ))}
          </div>
        </div>
      )
    )
  )
}
