import React, { useEffect, useState } from 'react'

export const ListCharacters = ({characters}) => {
  
  const [charactersData, setCharactersData] = useState('');

  const handleChange = (event) => {
    const {name, value } = event.target

    setCharactersData(prevData => ({
      ...prevData,
      [name]: value
    }));
  }

  const handleSearchData = () => {
    alert(JSON.stringify(charactersData))
  }

  return (
    <div style={{width: '100%', height: '100%', display: 'flex', flexDirection:'column', flexWrap: 'wrap', gap: 20,  paddingTop: 20}}>
      <input type="text" name="name" className='input' onChange={(event) => handleChange(event)} style={{height: 35}} />
      <button onClick={handleSearchData} className='NavigationButton'> Get Data </button>
        {Object.entries(characters).map(([show, showData]) => (
          <div >
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
        ))}
    </div>
    
  )
}
