import React, { useEffect, useState } from 'react'
import { ListCharacters } from '../components/characters/listCharacters'
import { getAllTheCharacters } from '../helpers/characters/getAllCharacters'

export const CharactersPage = () => {

  const [characters, setCharacters] = useState({})

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
console.log(characters)
  }, [characters])

  const loadData = async () => {
    const getAllCharacters = await getAllTheCharacters();
    setCharacters(getAllCharacters);
  }

  return    (
    <>
    {characters == {} ?
      (
        <h1>Loading Data</h1>
      )
      :
      <ListCharacters characters={characters} /> 
    }
    </>
  )
}
