import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'


import { VehiclePage } from './pages/VehiclePage.jsx';


import {
    createBrowserRouter,
    RouterProvider,
  } from "react-router-dom";
import { ConcesionairePage } from './pages/ConcesionairePage.jsx';
import { ViewCars } from './pages/ViewCars.jsx';
import { AddVehicle } from './pages/AddVehicle.jsx';

  
  const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
    },
    {
        path: "/vehicles",
        element: <ViewCars />,
    },
    {
      path: "/add",
      element: <AddVehicle />,
    },
    {
      path: "/vehicle/:id",
      element: <VehiclePage />,
    },
    {
      path: "/concessionaires",
      element: <ConcesionairePage />,
  },
  ]);

    createRoot(document.getElementById('root')).render(
    <StrictMode>
        <RouterProvider router={router}/>
    </StrictMode>
)
