import React, { useState, useEffect } from 'react'; // useEffect 추가
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './AppLayout.css';
import { Outlet } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faUser } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/netflixLogo.png';


const AppLayout = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState(''); // 상태로 사용자 이름을 저장

  // 컴포넌트가 처음 렌더링될 때 sessionStorage에서 사용자 이름을 가져오기
  useEffect(() => {
    const name = sessionStorage.getItem('userName'); // 세션에서 사용자 이름 가져오기
    console.log('로그인된 사용자:', name); // 디버깅용으로 확인
    if (name) {
      setUserName(name); // 이름이 있으면 상태에 설정
    }
  }, []); // 빈 배열로 설정하여 컴포넌트가 처음 렌더링될 때만 실행되게 함

  const LoginController = () => {
    navigate('/login'); // 로그인 페이지로 이동
  };

  const handleLogout = () => {
    sessionStorage.removeItem('userName'); // 세션에서 사용자 정보 삭제
    setUserName(''); // 사용자 이름 초기화
    navigate('/'); // 홈 화면으로 이동
  };

  return (
    <>
      <Navbar expand="lg" className="navbar">
        <Container fluid>
          <Navbar.Brand as={Link} to="/">
            <img src={logo} width={100} alt="Netflix Logo" />
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: '100px' }}
              navbarScroll
            >
              <Nav.Link as={Link} to="/">홈</Nav.Link>
              <Nav.Link as={Link} to="/movies">내가 찜한 리스트</Nav.Link>
            </Nav>

            <Form className="d-flex align-items-center gap-2">
  {/* userName이 있을 때 이름을 먼저 표시 */}
  {userName ? (
    <span className="me-3">{userName} 님</span>  
  ) : null}

  {/* 검색 입력 필드 */}
  <Form.Control
    type="search"
    placeholder="Search"
    className="me-2"
    aria-label="Search"
  />
  
  {/* 검색 버튼 */}
  <Button variant="outline-danger" id="searchBtn">
    <FontAwesomeIcon icon={faSearch} />
  </Button>

  {/* 로그인 / 로그아웃 버튼 */}
  {userName ? (
    <Button variant="outline-danger" className="d-inline-block logoutBtn" onClick={handleLogout}>
      로그아웃
    </Button>
  ) : (
    <Button variant="outline-danger" className="d-inline-block" onClick={LoginController}>
      <FontAwesomeIcon icon={faUser} />
    </Button>
  )}
</Form>


          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Outlet />
    </>
  );
};

export default AppLayout;
