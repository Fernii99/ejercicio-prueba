import { useEffect, useState } from 'react';
import axios from 'axios';

export const SearchVehicleHook = () => {
  const [formData, setFormData] = useState({
    brand: "",
    model: "",
    type: "",
    color: "",
    years: []
  });

  const [vehicles, setVehicles] = useState([]);
  const [selectedYears, setSelectedYears] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // SearchVehicles();
  };

  const handleSelectChange = (event) => {
    const { name, value } = event.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  // Effect to sync selectedYears with formData
  useEffect(() => {
    setFormData(prevData => ({
      ...prevData,
      years: selectedYears
    }));

    // SearchVehicles();
    
  }, [selectedYears]);

  const handleCheckboxChange = (year) => {
    setSelectedYears(prevSelectedYears => {
      let updatedYears;
  
      if (prevSelectedYears.includes(year)) {
        // If the year is already selected, remove it
        updatedYears = prevSelectedYears.filter(y => y !== year);
      } else {
        // Otherwise, add it to the selection
        updatedYears = [...prevSelectedYears, year];
      }
  
      // Immediately update formData with the new years
      setFormData(prevData => ({
        ...prevData,
        years: updatedYears
      }));
  
      // Return the updated array for the setSelectedYears
      return updatedYears;
    });
  };

  // const SearchVehicles = async () => {
  //   try {
  //     const response = await axios.get('http://localhost:8000/api/cars', {
  //       params: {
  //         data: JSON.stringify(formData)
  //       }
  //     });

  //     if (response.data.status === "400") {
  //       setVehicles([]);
  //     } else {
  //       setVehicles(response.data.data);
  //     }

  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  return {
    formData,
    handleChange,
    handleSelectChange,
    handleSubmit,
    selectedYears,
    setSelectedYears,
    vehicles,
    setVehicles,
    handleCheckboxChange
  };
};