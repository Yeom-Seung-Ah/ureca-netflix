import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import React from "react";
import { usePopularMovies2 } from "./../../../Hooks/UsePopularMovies";
import Loading from "./../../../utils/Loading";
import Alert from "react-bootstrap/Alert";
import "./PopularMovieSlide.css";
import responsive from "./../../../conifg/carouselConfig";
import MovieCard from "./../components/MovieCard";

const PopularMovieSlide = () => {
  const { data, isLoading, isError, error } = usePopularMovies2();
  
  if (isLoading) {
    return <Loading />;
  }
  if (isError) {
    return <Alert variant="danger">{error.message}</Alert>;
  }

  return (
    <div className="pm">
      <div className="title-container">
        <span className="divide-title"></span>
        <h2>Popular Movies</h2>
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

export default PopularMovieSlide;
