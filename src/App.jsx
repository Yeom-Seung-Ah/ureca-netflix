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
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import WishList from "./pages/WishList/WishList";

function AuthInitializer() {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    const name = params.get("name");

    if (token && name) {
      sessionStorage.setItem("Authorization", token);
      sessionStorage.setItem("name", name);
      console.log("세션스토리지 업데이트됨:", token, name);

      // URL의 쿼리 파라미터를 제거 (리다이렉트 없이 히스토리 수정)
      navigate(window.location.pathname, { replace: true });
    }
  }, [navigate]);

  return null;
}

function App() {
  return (
    <>
      <AuthProvider>
        <AuthInitializer /> {/* 로그인 정보 초기화를 위한 컴포넌트 */}
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
          </Route>

          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/wishList" element={<WishList />} />
          <Route path="*" element={<Notfound />} />
        </Routes>
      </AuthProvider>
    </>
  );
}

export default App;
