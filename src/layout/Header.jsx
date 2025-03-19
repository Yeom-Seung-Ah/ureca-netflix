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

function Header() {
  const navigate = useNavigate();
  const { name, token, logout } = useAuth(); // AuthContext에서 직접 상태값을 가져옴

  // 로그인 버튼 클릭 시 실행될 함수
  const onClickLogin = () => {
    navigate("/login");
  };

  // 찜한 리스트 클릭 시 토큰 유효성 검사 후 처리 (axios 사용)
  const onClickWishList = async (e) => {
    e.preventDefault();
    if (!token) {
      alert("로그인이 필요합니다.");
      navigate("/login");
      return;
    }
    try {
      // axios로 POST 요청 보내기
      await axios.post("http://localhost:8080/checkToken", null, {
        headers: {
          Authorization: token,
        },
      });
      // 토큰이 유효한 경우: checkToken()에서 loginTime이 갱신된다고 가정
      navigate("/wishList");
    } catch (error) {
      navigate("/login");
    }
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
              <a
                href="#"
                className="nav-link text-light"
                onClick={onClickWishList}
              >
                내가 찜한 리스트
              </a>
            </Nav>
            <div id="p-name-wrapper">
              {token && <p id="p-name">{name}님의 NETFLIX</p>}
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
                <Button variant="danger" className="mx-1" onClick={logout}>
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
