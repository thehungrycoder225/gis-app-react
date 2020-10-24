import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
const Header = () => {
  return (
    <header>
      <Navbar bg='light' variant='light' expand='lg' collapseOnSelect>
        <Container>
          <LinkContainer to='/'>
            <Navbar.Brand>Marinduque GIS</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='ml-auto'>
              <LinkContainer to='/'>
                <Nav.Link>
                  <i class='fas fa-home'></i> Home
                </Nav.Link>
              </LinkContainer>
              <LinkContainer to='/student-registration'>
                <Nav.Link>
                  <i class='fas fa-graduation-cap'></i>Student Registration
                </Nav.Link>
              </LinkContainer>
              <LinkContainer to='/employee-registration'>
                <Nav.Link>
                  <i class='fas fa-briefcase'></i>Employee Registration
                </Nav.Link>
              </LinkContainer>
              <LinkContainer to='/map'>
                <Nav.Link>
                  <i class='fas fa-map-marker-alt'></i>COVID-19 Map
                </Nav.Link>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
