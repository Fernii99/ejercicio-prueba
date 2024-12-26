import React, { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios';
import { Calendar } from '../../components/calendar/calendar';


  
  

export const PaymentsPage = () => {


    const [ paymentsDays, setPaymentsDays ] = useState({
        year: "",
        day: ""
    });
    const [monthInfo, setMonthInfo] = useState({ month: '', daysInMonth: 0 });
    const [festivos, setFestivos] = useState([]);

    const [petitionResponse, setPetitionResponse] = useState({})
    const [diasFestivos, setDiasFestivos] = useState({})

    const fetchPaymentDays = async (e) => {
        e.preventDefault();
    
        try {
            const response = await axios.get('http://localhost:8000/api/verifyPayments', {
                params: paymentsDays,
                headers: {
                    'Content-Type': 'application/json',
                },
            });
    
            console.log(response.data)
            // Handle successful response
            setPetitionResponse(response.data);
            console.log(response.data)
            setFestivos(response.data.festivos)
        } catch (error) {
            // Handle error
            if (error.response) {
                console.log(error.response.data)
                setPetitionResponse(error.response);
            } else {
                alert('Network error');
            }
        }
    };

    useEffect( () => { 
        // Fecha de inicio
        const fecha1 = new Date(paymentsDays.day);

        // Fecha de fin
        const fecha2 = new Date(petitionResponse.noFestivos);

        // Calcular la diferencia en milisegundos
        const diferenciaMilisegundos = fecha2 - fecha1;

        // Convertir la diferencia de milisegundos a días
        const diferenciaDias = diferenciaMilisegundos / (1000 * 60 * 60 * 24);

        setDiasFestivos(diferenciaDias);
    }, [petitionResponse])
   

    const handleParametersChange = (e) => {

        const { name, value } = e.target;
        
        console.log(name);
        console.log(value)

        if(name === "day") {
            // Extract year and month
            const date = new Date(value);
            const year = date.getFullYear();
            const month = date.getMonth(); // Month is 0-indexed (0 = January, 1 = February, etc.)

            // Get the number of days in the month
            const daysInMonth = new Date(year, month + 1, 0).getDate();

            // Set month info state
            const monthNames = [
                'January', 'February', 'March', 'April', 'May', 'June',
                'July', 'August', 'September', 'October', 'November', 'December'
            ];

            setMonthInfo({ month: monthNames[month], daysInMonth });
        }

        setPaymentsDays((prevData) => {
            let updatedDays = { ...prevData };
            updatedDays[name] = value; // Update the field with the new value
            return updatedDays; // Ensure the updated object is returned
        });
        
    }

  return (
        <div style={{display: 'flex', flexDirection:'column', alignItems: 'center', justifyContent: 'center',}}>
            <h1>Calcula los dias proximos al día de pago</h1>

            <form style={{display: 'flex', flexDirection:'column', alignContent: 'center', justifyContent: 'center'}} >

                <label htmlFor="year" style={{ fontWeight: 'bold'}}>Año a calcular:</label>
                    <select id="year" name="year" value={paymentsDays.year} required style={{marginBottom: 20, height: 30}} onChange={(e) => handleParametersChange(e)} >
                        <option value="">Selecciona Año</option>
                        <option value="2025">2025</option>
                        <option value="2026">2026</option>
                        <option value="2027">2027</option>
                        <option value="2028">2028</option>
                        <option value="2029">2029</option>
                        <option value="2030">2030</option>
                    </select>
                <label htmlFor="day" style={{ fontWeight: 'bold'}}>Selecciona Fecha:</label>
                <input type="date" id="day"  name="day" required value={paymentsDays.day} style={{marginBottom: 20, height: 30}} onChange={(e) => handleParametersChange(e)}/>

                <button style={{marginBottom:30 }} type="submit" value="Verify Payments" onClick={(e) => {fetchPaymentDays(e)}}> Calcular Festivos </button>

            </form>
            

            { Object.keys(petitionResponse).length > 0 &&
                <>
                    <div style={{width: '100%', height: '135px', display: 'flex', flexDirection:'column', alignItems:'center', color: 'black', backgroundColor: '#f9f9f9', borderRadius: '10px' }}>
                        <div style={{display: 'flex', flexDirection: 'column', lineHeight: 0, alignItems: 'center', fontWeight: 'bold'}}> 
                            <p style={{textTransform: 'uppercase'}}><b>{petitionResponse.message}</b> {petitionResponse.noFestivos}<br/> </p>
                            <p style={{textTransform: 'uppercase'}}> El proximo dia no festivo es dentro de {  Math.round(diasFestivos) } </p>
                        </div>

                        <div style={{display: 'flex', gap: 20, fontSize: 17}}> 
                            <div style={{display: 'flex', alignItems: 'center'}}> 
                                <p style={{width: '20px', height: '20px', backgroundColor: '#ff4d4d', marginRight: 5}}></p>
                                <p>Festivos</p>
                            </div>
                            <div style={{display: 'flex', alignItems: 'center'}}> 
                                <p style={{width: '20px', height: '20px', backgroundColor: '#f0e68c', marginRight: 5}}></p>
                                <p>Fin de Semana</p>
                            </div>
                            <div style={{display: 'flex', alignItems: 'center'}}> 
                                <p style={{width: '20px', height: '20px', backgroundColor: 'navy', marginRight: 5}}></p>
                                <p>Dia de Pago</p>
                            </div>
                        </div>
                    </div>
                    <Calendar year={paymentsDays.year} festivos={festivos} date={paymentsDays.day} />
                </>
            }


        </div>
  )
}


