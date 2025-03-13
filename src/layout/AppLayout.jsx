import React from 'react'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './AppLayout.css';
import { Outlet } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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