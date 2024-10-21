import React, { useEffect, useState } from 'react'
import { getFilteredCharacters } from '../../helpers/characters/getFilteredCharacters';

export const ListCharacters = ({characters}) => {
  const [charactersData, setCharactersData] = useState({})
  
  const [selectedOptions, setSelectedOptions] = useState({
    "name": '',
    "gender": '',
    "image": '',
  });

  useEffect(() => {
    setCharactersData(characters)
  }, []) 

  useEffect( () => {
    alert(JSON.stringify(charactersData))
  }, [charactersData])

  const handleChange = (event) => {
    const {name, value } = event.target
 
    setSelectedOptions(prevData => ({
      ...prevData,
      [name]: value
    }));
  }

  const handleSelectChange = (event) => {
    const { name, value } = event.target;
    setSelectedOptions(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleRadioChange = ( event ) => {
    const { name, value } = event.target;
    setSelectedOptions(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSearchData = async () => {
    const filteredData =  await getFilteredCharacters(selectedOptions);
    setCharactersData(filteredData)
  }

  return (
    <div style={{width: '100%', height: '100%', display: 'flex', flexDirection:'column', flexWrap: 'wrap', gap: 20,  paddingTop: 20}}>
      <form style={{display: 'flex', width:'75%', gap: 20}}>
        <group style={{display: 'flex', flexDirection: 'column', width:'50%'}}>
          <label>Name:</label>
          <input type="text" name="name" className='input' onChange={(event) => handleChange(event)} style={{height: 35}} />
        </group>

        <group style={{display: 'flex', flexDirection: 'column', width:'50%'}}>
          <label>Gender:</label>
          <select onChange={(event) => handleSelectChange(event)} name="gender" className='select'>
            <option> Select Gender </option>
            <option> Male </option>
            <option> Female </option>
          </select>
        </group>

        <group style={{display: 'flex', flexDirection: 'column', width:'20%'}}>
        <label> Image: </label>
          <label>
            <input
              type="radio"
              name='image'
              value="yes"
              checked={
                selectedOptions.image ===
                "yes"
              }
              onChange={(event) =>
                handleRadioChange(
                    event
                )
              }
              className="form-check-input"
            />
            Yes
          </label>
          <label>
          <input
              type="radio"
              name="image"
              value="no"
              checked={
                selectedOptions.image ===
                "no"
              }
              onChange={(event) =>
                handleRadioChange(
                    event
                )
              }
              className="form-check-input"
            />
            No
          </label>
        </group>

      </form>
        <button onClick={handleSearchData} className='NavigationButton'> Get Data </button>

        {
        Object.entries(charactersData).map(([show, showData]) => (
          <div>
            <h2>{show}</h2>
            <div key={show} style={{display: 'flex', flexWrap: 'wrap' , gap:15 }}>
                {showData.data.map((character, index) => (
                  <div key={index} style={{width: '10%', border: '1px solid white'}}>
                      <h4>{character.name}</h4>
                      {character.image && <img src={character.image} width={100} height={100} alt={character.name} />}
                      <p>Gender: {character.gender || 'Not specified'}</p>
                  </div>
                ))}
            </div>
          </div>
      ))
       
      }
    </div>
    
  )
}
