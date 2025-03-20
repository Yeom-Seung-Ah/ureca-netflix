import React from "react";
import { Badge } from "react-bootstrap";
import "./MovieCard.css";
import { useMovieGenre2 } from "./../../../Hooks/UseMovieGenre";
import { useNavigate } from "react-router-dom";
import useAuth from "../../../context/useAuth";
import axios from "axios";

const MovieCard = ({ movie }) => {
  const { data } = useMovieGenre2();
  const navigate = useNavigate();
  const { token, userId, wishList, fetchWishList } = useAuth();

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

  // 찜하기 버튼 클릭 이벤트 추가
  // 이미 찜했는지 여부 체크
  const alreadyWished = wishList.includes(movie.id);

  const handleWishClick = async (event) => {
    event.stopPropagation(); // 카드 클릭 이벤트와 중첩되지 않게 막아줌
    event.preventDefault();

    if (!token) {
      alert("로그인이 필요합니다.");
      navigate("/login");
      return;
    }

    try {
      await axios.post("http://localhost:8080/checkToken", null, {
        headers: { Authorization: token },
      });

      if (alreadyWished) {
        // 찜 취소
        await axios.post("http://localhost:8080/removeWishList", {
          userId,
          movieId: movie.id,
        });
        alert("찜하기가 취소되었습니다.");
      } else {
        // 찜하기
        await axios.post("http://localhost:8080/addWishList", {
          userId,
          movieId: movie.id,
        });
        alert("찜 목록에 추가되었습니다!");
      }

      // 찜 목록 갱신
      fetchWishList(userId);
    } catch (error) {
      alert("세션이 만료되었습니다. 다시 로그인해주세요.");
      navigate("/login");
    }
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
          <button className="cartBtn" onClick={handleWishClick}>
            {alreadyWished ? "찜취소" : "찜하기"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
