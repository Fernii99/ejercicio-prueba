import React, { useEffect, useState } from 'react'
import { ListCharacters } from '../components/characters/listCharacters'
import { getAllTheCharacters } from '../helpers/characters/getAllCharacters'

import { useQuery } from '@tanstack/react-query'

export const CharactersPage = () => {

  const [characters, setCharacters] = useState(null)

  // useEffect(() => {
  //   loadData();
  // }, []);

  // useEffect(() => {
  // console.log(characters)
  // }, [characters])

  // const loadData = async () => {
  //   const getAllCharacters = await getAllTheCharacters();
  //   setCharacters(getAllCharacters);
  // }

  const { isPending, error, data } = useQuery({
    queryKey: ['repoData'],
    queryFn: () =>
      fetch('http://localhost:8000/api/characters/getall').then((res) =>
        res.json(),
      ),
  })

  if (isPending) return 'Loading...'

  if (error) return 'An error has occurred: ' + error.message

  return    (
    <>
      {data === null
        ?
        <h1>Loading Data</h1>
        :
        <ListCharacters characters={data} /> 
      }
    </>
   
  )
}
