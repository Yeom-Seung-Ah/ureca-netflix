import { Routes, Route, Outlet } from "react-router-dom";
import Header from "./layout/Header";
import Banner from "./pages/Homepage/components/Banner";
import Notfound from "./pages/NotFound/Notfound";
import Login from "./pages/Login/Login";
import Signup from "./pages/SignUp/SignUp";
import "bootstrap/dist/css/bootstrap.min.css";
import { AuthProvider } from "./context/AuthContext"; // AuthProvider 추가

function App() {
  return (
    <>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Header />}>
            <Route index element={<Banner />} />
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
