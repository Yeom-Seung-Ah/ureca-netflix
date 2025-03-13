import { usePopularMovies2 } from "../Hooks/UsePopularMovies";
import Alert from "react-bootstrap/Alert";
import "./Banner.css";

function Banner() {
  const { data, isLoading, isError, error } = usePopularMovies2();
  console.log(data);
  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  if (isError) {
    return <Alert variant="danger">{error.message}</Alert>;
  }
  return (
    <div
      style={{
        backgroundImage: `url(https://media.themoviedb.org/t/p/original${data.results[0].poster_path})`,
      }}
      className="banner"
    >
      <div className="text-white banner-text-area banner-detail">
        <h1 className="roboto-banner-font-bold">{data?.results[0].title}</h1>
        <p className="roboto-banner-font-light">{data?.results[0].overview}</p>
      </div>
    </div>
  );
}

export default Banner;
