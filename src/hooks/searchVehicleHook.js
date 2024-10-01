import React from 'react'
import { useState } from 'react';
import bbdd from '../../data/bbdd.json'

export const SearchVehicleHook = () => {
  
  const [formData, setFormData] = useState({
    "brand": '',
    "model": '',
    "image": '',
    "type": '',
    "color": '',
    "manufacturingYear": ''
  });

  const [selectedBrand, setSelectedBrand] = useState('');

  const [uniqueBrands, setUniqueBrands] = useState([...new Set(bbdd.map(vehicle => vehicle.brand))]);
  const [manufacturingYear, setManufacturingYear] = useState([...new Set(bbdd.map(vehicle => vehicle.manufacturingYear))]);
  const [uniqueTypes, setUniqueTypes] = useState([...new Set(bbdd.map(vehicle => vehicle.type))]);
  const [uniqueColors, setUniqueColors] = useState([...new Set(bbdd.map(vehicle => vehicle.color))]);
  


  const [searchResult, setSearchResult] = useState([])


  const handleChange = (e) => {
    const { name, value } = event.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e, { brand, model, type, color, manufacturingYear} = formData) => {
    const filtered = bbdd.filter( car => car.brand.toLowerCase() === brand.toLowerCase() && car.model.toLowerCase() === model.toLowerCase() )
    setSearchResult(filtered)

    e.preventDefault();

  };


  const handleSelectChange = (event) => {
    const { name, value } = event.target;
    setSelectedBrand(value);
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

    return {
        ...formData,
        formData,
        handleChange,
        handleSelectChange,
        handleSubmit,
        manufacturingYear,
        searchResult,
        selectedBrand,
        setSearchResult,
        uniqueBrands,
        uniqueColors,
        uniqueTypes,
    }
}
