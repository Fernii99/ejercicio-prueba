import { useEffect, useState } from 'react'
import './App.css'
import { SearchVehicles } from './components/searchVehicles'
import { AddVehicles } from './components/addVehicles'
import { SearchVehicleHook } from './hooks/searchVehicleHook'
import { getAllCars } from './helpers/getAllCars'
import { VehicleList } from './components/vehicleList'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { VehiclePage } from './pages/VehiclePage'

function App() {

  const [component, setComponent] = useState("searchVehicles")

  const { setVehicles, vehicles } = SearchVehicleHook();

  useEffect( () => {
    loadData();
  }, [])

  useEffect( () => {
  }, [vehicles])

  const loadData = async () =>{
    const allVehicles = await getAllCars();
    setVehicles(allVehicles);
  }
  
  const ChangeComponent = (value) => {
    setComponent(value.toString());
  }

  
  return (

    
  <>
  <div className='NavigationBar'>
    <button className="NavigationButton" onClick={() => ChangeComponent("searchVehicles")} style={{marginRight: 10}}> Search Vehicles </button>
    <button className="NavigationButton" onClick={() => ChangeComponent("addVehicles")}> Add Vehicles </button>
  </div>
    <div style={{width:'100%', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
    {
      component === "searchVehicles" ?
      <SearchVehicles />
      : 
      <AddVehicles />
    }
    </div>

  

  </>

  )
}

export default App
