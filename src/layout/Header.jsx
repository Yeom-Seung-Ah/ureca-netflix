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
import { useState, useEffect } from "react";

function Header() {
  const navigate = useNavigate(); //  네비게이션 함수 선언
  const { logout } = useAuth();

  // ✅ 로그인 상태를 저장할 useState 추가
  const [name, setName] = useState(sessionStorage.getItem("name") || "");
  const [token, setToken] = useState(
    sessionStorage.getItem("Authorization") || ""
  );

  useEffect(() => {
    const updateAuth = () => {
      console.log("🔄 헤더에서 세션스토리지 변경 감지!");
      setName(sessionStorage.getItem("name"));
      setToken(sessionStorage.getItem("Authorization"));
    };

    window.addEventListener("storage", updateAuth);
    return () => window.removeEventListener("storage", updateAuth);
  }, []);

  // 로그인 버튼 클릭 시 실행될 함수
  const onClickLogin = () => {
    navigate("/login"); // "/login" 페이지로 이동
  };

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
              <Link to={"/wishList"} className={"nav-link text-light"}>
                내가 찜한 리스트
              </Link>
            </Nav>
            <div id="p-name-wrapper">
              {token ? (
                <p id="p-name">{sessionStorage.getItem("name")}님의 NETFLIX</p>
              ) : (
                ""
              )}
            </div>
            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="제목, 사람, 장르"
                className="mx-1 p-2 custom-search"
                bsPrefix="custom-control"
              />
              <Button variant="outline-danger" id="searchBtn" className="mx-1">
                <FontAwesomeIcon icon={faSearch} />
              </Button>
              {token ? (
                ""
              ) : (
                <Button
                  variant="outline-danger"
                  className="mx-1"
                  onClick={onClickLogin}
                >
                  <FontAwesomeIcon icon={faUser} />
                </Button>
              )}
              {token ? (
                <Button variant="danger" className="mx-1" onClick={logout}>
                  <FontAwesomeIcon icon={faArrowRightFromBracket} />
                </Button>
              ) : (
                ""
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
