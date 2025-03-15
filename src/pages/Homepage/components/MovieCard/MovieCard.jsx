import React from 'react'
import { Badge } from 'react-bootstrap'
import './MovieCard.css'
const MovieCard = ({movie}) => {
  return (
    <div 
    style={{
      backgroundImage:`url(https://media.themoviedb.org/t/p/original${movie.poster_path})`
      }}
      className="movie-card"
      
      >

      <div className="overlay">
        <h1>{movie.title}</h1>
        {movie.genre_ids.map((id) => (
        <Badge key={id} bg="danger">{id}</Badge>
        ))}

        <div>
          <div>{movie.vote_average}</div>
          <div>{movie.popularity}</div>
          <div>{movie.adult?"19세 이상":""}</div>
          <button className="cartBtn">찜하기</button>
        </div>

      </div>

    </div>
  )
}

export default MovieCard