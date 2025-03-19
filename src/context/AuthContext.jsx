import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [name, setName] = useState(sessionStorage.getItem("name") || "");
  const [token, setToken] = useState(
    sessionStorage.getItem("Authorization") || ""
  );

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = token;
    } else {
      delete axios.defaults.headers.common["Authorization"];
    }

    // "authChanged" 커스텀 이벤트를 감지해서 로그인 상태 업데이트
    const syncAuth = () => {
      console.log("🔄 authChanged 이벤트 감지!");
      setToken(sessionStorage.getItem("Authorization") || "");
      setName(sessionStorage.getItem("name") || "");
    };

    window.addEventListener("authChanged", syncAuth);
    return () => window.removeEventListener("authChanged", syncAuth);
  }, [token]);

  const logout = async () => {
    if (!window.confirm("로그아웃 하시겠습니까?")) return;

    try {
      await axios.post("http://localhost:8080/logout", {
        headers: { Authorization: sessionStorage.getItem("Authorization") },
      });
    } catch (error) {
      console.error("로그아웃 요청 실패:", error);
    }

    sessionStorage.removeItem("Authorization");
    sessionStorage.removeItem("name");
    delete axios.defaults.headers.common["Authorization"];

    setToken("");
    setName("");

    navigate("/");
    window.location.reload();
  };

  return (
    <AuthContext.Provider value={{ name, token, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
