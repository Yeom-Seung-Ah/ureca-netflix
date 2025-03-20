import { createContext, useState, useEffect, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [name, setName] = useState(sessionStorage.getItem("name") || "");
  const [token, setToken] = useState(
    sessionStorage.getItem("Authorization") || ""
  );
  const [userId, setUserId] = useState(sessionStorage.getItem("userId") || "");
  const isLoggingOutRef = useRef(false); // 로그아웃 처리 중 여부를 추적

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = token;
    } else {
      delete axios.defaults.headers.common["Authorization"];
    }
  }, [token]);

  const logout = useCallback(
    async (force = false) => {
      if (isLoggingOutRef.current) return;
      isLoggingOutRef.current = true;

      // force가 false인 경우에만 확인 대화상자 실행
      if (!force && !window.confirm("로그아웃 하시겠습니까?")) {
        isLoggingOutRef.current = false;
        return;
      }
      try {
        await axios.post(
          "http://localhost:8080/logout",
          {},
          {
            headers: { Authorization: sessionStorage.getItem("Authorization") },
          }
        );
      } catch (error) {
        console.warn("로그아웃 요청 오류 발생(무시):", error);
      } finally {
        sessionStorage.clear();
        delete axios.defaults.headers.common["Authorization"];
        setToken("");
        setName("");
        setUserId("");
        navigate("/login", { replace: true }); // 쿼리 파라미터 없이 /login으로 이동
        isLoggingOutRef.current = false;
      }
    },
    [navigate]
  );

  // Axios 인터셉터: API 호출 시 401 응답(토큰 만료)이 있으면 자동 로그아웃 처리
  useEffect(() => {
    const interceptor = axios.interceptors.response.use(
      (response) => response,
      (error) => {
        const url = error.config.url;

        // TMDB API 에러는 무시
        if (url.includes("themoviedb.org")) {
          return Promise.reject(error);
        }

        if (error.response && error.response.status === 401) {
          if (
            !isLoggingOutRef.current &&
            sessionStorage.getItem("Authorization")
          ) {
            isLoggingOutRef.current = true;
            alert("토큰이 만료되었습니다. 다시 로그인하세요.");

            axios
              .post(
                "http://localhost:8080/logout",
                {},
                {
                  headers: {
                    Authorization: sessionStorage.getItem("Authorization"),
                  },
                }
              )
              .catch((e) => console.warn("로그아웃 요청 에러:", e))
              .finally(() => {
                sessionStorage.clear();
                delete axios.defaults.headers.common["Authorization"];
                setToken("");
                setName("");
                setUserId("");
                navigate("/login");
                isLoggingOutRef.current = false;
              });
          }
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axios.interceptors.response.eject(interceptor);
    };
  }, [navigate]);

  const login = async (email, password) => {
    try {
      const response = await axios.post("http://localhost:8080/tokenLogin", {
        userId: email,
        userPwd: password,
      });

      if (response.data.Authorization) {
        sessionStorage.setItem("Authorization", response.data.Authorization);
        sessionStorage.setItem("name", response.data.name);
        sessionStorage.setItem("userId", email);
        setToken(response.data.Authorization);
        setName(response.data.name);
        axios.defaults.headers.common["Authorization"] =
          response.data.Authorization;
        setUserId(email);
        navigate("/");
        alert(`${response.data.name}님 환영합니다!`);
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

  const updateAuth = (newToken, newName, newUserId) => {
    setToken(newToken);
    setName(newName);
    setUserId(newUserId);
    sessionStorage.setItem("Authorization", newToken);
    sessionStorage.setItem("name", newName);
    sessionStorage.setItem("userId", newUserId);
  };

  const [wishList, setWishList] = useState([]);

  const fetchWishList = useCallback(async (userId) => {
    try {
      const response = await axios.get("http://localhost:8080/getWishList", {
        params: { userId },
      });
      setWishList(response.data);
    } catch (error) {
      console.error("찜 목록 불러오기 실패", error);
    }
  }, []);

  useEffect(() => {
    if (userId) {
      fetchWishList(userId);
    } else {
      setWishList([]);
    }
  }, [userId, fetchWishList]);

  return (
    <AuthContext.Provider
      value={{
        token,
        name,
        userId,
        wishList,
        updateAuth,
        login,
        logout,
        fetchWishList,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
