import { useState, useEffect } from "react";
import "./Signup.css";
import netflixLogo from "./../assets/netflix-logo.png";
import { Link } from "react-router-dom";
import CryptoJS from "crypto-js";
import axios from "axios";

function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // 입력 시 오류 상태 초기화
    setErrors((prevErrors) => ({ ...prevErrors, [name]: false }));
  };

  // 비밀번호 확인 검증을 useEffect에서 처리
  useEffect(() => {
    if (
      formData.confirmPassword &&
      formData.password !== formData.confirmPassword
    ) {
      setErrors((prevErrors) => ({ ...prevErrors, confirmPassword: true }));
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, confirmPassword: false }));
    }
  }, [formData.confirmPassword, formData.password]);

  function sha256(message) {
    return CryptoJS.SHA256(message).toString(CryptoJS.enc.Hex);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    let newErrors = {};

    // 입력하지 않은 필드 감지
    Object.keys(formData).forEach((key) => {
      if (!formData[key]) newErrors[key] = true;
    });

    //setErrors({...newErrors});
    setErrors((prevErrors) => ({ ...prevErrors, newErrors }));

    if (Object.keys(errors).length === 0) {
      const hashedPassword = sha256(formData.password);
      const formDataToSend = {
        userId: formData.email, // 백엔드 컬럼명에 맞게 설정
        userPwd: hashedPassword,
        userName: formData.name,
      };

      try {
        // 백엔드 API 호출 (회원가입 요청)
        const response = await axios.post(
          "http://localhost:8080/signup",
          formDataToSend
        );

        // 성공 처리
        if (response.data.success) {
          alert("회원가입이 완료되었습니다!");

          // 입력 필드 초기화
          setFormData({
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
          });

          // 오류 메시지도 초기화
          setErrors({});
        } else {
          alert(response.data.msg || "회원가입에 실패했습니다.");
        }
      } catch (error) {
        console.error("회원가입 오류:", error);
        alert("서버 오류가 발생했습니다. 다시 시도해주세요.");
      }
    } else {
      alert("입력값이 올바르지않습니다.");
    }
  };

  return (
    <div className="signup-background">
      <div className="signup-content">
        <div className="signup-logo">
          <Link to={"/"} className={"navbar-brand"}>
            <img src={netflixLogo} alt="Netflix Logo" />
          </Link>
        </div>
        <div className="signup-box">
          <h2>회원가입</h2>
          <form id="signup-form" onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder={errors.name ? "이름을 입력해주세요!" : "이름"}
              className={`signup-input ${errors.name ? "error-input" : ""}`}
              value={formData.name}
              onChange={handleChange}
            />

            <input
              type="text"
              name="email"
              placeholder={
                errors.email
                  ? "이메일 또는 휴대폰 번호를 입력해주세요!"
                  : "이메일 또는 휴대폰 번호"
              }
              className={`signup-input ${errors.email ? "error-input" : ""}`}
              value={formData.email}
              onChange={handleChange}
            />

            <input
              type="password"
              name="password"
              placeholder={
                errors.password ? "비밀번호를 입력해주세요!" : "비밀번호"
              }
              className={`signup-input ${errors.password ? "error-input" : ""}`}
              value={formData.password}
              onChange={handleChange}
            />

            <input
              id="input-confirmPassword"
              type="password"
              name="confirmPassword"
              placeholder={
                errors.confirmPassword
                  ? "비밀번호가 일치하지 않습니다!"
                  : "비밀번호 확인"
              }
              className={`signup-input ${
                errors.confirmPassword ? "error-input" : ""
              }`}
              value={formData.confirmPassword}
              onChange={handleChange}
            />
            {errors.confirmPassword && (
              <p className="error-text">❗비밀번호가 일치하지 않습니다!</p>
            )}

            <button type="submit" className="signup-button">
              가입하기
            </button>
          </form>

          <p className="login-link">
            이미 가입하셨나요? <Link to="/login">로그인</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
