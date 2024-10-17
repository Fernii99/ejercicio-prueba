import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'


import { VehiclePage } from './pages/VehiclePage';


import {
    createBrowserRouter,
    RouterProvider,
  } from "react-router-dom";
import { ConcesionairesPage } from './pages/ConcesionairesPage';
import { ViewCars } from './pages/ViewCars';
import { AddVehicle } from './pages/AddVehicle';
import { ConcesionairePage } from './pages/ConcesionairePage';
import { CharactersPage } from './pages/CharactersPage.jsx';

  
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
  ]);

    createRoot(document.getElementById('root')).render(
    <StrictMode>
        <RouterProvider router={router}/>
    </StrictMode>
)
