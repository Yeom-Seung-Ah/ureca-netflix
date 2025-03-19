import { Routes, Route, Outlet } from "react-router-dom";
import Header from "./layout/Header";
import Banner from "./pages/Homepage/components/Banner";
import Notfound from "./pages/NotFound/Notfound";
import Login from "./pages/Login/Login";
import Signup from "./pages/SignUp/SignUp";
import "bootstrap/dist/css/bootstrap.min.css";
import { AuthProvider } from "./context/AuthContext"; // AuthProvider 추가
import "./App.css";
import PopularMovieSlide from "./pages/Homepage/PopularMovieSlide/PopularMovieSlide";
import NowPlayingMovieSlide from "./pages/Homepage/NowPlayingMovieSlide/NowPlayingMovieSlide";
import UpComingMovieSlide from "./pages/Homepage/UpComingMovieSlide/UpComingMovieSlide";
import SearchMoviesPage from "./pages/SearchMovies/SearchMoviesPage";
import MovieDetail from "./pages/MovieDetail/MovieDetail";
function App() {
  return (
    <>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Header />}>
            <Route
              index
              element={
                <>
                  <Banner />
                  <PopularMovieSlide />
                  <NowPlayingMovieSlide />
                  <UpComingMovieSlide />
                </>
              }
            />
            <Route path="/searchmovies" element={<SearchMoviesPage/>}/>
            <Route path="/movie/:id" element={<MovieDetail />} />
          </Route>

          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<Notfound />} />
        </Routes>
      </AuthProvider>
    </>
  );
}

export default App;
