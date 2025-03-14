import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
  
    if (!email || !password) {
      setError('이메일과 비밀번호를 입력하세요.');
      return;
    }

    
  
    try {
      const response = await fetch('http://localhost:8080/api/member/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
  
      const data = await response.json();
      if (data.status === 'success') {
        // 로그인 성공 시 사용자 이름을 sessionStorage에 저장
        sessionStorage.setItem('userName', data.userName); // 데이터 저장
        setSuccess(data.message);
        setTimeout(() => navigate('/'), 1500); // 1.5초 후 홈 화면으로 이동
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError('서버 연결에 실패했습니다.');
    }
  };
  
  

  const toSignup = () => {
    navigate('/signup');
  };

  return (
    <div className="login-container">
      <div className="login-background">
        <div className="login-overlay"></div>

        <div className="login-form-container">
          <h1>로그인</h1>

          <input type="email" placeholder="이메일 주소" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input type="password" placeholder="비밀번호" value={password} onChange={(e) => setPassword(e.target.value)} />

          {error && <div className="error-message">{error}</div>}
          {success && <div className="success-message">{success}</div>}

          <button className="loginBtn" onClick={handleLogin}>로그인</button>
          <div>또는</div>
          <button className="signupBtn" onClick={toSignup}>회원가입</button>

          <div className="login-options">
            <div>
              <input type="checkbox" id="remember" />
              <label htmlFor="remember">이메일을 기억합니다</label>
            </div>
            <a href="/forgot-password">비밀번호를 잊으셨나요?</a>
          </div>
        </div>
      </div>
    </div>
  );
};


export default Login;
