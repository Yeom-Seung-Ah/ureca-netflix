import { useContext } from "react";
import { AuthContext } from "./AuthContext"; // 파일명에 맞게 수정

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default useAuth;
