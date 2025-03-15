// utils/getMovieTrailer.js

import api from './api';  // 기존에 작성한 Axios 인스턴스

export const getMovieTrailer = async (movieId) => {
    try {
      const response = await api.get(`/movie/${movieId}/videos`, {
        // language 파라미터를 제거하거나 영어로 변경
        params: {
          language: 'en',  // 영어로 설정 (필요시 제거 가능)
        },
      });
  
      const trailers = response.data.results;
      
      if (trailers.length > 0) {
        // 'Trailer' 타입의 비디오를 찾음
        const trailer = trailers.find((video) => video.type === 'Trailer');
        if (trailer) {
          const trailerUrl = `https://www.youtube.com/watch?v=${trailer.key}`;
          console.log('Trailer URL:', trailerUrl);
          return trailerUrl;
        }
      }
  
      console.log('No trailer found.');
      return null;
    } catch (error) {
      console.error('Error fetching trailer:', error);
      return null;
    }
  };