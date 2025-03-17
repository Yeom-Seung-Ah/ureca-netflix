import { Routes, Route, Outlet } from "react-router-dom";
import Header from "./components/layout/Header";
import Banner from "./pages/Banner";
import Notfound from "./pages/Notfound";
import Login from "./pages/login";
import Signup from "./pages/SignUp";
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
