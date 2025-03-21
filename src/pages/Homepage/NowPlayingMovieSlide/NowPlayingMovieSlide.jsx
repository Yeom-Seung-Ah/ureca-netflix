import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import React from "react";
import { useNowPlayingMovies2 } from "./../../../Hooks/UseNowPlayingMovies";
import Loading from "./../../../utils/Loading";
import Alert from "react-bootstrap/Alert";
import "./NowPlayingMovieSlide.css";
import responsive from "./../../../conifg/carouselConfig";
import MovieCard from "./../components/MovieCard";

const NowPlayingMovieSlide = () => {
  const { data, isLoading, isError, error } = useNowPlayingMovies2();
  if (isLoading) {
    return <Loading />;
  }
  if (isError) {
    return <Alert variant="danger">{error.message}</Alert>;
  }

  return (
    <div className="pm">
      <div className="title-container list-gap">
        <span className="divide-title"></span>
        <h2>Now Playing Movies</h2>
      </div>
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

export default NowPlayingMovieSlide;
