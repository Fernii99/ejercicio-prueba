import { useEffect, useState } from 'react'
import './App.css'
import { SearchVehicles } from './components/searchVehicles'
import { AddVehicles } from './components/addVehicles'


function App() {
  const [component, setComponent] = useState("searchVehicles")
  
  const ChangeComponent = (value) => {
    setComponent(value.toString());
  }

  return (
  <>
    <button onClick={() => ChangeComponent("searchVehicles")}> Search Vehicles </button>
    <button onClick={() => ChangeComponent("addVehicles")}> Add Vehicles </button>
    {
      component === "searchVehicles" ?
      <SearchVehicles />
      : 
      <AddVehicles />
    }
  </>

  )
}

export default App
