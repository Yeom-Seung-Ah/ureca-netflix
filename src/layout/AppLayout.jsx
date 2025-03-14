<<<<<<< HEAD
import React, { useState, useEffect } from 'react'; // useEffect 추가
=======
import React from 'react'
>>>>>>> beae82bc01f968aa79fc89bc20b9a2129202afe4
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './AppLayout.css';
import { Outlet } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
<<<<<<< HEAD
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
            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
              />
              <Button variant="outline-danger" id="searchBtn">
                <FontAwesomeIcon icon={faSearch} />
              </Button>

              {/* 로그인 여부에 따라 버튼을 동적으로 변경 */}
              {userName ? (
                <div>
                  <span>{userName}님</span>
                  <Button variant="outline-danger" onClick={handleLogout}>
                    로그아웃
                  </Button>
                </div>
              ) : (
                <Button variant="outline-danger" onClick={LoginController}>
                  <FontAwesomeIcon icon={faUser} />
                </Button>
              )}
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Outlet /> {/* 라우터 안에있는 자손들을 가져오는 컴포넌트 */}
    </>
  );
};

export default AppLayout;
=======
import { faSearch,  faUser } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import logo from '../assets/netflixLogo.png';

const AppLayout = () => {
  return (
    <>
       <Navbar expand="lg" className="navbar"> {/* bg-body-tertiary 제거 */}

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
        <Form className="d-flex">
          <Form.Control
            type="search"
            placeholder="Search"
            className="me-2"
            aria-label="Search"
          />
          <Button variant="outline-danger" id="searchBtn"><FontAwesomeIcon icon={faSearch} /></Button>
          <Button variant="outline-danger"><FontAwesomeIcon icon={faUser}/></Button>
        </Form>
      </Navbar.Collapse>
    </Container>
  </Navbar>

  <Outlet/> //라우터 안에있는 자손들을 가져오는 컴포넌트
    </>
    
  );
}

export default AppLayout
>>>>>>> beae82bc01f968aa79fc89bc20b9a2129202afe4
