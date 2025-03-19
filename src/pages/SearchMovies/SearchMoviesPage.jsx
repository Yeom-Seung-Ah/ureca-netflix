import React from 'react'
import { UseSearchMovies2 } from '../../Hooks/UseSearchMovies';
import { useSearchParams } from 'react-router-dom';
import Loading from '../../utils/Loading';
import { Alert, Col, Container, Row } from 'react-bootstrap';
import MovieCard from '../Homepage/components/MovieCard';


const SearchMoviePage = () => {
  const [query,setQuery]=useSearchParams();
  const keyword= query.get("q");
  console.log(keyword);
 

  const { data, isLoading, isError, error } = UseSearchMovies2({keyword});
  console.log(data,"keyword");
   
  if (isLoading) {
    return <Loading />;
  }
  if (isError) {
    return <Alert variant="danger">{error.message}</Alert>;
  }
  return (
    <Container>
      <Row>
        

        {/* 영화카드 */}
        <Col lg={12} xs={12}>
        <Row>
        {data?.results.map((movie,index)=>
          <Col key={index} lg={2} xs={12}>
          <MovieCard movie={movie} />
          </Col>)}
        </Row>
          
        </Col>
      </Row>
    </Container>
  )
}

export default SearchMoviePage