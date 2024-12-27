import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Calendar } from '../../components/calendar/calendar';

export const PaymentsPage = () => {
  const [paymentsDays, setPaymentsDays] = useState({ year: '', day: '' });
  const [monthInfo, setMonthInfo] = useState({ month: '', daysInMonth: 0 });
  const [petitionResponse, setPetitionResponse] = useState({});
  const [diasFestivos, setDiasFestivos] = useState(0);
  const [festivos, setFestivos] = useState([]);

  // Fetch payment days from the API
  const fetchPaymentDays = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get('http://localhost:8000/api/verifyPayments', {
        params: paymentsDays,
        headers: { 'Content-Type': 'application/json' },
      });
      setPetitionResponse(data);
      setFestivos(data.festivos || []);
    } catch (error) {
      console.error(error.response?.data || 'Network error');
    }
  };

  // Calculate difference in days
  useEffect(() => {
    if (paymentsDays.day && petitionResponse.noFestivos) {
      const startDate = new Date(paymentsDays.day);
      const nextPaymentDate = new Date(petitionResponse.noFestivos);
      const differenceInDays = (nextPaymentDate - startDate) / (1000 * 60 * 60 * 24);
      setDiasFestivos(Math.round(differenceInDays));
    }
  }, [petitionResponse, paymentsDays.day]);

  // Handle form inputs and update state
  const handleParametersChange = ({ target: { name, value } }) => {
    if (name === 'day') {
      const date = new Date(value);
      const year = date.getFullYear();
      const month = date.getMonth();
      const daysInMonth = new Date(year, month + 1, 0).getDate();
      const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December',
      ];
      setMonthInfo({ month: monthNames[month], daysInMonth });
    }
    setPaymentsDays((prev) => ({ ...prev, [name]: value }));
  };

  

  return (
    <div style={styles.container}>
      <h1>Calcula los días próximos al día de pago</h1>
      <form style={styles.form}>
        <label htmlFor="year" style={{ fontWeight: 'bold' }}>Año a calcular:</label>
        <select
          id="year"
          name="year"
          value={paymentsDays.year}
          required
          style={{ marginBottom: 20, height: 30 }}
          onChange={handleParametersChange}
        >
          <option value="">Selecciona Año</option>
          {[...Array(7)].map((_, i) => {
            const year = 2024 + i;
            return <option key={year} value={year}>{year}</option>;
          })}
        </select>

        <label htmlFor="day" style={{ fontWeight: 'bold' }}>Selecciona Fecha:</label>
        <input
          type="date"
          id="day"
          name="day"
          required
          value={paymentsDays.day}
          style={{ marginBottom: 20, height: 30 }}
          onChange={handleParametersChange}
        />
        <button style={styles.button} type="submit" onClick={fetchPaymentDays}>Calcular Festivos</button>
      </form>

      {Object.keys(petitionResponse).length > 0 && (
        <>
          <div style={styles.card}>
            <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 0, alignItems: 'center', fontWeight: 'bold' }}>
              <p style={{ textTransform: 'uppercase' }}>
                <b>{petitionResponse.message}</b> {petitionResponse.noFestivos}<br />
              </p>
              <p style={{ textTransform: 'uppercase' }}>El próximo día no festivo es dentro de {diasFestivos} días</p>
            </div>

            <div style={styles.legend}>
              {[
                { color: '#ff4d4d', label: 'Festivos' },
                { color: '#f0e68c', label: 'Fin de Semana' },
                { color: 'navy', label: 'Día Seleccionado' },
                { color: 'rgb(3, 124, 68)', label: 'Próximo Día de Pago' },
              ].map(({ color, label }) => (
                <div key={label} style={styles.legendItem}>
                  <p style={{ ...styles.legendColor, backgroundColor: color }}></p>
                  <p>{label}</p>
                </div>
              ))}
            </div>
          </div>
          <Calendar
            year={paymentsDays.year}
            festivos={festivos}
            date={paymentsDays.day}
            paymentDay={petitionResponse.noFestivos}
          />
        </>
      )}
    </div>
  );
};


// Centralized styles
const styles = {
    container: { display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' },
    form: { display: 'flex', flexDirection: 'column', alignContent: 'center', justifyContent: 'center' },
    button: { marginBottom: 30 },
    card: {
      width: '100%',
      height: '135px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      color: 'black',
      backgroundColor: '#f9f9f9',
      borderRadius: '10px',
    },
    legend: { display: 'flex', gap: 20, fontSize: 17 },
    legendItem: { display: 'flex', alignItems: 'center' },
    legendColor: { width: '20px', height: '20px', marginRight: 5 },
  };