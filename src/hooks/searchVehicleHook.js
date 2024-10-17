import { useEffect, useState } from 'react';
import axios from 'axios';

export const SearchVehicleHook = () => {
  const [formData, setFormData] = useState({
    brand_name: "",
    car_model: "",
    type: "",
    color: "",
    manufacturingYear: []
  });

  const [vehicles, setVehicles] = useState([]);
  const [filterVehicles, setFilterVehicles] = useState(vehicles);
  const [selectedYears, setSelectedYears] = useState([]);

  const handleResetAction = () => {
    //CALLS THE RESET SEARCH FUNCTION
    ResetSearch();
  };

  const handleSelectChange = (event) => {
    const { name, value } = event.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleCheckboxChange = (year) => {
    setSelectedYears(prevSelectedYears => {
    let updatedYears;
    
    // If the year is already selected, remove it
    if (prevSelectedYears.includes(year)) {
      updatedYears = prevSelectedYears.filter(y => y !== year);
    } else {
      // Otherwise, add it to the selection
      updatedYears = [...prevSelectedYears, year];
    }
    
    // Immediately update formData with the new years
    const updatedFormData = {
      ...formData,
      manufacturingYear: updatedYears
    };
    
    // Update formData in state
    setFormData(updatedFormData);
    
    // Return the updated array for setSelectedYears
    return updatedYears;
  });

  // Call SearchFilteredVehicles with the updated formData
  SearchFilteredVehicles();
  };

  const matchesFilter = (item, filters) => {
    return (
      (!filters.brand_name || item.brand_name === filters.brand_name) &&
      (!filters.car_model || item.car_model === filters.car_model) &&
      (!filters.type || item.type === filters.type) &&
      (!filters.color || item.color === filters.color) &&
      (!filters.manufacturingYear.length > 0 || filters.manufacturingYear.includes(item.manufacturingYear))
    );
  };

  //FILTERS ON ALL THE VEHICLES RETRIVED ON THE LOAD OF THE COMPONENT AND
  //STORES IT ON THE FILTERED VEHICLES
  const SearchFilteredVehicles = async () => {
    
    const filteredData = vehicles.filter(item => matchesFilter(item, formData));
    setFilterVehicles(filteredData);
  };

  //FILTERS ON ALL THE VEHICLES RETRIVED ON THE LOAD OF THE COMPONENT AND
  //STORES IT ON THE FILTERED VEHICLES
  const ResetSearch = async () => {
    setFilterVehicles(vehicles)
    setFormData({
      brand_name: "",
      car_model: "",
      type: "",
      color: "",
      manufacturingYears: ""
    });
  };

  return {
    formData,
    handleSelectChange,
    vehicles,
    filterVehicles,
    setFilterVehicles,
    setVehicles,
    handleCheckboxChange,
    handleResetAction,
    SearchFilteredVehicles
  };
};