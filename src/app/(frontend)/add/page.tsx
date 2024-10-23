'use client'
import { addMovieAction } from '@/movies'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const MovieSearch = () => {
  const [query, setQuery] = useState<string>('') // State for search query
  const [movieResults, setMovieResults] = useState<any[]>([]) // State for movie results
  const [isLoading, setIsLoading] = useState<boolean>(false) // State for loading status

  useEffect(() => {
    setIsLoading(true)
    fetch(`api/search?query=${query}`)
      .then((res) => res.json())
      .then(setMovieResults)
      .then(() => setIsLoading(false))
  }, [query])

  const router = useRouter()

  const addMovie = async () => {
    await addMovieAction(query)
    router.push('/')
  }

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Movie Search</h1>

      <div className="mb-4">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="border p-2 rounded w-full"
          placeholder="Search for a movie..."
        />
      </div>

      {isLoading && <p>Loading...</p>}

      <button onClick={() => addMovie()}>Add movie</button>

      {!isLoading && movieResults.length > 0 && (
        <ul>
          {movieResults.map((movie, index) => (
            <li key={index} className="mb-2">
              {movie}
            </li>
          ))}
        </ul>
      )}

      {!isLoading && movieResults.length === 0 && <p>No movies found. Try a different search!</p>}
    </div>
  )
}

export default MovieSearch
