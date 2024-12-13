import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import {VehicleComponent} from '../components/CicarLearning/VehicleComponent';
import VehiclesData from './VehiclesData.json';

test('Card Component contains Name Supplier texts', () => {
    render(
        <VehicleComponent
            vehiclesData={VehiclesData} 
            AvailableCars={VehiclesData}
        />
    );

    // Loop through each vehicle and check if it's rendered
    VehiclesData.forEach((vehicle) => {
        expect(screen.getAllByText(new RegExp(`${vehicle.Nombre} | Vendedor: ${vehicle.Supplier}`, 'i')));
    });
});


test('Card Component contains Direccion', async () => {
    render(
        <VehicleComponent
            vehiclesData={VehiclesData} 
            AvailableCars={VehiclesData}
        />
    );

    const user = userEvent.setup()
 
    // You can also call this method directly on userEvent,
    // but using the methods from `.setup()` is recommended.
    VehiclesData.forEach( async (vehicle) => {
        
        // Simulate a click on the button with the data-testid "Available"
        await user.click(screen.getByTestId('Available'));
       
        // Verify that something happens after the click (add an expectation)
        expect(window.location.pathname).toBe(`/reservation2/`);

    });

});

