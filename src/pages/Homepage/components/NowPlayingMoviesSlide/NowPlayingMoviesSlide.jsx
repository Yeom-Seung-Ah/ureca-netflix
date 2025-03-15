import React from 'react'
import { usePopularMovies2 } from '../../../../hooks/usePopularMovies'
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import responsive from '../../../../config/carouselConfig';
import MovieCard from '../MovieCard/MovieCard';
import { Alert } from 'react-bootstrap';  // Alert 컴포넌트를 임포트합니다.
import './NowPlayingMoviesSlide.css'
import { useNowPlayingMovies2 } from '../../../../hooks/useNowPlayingMovies';

const NowPlayingMoviesSlide = () => {
    const {data, isLoading, isError, error} = useNowPlayingMovies2();  

    if (isLoading) {
        return <h1>Loading...</h1>
    }
    if (isError) {
        return <Alert variant="danger">{error.message}</Alert>
    }

    return (
        <div className="pm">
            <h3>Now Playing Movies</h3>
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
    )
}

export default NowPlayingMoviesSlide
