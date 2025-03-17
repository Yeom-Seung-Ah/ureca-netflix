import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import sha256 from "crypto-js/sha256";

// Context 생성
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
  }, [token]);

  const login = async (email, password) => {
    try {
      const response = await axios.post("http://localhost:8080/tokenLogin", {
        userId: email,
        userPwd: password, // 해싱된 값 전송
      });

      if (response.data.Authorization) {
        sessionStorage.setItem("Authorization", response.data.Authorization);
        sessionStorage.setItem("name", response.data.name);

        setToken(response.data.Authorization);
        setName(response.data.name);
        axios.defaults.headers.common["Authorization"] =
          response.data.Authorization;

        navigate("/");
        alert(`${sessionStorage.getItem("name")}님 환영합니다!`);
        return { success: true };
      } else {
        alert("아이디 또는 비밀번호를 다시 확인해주세요.");
        return {
          success: false,
          message: "아이디 또는 비밀번호를 다시 확인해주세요.",
        };
      }
    } catch (error) {
      console.error("로그인 오류:", error);
      alert("서버 오류가 발생했습니다. 다시 시도해주세요.");
      return {
        success: false,
        message: "서버 오류가 발생했습니다. 다시 시도해주세요.",
      };
    }
  };

  const logout = async () => {
    if (!window.confirm("로그아웃 하시겠습니까?")) return;

    try {
      await axios.post("http://localhost:8080/logout");
    } catch (error) {
      console.error("로그아웃 요청 실패:", error);
    }

    sessionStorage.removeItem("Authorization");
    sessionStorage.removeItem("name");
    delete axios.defaults.headers.common["Authorization"];

    setToken("");
    setName("");

    navigate("/");
  };

  return (
    <AuthContext.Provider value={{ name, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
