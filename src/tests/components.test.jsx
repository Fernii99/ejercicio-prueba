import { cleanup, fireEvent, render, screen,  } from "@testing-library/react";
import { afterEach, describe, it, expect } from "vitest";
import { VehicleComponent } from '../components/CicarLearning/VehicleComponent';
import  VehiclesData from './VehiclesData.json';
import { MemoryRouter, Route, Routes, useNavigate } from "react-router-dom";

const handleReservationClick = (model) => {
    const fechaInicio = `${carsParameters.FechaInicio}  ${carsParameters.HoraInicio}`
    const fechaFin = `${carsParameters.FechaFin}  ${carsParameters.HoraFin}`
    navigate('/reservation2', { state: { modelo: model, fechaInicio: fechaInicio, fechaFin: fechaFin }})
}

const navigate = useNavigate();

const carsParameters = {
        'Tarifa': "",
        "Grupo": "",
        'FechaInicio': "10/10/2025",
        'HoraInicio': "10:15",
        'FechaFin': "11/11/2025",
        'HoraFin': "10:15",
        'Zona': "",
        'OfiEnt': "",
        'OfiDev': "",
        "EntHotel": "",
        "DevHotel": "",
        "Oficina": "",
    };


describe('VehicleComponent test:', () => {

    it('should render component', () => {
        render(<VehicleComponent vehiclesData={VehiclesData} AvailableCars={VehiclesData} />);
    });

    it('should render title', () => {
        render(<VehicleComponent  vehiclesData={VehiclesData} AvailableCars={VehiclesData} />);
       
        
    });

    it('should increment count when user clicks on Increment button', async () => {

        
            render(
                <MemoryRouter initialEntries={['/']}>
                  <Routes>
                    <Route path="/" element={<VehicleComponent vehiclesData={VehiclesData} AvailableCars={VehiclesData} handleReservationClick={handleReservationClick(VehiclesData[0])} />} />
                    <Route path="/reservation2" element={<div>Reservation Page</div>} />
                  </Routes>
                </MemoryRouter>
              )
           
                
          
          
          // Select all buttons with the text "Realizar Reserva"
          const buttons = screen.getAllByText('Realizar Reserva');
          
          // Simulate clicking all buttons
          for (const btn of buttons) {
            fireEvent.click(btn);
          }
      
          // Check if the URL has changed to /reservation2
          expect(window.location.pathname).toBe('/reservation2');
          
          // Optional: Check if the Reservation Page is rendered
          expect(screen.getByText('Reservation Page')).toBeInTheDocument();
        });
      });