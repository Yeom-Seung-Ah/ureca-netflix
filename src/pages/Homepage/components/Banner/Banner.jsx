import React, { useState, useEffect } from 'react';
import { usePopularMovies2 } from '../../../../hooks/usePopularMovies';
import Alert from 'react-bootstrap/Alert';
import { getMovieTrailer } from '../../../../utils/getMovieTrailer';  // getMovieTrailer 함수 import
import YouTube from 'react-youtube';  // react-youtube import
import "./Banner.css";

const Banner = () => {
  const { data, isLoading, isError, error } = usePopularMovies2();
  const [trailerUrl, setTrailerUrl] = useState(null);  // 트레일러 URL 상태 관리

  useEffect(() => {
    if (data && data.results.length > 0) {
      const movieId = data.results[0].id;
      // 영화 트레일러를 가져오는 함수 호출
      getMovieTrailer(movieId).then((url) => {
        if (url) {
          setTrailerUrl(url);  // 트레일러 URL을 상태에 저장
        } else {
          setTrailerUrl(null);  // 트레일러가 없는 경우
        }
      });
    }
  }, [data]);  // data가 변경될 때마다 트레일러를 다시 가져오도록

  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  if (isError) {
    return <Alert variant="danger">{error.message}</Alert>;
  }

  // 유튜브 영상 ID를 가져오기 위해 URL에서 ID를 추출
  const videoId = trailerUrl ? trailerUrl.split('v=')[1] : null;

  return (
    <div className="banner">
      {/* <div className="banner-detail text-white">
        <h1>{data?.results[0].title}</h1>
        <p>{data?.results[0].overview}</p>
      </div> */}
      {videoId ? (
        <div className="youtube-video">
          <YouTube 
            videoId={videoId} 
            opts={{ 
              width: "100%", 
              height: "100%",  
              playerVars: { 
                autoplay: 1,  // 자동 재생
              }
            }} 
          />
        </div>
      ) : (
        <p>No trailer available</p>  // 트레일러가 없는 경우 표시할 텍스트
      )}
    </div>
  );
};

export default Banner;
