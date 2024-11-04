import { useEffect, useState } from 'react';


export const SearchVehicleHook2 = () => {

  const [formData, setFormData] = useState({
    brand_name: "",
    car_model: "",
    type: "",
    color: "",
    manufacturingYear: []
  });

  const [filterVehicles, setFilterVehicles] = useState([]);
  const [selectedYears, setSelectedYears] = useState([]);

  // Function to calculate unique values for each field
  const calculateUniqueValues = (data) => {
    return data.reduce((acc, vehicle) => {
      Object.keys(vehicle).forEach((key) => {
        if (!acc[key]) {
          acc[key] = new Set(); // Initialize a new Set for each key
        }
        acc[key].add(vehicle[key]); // Add the vehicle's value to the Set
      });
      return acc;
    }, {});
  };
  
  

  const handleSelectChange = (event, data) => {
    const { name, value } = event.target;
    
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));

    // Call SearchFilteredVehicles with the updated formData
    SearchFilteredVehicles(data);
  };

  const SearchFilteredVehicles = async ( data ) => {
    const filteredData = data.filter(item => matchesFilter(item, formData));
    setFilterVehicles(filteredData);
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
  }

  return {
    calculateUniqueValues,
    handleSelectChange,
    filterVehicles, 
    setFilterVehicles,
    formData,
    matchesFilter,
    handleCheckboxChange
  }
};