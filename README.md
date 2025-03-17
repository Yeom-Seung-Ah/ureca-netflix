저희가 직접 만들기에는 귀찮으니깐 좋은거 가져옵시다
https://www.npmjs.com/package/react-multi-carousel
 에 접속하셔서 

$ npm install react-multi-carousel --save

설치해주시고

import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

사용할때는 꼭 임포트 해주기

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
---

Homepage/components/PopularMoviesSlide 폴더 생성
jsx css 파일 만들구
Homepage.jsx 가서 
const Homepage = () => {
  return (
    <div>
      <Banner/>
      <PopularMoviesSlide/> //배너 아래에 띄어주기
    </div>
  )
}
export default Homepage

---
저희가 만든 훅 있자나요 usePopularMovies2
인기 영화 가져오는거 이거 왜 훅으로 따로 만들었냐면 
지금처럼 다른곳에서도 막 가져다 쓰기 편할려고 만든겁니다

PopularMoviesSlide .jsx 가셔서
const {data, isLoading,isError,error}=usePopularMovies2();
요거만 딸깍 하시면 됩니다
 const {data, isLoading,isError,error}=usePopularMovies2();
     
     if(isLoading){
        return <h1>Loading...</h1>
      }
      if(isError){
        return <Alert variant="danger">{error.message}</Alert>
      }
그래도 로딩중이랑 에러 처리는 해줘야 하네요

사진 참고 하셔서 필요한 기능만 골라서 넣으면 됩니다

---
const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 8
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };
이걸 넣어줘야 하는데 
설명
 Desktop: {  
    breakpoint: { max: 4000, min: 3000 }, << 화면사이즈에 따라서
    items: 5  			   <<items: 5 한줄에 5개

그리고 나중에 다른 리스트도 넣을거같으니 따로 관리하죠

저는 src/config/carouselConfig.js 파일 만들고
 export default responsive; 해줘야 다른곳에서 쓰겠죠

import responsive from '../../../../config/carouselConfig'; 임포트 절대 잊지 마세요

버튼 크기 이상하면  
/* 왼쪽/오른쪽 슬라이드 버튼 크기 조정 */
.react-multiple-carousel__arrow {
    width: 40px !important;  /* 버튼 너비 */
    height: 40px !important;  /* 버튼 높이 */
    padding: 10px !important;  /* 버튼 내 여백 */
}

이거 쓰세요
---

<div className="pm">
            <h3>Popular Movies</h3>
            <Carousel
                infinite={true}
                centerMode={true}
                itemClass="movie-slider p-1"
                containerClass="carousel-container"
                responsive={responsive}
            >
                {data.results.map((movie, index) => <MovieCard movie={movie} key={index} />)}
            </Carousel>
        </div>
저는 일단 이 기능들만 넣었습니다

근데 저희가 여러개의 리스트를 뽑아야 하니까  map 씁시다

근데 map에다 뭘 해주냐? 바로바로 <MovieCard > 컴포넌트죠

만드세요

---
MovieCard.jsx

const MovieCard = ({movie}) => {
 //들어갈 내용
}
{data.results.map((movie, index) => <MovieCard movie={movie} key={index} />)}
에서 무비 카드에서 movie를 파라미터로 쓰니까 넣어주시고

<div 
    style={{
      backgroundImage:`url(https://media.themoviedb.org/t/p/original${movie.poster_path})`
      }}
      className="movie-card"
      
      >
저희가 BaseUrl을 설정 했지만 지금 사용하는 url은 api가 아닌background를 불러오는거라 다릅니다
---
src/utils/api.js
한국에서 개봉한 영화들과 언어를 한국어로 바꿉시다
const api = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
  params: {
    region: "KR", // 모든 요청에 자동으로 한국(region=KR) 적용!
    language: "ko-KR", // 기본 언어도 한국어로 설정
  },
});

---
이제 저희가 만든 훅에서 조금만 수정하면 원하는 영화 리스트들을 맘껏 쓸 수 있어요
usePopularMovies.js

import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

const usePopularMovies1=()=>{
    return api.get(`/movie/popular`);
}

export const usePopularMovies2=()=>{
    return useQuery({
        queryKey:['movie-popular'],
        queryFn: usePopularMovies1,
        select:(result)=>result.data, //필요한것만 가져오기
    })
}

여기서 가져오고 싶은 영화 리스트 Now Playing을 가져오고 싶으면
api사이트에 들어가셔셔 MOVIE LISTS 의 Now Playing 에 들어가셔서 REQUEST부분에서
url을 확인하시면 됩니다  Now Playing은 https://api.themoviedb.org/3/movie/now_playing
BaseUrl을 설정 했으니 /movie/now_playing만 가져오면 되겠네요

src/hooks/useNowPlayingMovies.js

import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

const useNowPlayingMovies1=()=>{
    return api.get(`/movie/now_playing`); //이부분에 필요한 url을 입력하세요
				  //인기작을 가져오려면 (`/movie/popular`);이렇게
}

export const useNowPlayingMovies2=()=>{
    return useQuery({
        queryKey:['movie-now_playing'], //키값도 바꿔주기
        queryFn: useNowPlayingMovies1,
        select:(result)=>result.data, //필요한것만 가져오기
    })
}
---
이제 배너를 바꿉시다 있어보이게 영상으로
npm install react-youtube


TMDB API에서 지원하는 영상 타입
"Trailer" → 공식 예고편
"Teaser" → 티저 영상
"Clip" → 짧은 클립
"Featurette" → 특집 영상
"Behind the Scenes" → 비하인드 씬
"Bloopers" → NG 장면

그리고 영상들이 한국에는 없나봐요
export const getMovieTrailer = async (movieId) => {
    try {
      const response = await api.get(`/movie/${movieId}/videos`, {
        // language 파라미터를 제거하거나 영어로 변경
        params: {
          language: 'en',  // 영어로 설정 (필요시 제거 가능)
        },
      });
      여기서 영어로 바꾸니까 뜨더라구요