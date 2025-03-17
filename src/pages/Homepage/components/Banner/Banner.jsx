import React, { useState, useEffect } from 'react';
import { usePopularMovies2 } from '../../../../hooks/usePopularMovies';
import Alert from 'react-bootstrap/Alert';
import { getMovieTrailer } from '../../../../utils/getMovieTrailer';  // getMovieTrailer 함수 import
import YouTube from 'react-youtube';  // react-youtube import
import "./Banner.css";

const Banner = () => {
  const { data, isLoading, isError, error } = usePopularMovies2();
  const [trailerUrl, setTrailerUrl] = useState(null);  // 트레일러 URL 상태 관리
  const [isTrailer, setIsTrailer] = useState(false);  // 트레일러 여부 상태 관리

  useEffect(() => {
    if (data && data.results.length > 0 && !isTrailer) {  // isTrailer가 false일 때만 실행
      let foundTrailer = false;  // 트레일러를 찾았는지 여부를 체크하는 변수
      // 영화 데이터에서 트레일러를 찾기 위한 반복문
      for (let i = 0; i < data.results.length; i++) {
        if (foundTrailer) break; // 트레일러를 찾으면 반복문 종료
        const movieId = data.results[i].id;
        getMovieTrailer(movieId).then((url) => {
          if (url) {
            setTrailerUrl(url);  // 트레일러 URL을 상태에 저장
            setIsTrailer(true);   // 트레일러 찾음
            foundTrailer = true;  // 트레일러 찾았다고 설정
          }
        });
      }
    }
  }, [data, isTrailer]);  // 데이터와 isTrailer가 변경될 때마다 실행

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
      {videoId ? (
        <div className="youtube-video">
          <YouTube 
            videoId={videoId} 
            opts={{
              width: "100%",  
              height: "100%",  
              playerVars: {
                autoplay: 1,  // 자동 재생
                mute: 1,  // 음소거 상태로 시작
                controls: 0,  // 플레이어의 기본 컨트롤 숨기기
                rel: 0,  // 관련 영상 숨기기
                modestbranding: 1,  // YouTube 로고 숨기기
                showinfo: 0,  // 동영상 제목, 업로더 등의 정보 숨기기
                iv_load_policy: 3,  // 비디오 내 애드 관련 팝업 숨기기
                fs: 0,  // 전체 화면 버튼 숨기기
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
