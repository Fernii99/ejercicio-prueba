import React, { useEffect } from 'react'
import { ReservationHook } from '../../hooks/ReservationHook';

export const FiltersComponent = () => {
    
    const { filters, setFilters, handleFilterChange,  handleChange } = ReservationHook();

    

    useEffect( () => {
        onsole.log("filters")
        console.log(filters)
    }, [filters])

    return (
        <div style={{width: '60%', margin: 'auto'}}>
                {( Object.entries(filters.filters).map(([title, values]) => (
                    <div style={{  width: '100%'}}>
                        { title === "Anotation" ? <h3> Politica de combustible</h3> : <h3>{title}</h3>  }
                        { title === "Total" &&
                            <>
                                <div style={{display: 'flex', justifyContent: 'space-around', height: 35}}>
                                    <h3 style={{lineHeight: 0}}>{Math.round(values[0])  + "€" }</h3> <input type="range" min={Math.round(values[0])} max={Math.round(values[values.length-1]) } name="Total" onMouseUp={(event) => handleFilterChange(event)} /><h3 style={{lineHeight: 0}}>{Math.round(values[values.length-1]) + "€" }</h3>
                                </div>
                                
                            </>
                        }
                        { values.map((value, index) => (
                            value != null && title != "Total" &&
                            <>
                                <input type='checkbox' style={{ lineHeight: 1 }} default={value} name={title} onClick={ (event) => handleFilterChange(event) } /> {value} <br/>
                            </>
                        ))}
                    </div>
                ))
            )}
        </div>
    )
}
