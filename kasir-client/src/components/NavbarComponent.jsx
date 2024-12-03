import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

const NavbarComponent = () => {
  return (
    <Navbar expand="lg" data-bs-theme="dark" className="custom-navbar">
      <Container>
        <Navbar.Brand>
          <img src="/assets/images/cash-register.png" alt="Logo" width="30" height="30" className="d-inline-block align-top" />
          {" "}
          Kasirku
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
      </Container>
    </Navbar>
  );
}

export default NavbarComponent