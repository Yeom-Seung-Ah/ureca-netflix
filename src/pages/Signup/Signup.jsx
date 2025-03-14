import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Signup.css';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!email || !userName || !password || !confirmPassword) {
      setError('모든 필드를 입력해주세요.');
      return;
    }
    if (password !== confirmPassword) {
      setError('비밀번호가 일치하지 않습니다.');
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/api/member/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, userName, password })
      });

      const data = await response.json();
      if (data.status === 'success') {
        setSuccess(data.message);
        setTimeout(() => navigate('/login'), 1500); // 1.5초 후 로그인 페이지로 이동
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError('서버 연결에 실패했습니다.');
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-background">
        <div className="signup-overlay"></div>

        <div className="signup-form-container">
          <h1>회원가입</h1>

          <input type="email" placeholder="이메일 주소" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input type="text" placeholder="이름" value={userName} onChange={(e) => setUserName(e.target.value)} />
          <input type="password" placeholder="비밀번호" value={password} onChange={(e) => setPassword(e.target.value)} />
          <input type="password" placeholder="비밀번호 확인" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />

          {error && <div className="error-message">{error}</div>}
          {success && <div className="success-message">{success}</div>}

          <button className="signBtn" onClick={handleSignup}>회원가입</button>

          <div className="signup-options">
            <span>이미 계정이 있으신가요? </span>
            <a href="/login">로그인하기</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
