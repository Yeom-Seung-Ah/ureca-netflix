import React, { useEffect, useState } from "react";
import axios from "axios";
import useAuth from "./../../context/useAuth";
import MovieCard from "./../Homepage/components/MovieCard";
import { useNavigate } from "react-router-dom";
import api from "./../../utils/api";
import "./WishList.css";

const WishList = () => {
  const { userId, token, logout, wishList } = useAuth();
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchWishList = async () => {
      if (!token) {
        alert("로그인이 필요합니다.");
        navigate("/login");
        return;
      }

      try {
        await axios.post("http://localhost:8080/checkToken", null, {
          headers: { Authorization: token },
        });

        const response = await axios.get("http://localhost:8080/getWishList", {
          params: { userId },
        });

        const movieIds = response.data;

        const movieDetailsResponses = await Promise.all(
          movieIds.map((id) =>
            api.get(`/movie/${id}`, { params: { language: "ko-KR" } })
          )
        );

        const movieDetails = movieDetailsResponses.map((res) => {
          const movie = res.data;
          return {
            ...movie,
            genre_ids: movie.genres.map((genre) => genre.id),
          };
        });

        setMovies(movieDetails);
      } catch (err) {
        if (err.response && err.response.status === 401) {
          alert("세션이 만료되었습니다. 다시 로그인해주세요.");
          logout(true); // 바로 강제 로그아웃 (confirm 없이!)
          return;
        }
        alert("서버 오류가 발생했습니다. 다시 시도해주세요.");
        console.error("서버 오류", err);
      }
    };

    fetchWishList();
  }, [token, userId, navigate, logout, wishList]);

  return (
    <div className="wish-list-wrapper">
      <h1>내가 찜한 리스트</h1>
      <h5 style={{ marginTop: "20px" }}>정주행하러 가볼까요?😆</h5>
      <div className="wish-list">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default WishList;
