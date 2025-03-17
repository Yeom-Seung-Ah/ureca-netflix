import React from 'react'
import Banner from './components/Banner/Banner'
import PopularMoviesSlide from './components/PopularMoviesSlide/PopularMoviesSlide'
import TopRatedMoviesSlide from './components/TopRatedMoviesSlide/TopRatedMoviesSlide'
import NowPlayingMoviesSlide from './components/NowPlayingMoviesSlide/NowPlayingMoviesSlide'
import "./Homepage.css";
// 배너 >  popular movie 의 첫번째 
// popular movie
// top rated movie
// upcoming movie

const Homepage = () => {
  return (
    <div>
      <Banner/>
      <PopularMoviesSlide/>
      <TopRatedMoviesSlide/>
      <NowPlayingMoviesSlide/>
    </div>
  )
}

export default Homepage