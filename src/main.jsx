import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'


import { VehiclePage } from './pages/VehiclePage';

import { QueryClientProvider, QueryClient } from '@tanstack/react-query'

import {
    createBrowserRouter,
    RouterProvider,
  } from "react-router-dom";
import { ConcesionairesPage } from './pages/ConcesionairesPage';
import { ViewCars } from './pages/ViewCars';
import { AddVehicle } from './pages/AddVehicle';
import { ConcesionairePage } from './pages/ConcesionairePage';
import { CharactersPage } from './pages/CharactersPage.jsx';
import { CicarPage } from './pages/CicarLearning/CicarPage.jsx';  
import { ReservationPage } from './pages/CicarLearning/ReservationPage.jsx';
import { VehicleInfoPage } from './pages/CicarLearning/VehicleInfoPage.jsx';
import { PaymentsPage } from './pages/Payments/PaymentsPage.jsx';
  const router = createBrowserRouter([
    {
      path: "/",
      element: <CicarPage />,
    },
    {
      path: "/reservation",
      element: <ReservationPage />,
    },
    {
      path: "/reservation2",
      element: <VehicleInfoPage />,
    },
    {
        path: "/vehicles",
        element: <ViewCars />,
    },
    {
      path: "/add/:id",
      element: <AddVehicle />,
    },
    {
      path: "/vehicle/:id",
      element: <VehiclePage />,
    },
    {
      path: "/concessionaires",
      element: <ConcesionairesPage />,
    },
    {
      path: "/concessionaire/:id",
      element: <ConcesionairePage />,
    },
    {
      path: "/characters",
      element: <CharactersPage />,
    },
    {
      path: "/payments",
      element: <PaymentsPage />,
    },
  ]);

  const queryClient = new QueryClient()


    createRoot(document.getElementById('root')).render(
    <StrictMode>
       <QueryClientProvider client={queryClient}>
          <RouterProvider router={router}/>
       </QueryClientProvider>
    </StrictMode>
)
