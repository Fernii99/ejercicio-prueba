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

  
  const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
    },
    {
        path: "/vehicle/:id",
        element: <VehiclePage />,
    },
    {
      path: "/concesionaire",
      element: <ConcesionairePage />,
  },
  ]);

    createRoot(document.getElementById('root')).render(
    <StrictMode>
        <RouterProvider router={router}/>
    </StrictMode>
)
