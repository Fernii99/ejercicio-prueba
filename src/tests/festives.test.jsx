import { render, screen, fireEvent, waitFor, cleanup } from '@testing-library/react';
import {PaymentsPage} from '../pages/Payments/PaymentsPage';
import axios from 'axios';
import { beforeEach, afterEach, describe, expect, test, vi } from 'vitest';

// Mock axios to simulate API calls
vi.mock('axios');

describe('PaymentsPage Component', () => {
  beforeEach(() => {
    global.alert = vi.fn(); // Reset the alert mock before each test
    axios.get.mockClear();  // Clear the mock call history before each test
  });

  afterEach(() => {
    cleanup();              // Clean up the rendered component
    vi.restoreAllMocks();   // Restore all mocks after each test to clean state
  });

  /**
   * TEST PART 1: Correct Rendering
   */
  test('renders correctly', () => {
    render(<PaymentsPage />);
    expect(screen.getByText('Calcula los dias proximos al día de pago'));
    expect(screen.getByLabelText('Año a calcular:'));
    expect(screen.getByLabelText('Selecciona Fecha:'));
  });

  /**
   * TEST PART 2: Updates the Year and Day in State Correctly
   */
  test('updates the year and day in state correctly', () => {
    render(<PaymentsPage />);

    // Simulate changing the year
    const yearInput = screen.getByLabelText('Año a calcular:');
    fireEvent.change(yearInput, { target: { value: '2024' } });
    expect(yearInput.value).toBe('2024');

    // Simulate selecting a day
    const dateInput = screen.getByLabelText('Selecciona Fecha:');
    fireEvent.change(dateInput, { target: { value: '2024-12-25' } });
    expect(dateInput.value).toBe('2024-12-25');
  });

  /**
   * TEST PART 3: Successful API Call
   */
  test('makes an API call and handles the response correctly', async () => {
    axios.get.mockResolvedValue({ data: { status: '200' } });

    render(<PaymentsPage />);

    /**
     * Acutlaizar values de los 2 inputs, 
     * tanto año en el que se va a comprobar los festivos, 
     * como el dia que se va a hacer el pago
     */
    fireEvent.change(screen.getByLabelText('Año a calcular:'), {
      target: { value: '2025' },
    });

    fireEvent.change(screen.getByLabelText('Selecciona Fecha:'), {
      target: { value: '2025-01-05' },
    });

    fireEvent.click(screen.getByText('Calcular Festivos'));

    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledWith(
        'http://localhost:8000/api/verifyPayments',
        expect.objectContaining({
          params: { year: '2025', day: '2025-01-05' },
          headers: { 'Content-Type': 'application/json' },
        })
      );
      expect(alert).toHaveBeenCalledWith(JSON.stringify({ status: '200' }));
    });
  });

  /**
   * TEST PART 4: Handles API Errors Correctly
   */
  test('handles API errors correctly', async () => {
    axios.get.mockRejectedValue({ response: { data: { error: 'Error fetching data' } } });

    render(<PaymentsPage />);

    fireEvent.change(screen.getByLabelText('Año a calcular:'), {
      target: { value: '2025' },
    });

    fireEvent.change(screen.getByLabelText('Selecciona Fecha:'), {
      target: { value: '2024-01-05' },
    });

    fireEvent.click(screen.getByText('Calcular Festivos'));

    await waitFor(() => {
      expect(alert).toHaveBeenCalledWith('Error fetching data');
    });
  });
});