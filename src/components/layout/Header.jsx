import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link, useNavigate } from "react-router-dom";
import "./Header.css";
import netflixLogo from "./../../assets/netflix-logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faUser,
  faArrowRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { Outlet } from "react-router-dom";

function Header() {
  const navigate = useNavigate(); // ✅ 네비게이션 함수 선언

  // 로그인 버튼 클릭 시 실행될 함수
  const onClickLogin = () => {
    navigate("/login"); // "/login" 페이지로 이동
  };

  const onClickLogout = () => {
    if (confirm("로그아웃 하시겠습니까?")) {
      sessionStorage.removeItem("user");
      navigate("/");
    }
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
              <Link to={"/"} className={"nav-link text-light"}>
                내가 찜한 리스트
              </Link>
            </Nav>
            <div id="p-name-wrapper">
              {sessionStorage.getItem("user") === null ? (
                ""
              ) : (
                <p id="p-name">
                  {JSON.parse(sessionStorage.getItem("name"))}님의 Netflix
                </p>
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
              {sessionStorage.getItem("user") === null ? (
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
              {sessionStorage.getItem("user") === null ? (
                ""
              ) : (
                <Button
                  variant="danger"
                  className="mx-1"
                  onClick={onClickLogout}
                >
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
