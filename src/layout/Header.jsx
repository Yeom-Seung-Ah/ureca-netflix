import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link, useNavigate } from "react-router-dom";
import "./Header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faUser,
  faArrowRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { Outlet } from "react-router-dom";
import netflixLogo from "./../assets/netflix-logo.png";
import useAuth from "./../context/useAuth";
import axios from "axios";
import { useState } from "react";

function Header() {
  const navigate = useNavigate();
  const { name, token, userId, logout } = useAuth(); // AuthContext에서 직접 상태값을 가져옴

  // 로그인 버튼 클릭 시 실행될 함수
  const onClickLogin = () => {
    navigate("/login");
  };

  //검색기능
  const [keyword, setKeyword] = useState("");
  const search = (event) => {
    event.preventDefault(); //페이지 새로고침을 막고 아래 코드를 실행
    navigate(`/searchmovies?q=${keyword}`); //내가 입력한 값으로 url변경
    setKeyword("");
  };

  return (
    <>
      <Navbar expand="md" className="bg-black">
        <Container fluid>
          <Link to="/" className="navbar-brand">
            <img
              src={netflixLogo}
              style={{ width: "100px" }}
              alt="Netflix Logo"
            />
          </Link>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "80px" }}
              navbarScroll
            >
              <Link to="/" className="nav-link text-light">
                홈
              </Link>
              <Link to="/wishList" className="nav-link text-light">
                내가 찜한 리스트
              </Link>
            </Nav>
            <div id="p-name-wrapper">
              {token && <p id="p-name">{name}님의 NETFLIX</p>}
            </div>
            {/* 검색기능추가 */}
            <Form className="d-flex" onSubmit={search}>
              <Form.Control
                type="search"
                placeholder="제목, 사람, 장르"
                className="mx-1 p-2 custom-search"
                bsPrefix="custom-control"
                value={keyword}
                onChange={(event) => setKeyword(event.target.value)}
              />
              <Button
                type="submit"
                variant="outline-danger"
                id="searchBtn"
                className="mx-1"
              >
                <FontAwesomeIcon icon={faSearch} />
              </Button>
              {!token ? (
                <Button
                  variant="outline-danger"
                  className="mx-1"
                  onClick={onClickLogin}
                >
                  <FontAwesomeIcon icon={faUser} />
                </Button>
              ) : null}
              {token ? (
                <Button
                  variant="danger"
                  className="mx-1"
                  onClick={() => logout()}
                >
                  <FontAwesomeIcon icon={faArrowRightFromBracket} />
                </Button>
              ) : null}
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Outlet />
    </>
  );
}

export default Header;
