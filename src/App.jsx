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
// 예: App.jsx 또는 별도의 AuthInitializer 컴포넌트에서
import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import WishList from "./pages/WishList/WishList";
import { AuthContext } from "./context/AuthContext";

function AuthInitializer() {
  const navigate = useNavigate();
  const { updateAuth } = useContext(AuthContext);

  useEffect(() => {
    // 로그인 페이지라면 쿼리 파라미터 업데이트를 하지 않음
    if (window.location.pathname === "/login") return;

    // 만약 이미 sessionStorage에 토큰이 있다면 업데이트하지 않음
    if (sessionStorage.getItem("Authorization")) return;

    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    const name = params.get("name");
    const userId = params.get("userId");
    if (token && name && userId && token !== "null") {
      updateAuth(token, name, userId);
      // 쿼리 파라미터 제거 (replace)
      navigate(window.location.pathname, { replace: true });
    }
  }, [navigate, updateAuth]);

  return null;
}

function App() {
  return (
    <>
      <AuthProvider>
        <AuthInitializer />
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
            <Route path="/wishList" element={<WishList />} />
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
