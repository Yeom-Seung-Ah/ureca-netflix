import React from "react";
import { UseSearchMovies2 } from "./../../Hooks/UseSearchMovies";
import { useSearchParams } from "react-router-dom";
import Loading from "./../../utils/Loading";
import { Alert, Col, Container, Row } from "react-bootstrap";
import MovieCard from "./../Homepage/components/MovieCard";
import useAuth from "../../context/useAuth";
import axios from "axios";
import { useEffect } from "react";

const SearchMoviesPage = () => {
  const [query, setQuery] = useSearchParams();
  const keyword = query.get("q");
  console.log(keyword);

  const { data, isLoading, isError, error } = UseSearchMovies2({ keyword });
  console.log(data, "keyword");
  const { token } = useAuth();

  useEffect(() => {
    if (token) {
      axios
        .post("http://localhost:8080/checkToken", null, {
          headers: { Authorization: token },
        })
        .catch((err) => {
          console.error("토큰 만료됨", err);
        });
    }
  }, [token]);

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
            {data?.results.map((movie, index) => (
              <Col key={index} lg={2} xs={12}>
                <MovieCard movie={movie} />
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default SearchMoviesPage;
