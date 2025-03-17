1. 설치 및 설정
react-multi-carousel 설치
이 프로젝트에서는 react-multi-carousel을 사용하여 영화 리스트를 슬라이더 형태로 보여줍니다. 다음 명령어를 사용하여 설치합니다:

bash
복사
편집
npm install react-multi-carousel --save
사용법
설치 후, 필요한 파일에서 react-multi-carousel을 임포트하여 사용합니다.

js
복사
편집
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
2. PopularMoviesSlide 컴포넌트 구현
PopularMoviesSlide 폴더 및 파일 구조
PopularMoviesSlide 폴더를 생성하고, jsx 및 css 파일을 작성하여 인기 영화를 슬라이더로 표시합니다. Homepage.jsx 파일에서 배너 아래에 이 컴포넌트를 호출하여 사용합니다.

2.1 PopularMoviesSlide.jsx
jsx
복사
편집
import React from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import MovieCard from './MovieCard'; // MovieCard 컴포넌트 임포트
import { usePopularMovies2 } from '../../hooks/usePopularMovies2'; // 훅 임포트
import { Alert } from 'react-bootstrap'; // Alert 임포트

const responsive = {
  desktop: { breakpoint: { max: 3000, min: 1024 }, items: 8 },
  tablet: { breakpoint: { max: 1024, min: 464 }, items: 2 },
  mobile: { breakpoint: { max: 464, min: 0 }, items: 1 }
};

const PopularMoviesSlide = () => {
  const { data, isLoading, isError, error } = usePopularMovies2();

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (isError) {
    return <Alert variant="danger">{error.message}</Alert>;
  }

  return (
    <div className="pm">
      <h3>Popular Movies</h3>
      <Carousel
        infinite={true}
        centerMode={true}
        itemClass="movie-slider p-1"
        containerClass="carousel-container"
        responsive={responsive}
      >
        {data.results.map((movie, index) => (
          <MovieCard movie={movie} key={index} />
        ))}
      </Carousel>
    </div>
  );
};

export default PopularMoviesSlide;
2.2 PopularMoviesSlide.css
css
복사
편집
.pm {
  padding: 20px;
}
.movie-card {
  height: 250px;
  background-size: cover;
  background-position: center;
  border-radius: 8px;
  transition: transform 0.2s ease;
}
.movie-card:hover {
  transform: scale(1.05);
}
2.3 Homepage.jsx에서 호출
jsx
복사
편집
import React from 'react';
import Banner from './Banner';
import PopularMoviesSlide from './components/PopularMoviesSlide'; // 컴포넌트 임포트

const Homepage = () => {
  return (
    <div>
      <Banner />
      <PopularMoviesSlide /> {/* 배너 아래에 PopularMoviesSlide 컴포넌트 추가 */}
    </div>
  );
};

export default Homepage;
3. usePopularMovies2 훅
usePopularMovies2 훅을 사용하여 TMDB API에서 인기 영화를 가져옵니다. 이를 통해 다양한 영화 리스트를 손쉽게 가져올 수 있습니다.

3.1 usePopularMovies2.js 훅
js
복사
편집
import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

const usePopularMovies1 = () => {
  return api.get(`/movie/popular`); // 인기 영화 가져오기
};

export const usePopularMovies2 = () => {
  return useQuery({
    queryKey: ['movie-popular'],
    queryFn: usePopularMovies1,
    select: (result) => result.data, // 필요한 데이터만 가져오기
  });
};
3.2 Now Playing 영화 가져오기
다른 영화 리스트 (예: Now Playing)도 쉽게 추가 가능합니다.

js
복사
편집
import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

const useNowPlayingMovies1 = () => {
  return api.get(`/movie/now_playing`); // 현재 상영 중인 영화 가져오기
};

export const useNowPlayingMovies2 = () => {
  return useQuery({
    queryKey: ['movie-now_playing'],
    queryFn: useNowPlayingMovies1,
    select: (result) => result.data,
  });
};
4. 배너 영상 구현
배너에 영상 콘텐츠를 추가하기 위해 react-youtube 라이브러리를 사용합니다. 이를 설치한 후, 배너 컴포넌트에서 영상을 표시할 수 있습니다.

4.1 설치
bash
복사
편집
npm install react-youtube
4.2 배너 컴포넌트에서 사용
jsx
복사
편집
import React from 'react';
import YouTube from 'react-youtube';

const Banner = () => {
  const opts = {
    height: '390',
    width: '640',
    playerVars: {
      autoplay: 1,
    },
  };

  return (
    <div className="banner">
      <YouTube videoId="video_id_here" opts={opts} />
    </div>
  );
};

export default Banner;
5. TMDB API 설정 (한국어 및 지역 설정)
API 요청 시, 한국에서 개봉한 영화들을 가져오고, 언어를 한국어로 설정합니다.

5.1 api.js 파일
js
복사
편집
import axios from 'axios';

const api = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
  params: {
    region: "KR", // 한국 지역 설정
    language: "ko-KR", // 한국어로 언어 설정
  },
});

export default api;