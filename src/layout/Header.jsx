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
import useAuth from "./../context/useAuth"; // AuthContext 가져오기
import { useState } from "react";

function Header() {

  const navigate = useNavigate(); //  네비게이션 함수 선언
  const { name, logout } = useAuth(); //로그인 정보 가져오기

  // 로그인 버튼 클릭 시 실행될 함수
  const onClickLogin = () => {
    navigate("/login"); // "/login" 페이지로 이동
  };

  //검색기능
  const [keyword, setkeyword]=useState("");
  const search=(event)=>{
    event.preventDefault()//페이지 새로고침을 막고 아래 코드를 실행
    navigate(`/searchmovies?q=${keyword}`);//내가 입력한 값으로 url변경
    setkeyword("");
  }
  return (
    <>
      <Navbar expand="md" className="bg-black">
        <Container fluid>
          <Link to={"/"} className={"navbar-brand "}>
            <img src={netflixLogo} style={{ width: "100px" }} />
          </Link>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "80px" }}
              navbarScroll
            >
              <Link to={"/"} className={"nav-link text-light"}>
                홈
              </Link>
              <Link to={"/movies"} className={"nav-link text-light"}>
                내가 찜한 리스트
              </Link>
            </Nav>
            <div id="p-name-wrapper">
              {sessionStorage.getItem("Authorization") === null ? (
                ""
              ) : (
                <p id="p-name">{sessionStorage.getItem("name")}님의 NETFLIX</p>
              )}
            </div>
            <Form className="d-flex" onSubmit={search}>
              <Form.Control
                type="search"
                placeholder="제목, 사람, 장르"
                className="mx-1 p-2 custom-search"
                bsPrefix="custom-control"
                //검색기능 변경사항
                value={keyword}
                onChange={(event)=>setkeyword(event.target.value)}
              />
              <Button variant="outline-danger" id="searchBtn" className="mx-1" type="submit">
                <FontAwesomeIcon icon={faSearch} />
              </Button>
              {sessionStorage.getItem("Authorization") === null ? (
                <Button
                  variant="outline-danger"
                  className="mx-1"
                  onClick={onClickLogin}
                >
                  <FontAwesomeIcon icon={faUser} />
                </Button>
              ) : (
                ""
              )}
              {sessionStorage.getItem("Authorization") === null ? (
                ""
              ) : (
                <Button variant="danger" className="mx-1" onClick={logout}>
                  <FontAwesomeIcon icon={faArrowRightFromBracket} />
                </Button>
              )}
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Outlet />
    </>
  );
}

export default Header;
