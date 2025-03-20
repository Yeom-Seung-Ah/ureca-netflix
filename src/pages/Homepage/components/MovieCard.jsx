import React from "react";
import { Badge } from "react-bootstrap";
import "./MovieCard.css";
import { useMovieGenre2 } from "./../../../Hooks/UseMovieGenre";
import { useNavigate } from "react-router-dom";

const MovieCard = ({ movie }) => {
  const { data } = useMovieGenre2();
  const navigate = useNavigate();

  const genreName = (genreId) => {
    if (!data) return []; //map을 사용하니 배열로
    const genreNameList = genreId.map((id) => {
      const genreOBJ = data.find((genre) => genre.id === id);
      return genreOBJ.name;
    });
    return genreNameList;
  };

  const toMovieDetail = () => {
    navigate(`/movie/${movie.id}`);
  };

  return (
    <div
      style={{
        backgroundImage: `url(https://media.themoviedb.org/t/p/original${movie.poster_path})`,
      }}
      className="movie-card"
      onClick={toMovieDetail}
    >
      <div className="overlay">
        <div className="overlay-title">{movie.title}</div>
        <div className="genre-badges">
          {genreName(movie.genre_ids).map((id) => (
            <Badge key={id} bg="danger">
              {id}
            </Badge>
          ))}
        </div>

        <div>
          <div className="movie-info">
            <div className="movie-info_content">
              평점 : {movie.vote_average} 점
            </div>
            <div className="movie-info_content">
              인기도 : {Math.round(movie.popularity)}
            </div>
            <div className="movie-info_content">
              {movie.adult ? "19세 이상" : ""}
            </div>
          </div>
          <button className="cartBtn">찜하기</button>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
