import React from 'react';
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from '../../utils/api';
import Loading from '../../utils/Loading';
import "./MovieDetail.css";

const MovieDetail = () => {
  const { id } = useParams(); // ✅ URL에서 id 가져오기
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await api.get(`/movie/${id}`); // API 호출
        setMovie(response.data);
      } catch (error) {
        console.error("영화 정보를 불러오는 중 오류 발생:", error);
      }
    };

    fetchMovie();
  }, [id]);

  if (!movie) return <Loading />;

  // 장르 리스트 처리
  const genres = movie.genres.map(genre => genre.name).join(', ');

  // 예산, 개봉일 포맷 처리
  const releaseDate = new Date(movie.release_date).toLocaleDateString(); // 개봉일 포맷팅
  const budget = movie.budget.toLocaleString(); // 예산 천 단위로 포맷팅

  // 평점과 인기도 처리
  const voteAverage = movie.vote_average.toFixed(1); // 소수점 1자리까지 표시
  const popularity = movie.popularity.toFixed(1); // 소수점 1자리까지 표시

  return (
    <div className="movie-detail-container">
      <img 
        className="movie-poster"
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
        alt={movie.title} 
      />
      
      <div className="movieInfo">
        <h1>{movie.title}</h1>
        <p>{movie.overview}</p>

        {/* 장르, 예산, 개봉일, 평점, 인기도 표시 */}
        <p><strong>장르:</strong> {genres}</p>
        <p><strong>예산:</strong> {budget} 원</p>
        <p><strong>개봉일:</strong> {releaseDate}</p>
        <p><strong>평점:</strong> {voteAverage} / 10</p>
        <p><strong>인기도:</strong> {popularity}</p>

        {/* 추가 정보들 */}
        {movie.original_language && (
          <p><strong>원어:</strong> {movie.original_language.toUpperCase()}</p>
        )}
        {movie.runtime && (
          <p><strong>상영시간:</strong> {movie.runtime}분</p>
        )}
        {movie.production_companies.length > 0 && (
          <p><strong>제작사:</strong> {movie.production_companies.map(company => company.name).join(', ')}</p>
        )}
        {movie.release_date && (
          <p><strong>개봉일:</strong> {releaseDate}</p>
        )}
        {movie.budget > 0 && (
          <p><strong>예산:</strong> {budget} 원</p>
        )}
        {movie.revenue > 0 && (
          <p><strong>수익:</strong> {movie.revenue.toLocaleString()} 원</p>
        )}
        {movie.tagline && (
          <p><strong>태그라인:</strong> {movie.tagline}</p>
        )}
      </div>
    </div>
  );
};

export default MovieDetail;
