import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
const Header = () => {
  return (
    <header>
      <Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
        <Container>
          <LinkContainer to='/'>
            <Navbar.Brand>Marinduque GIS</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='ml-auto'>
              <LinkContainer to='/'>
                <Nav.Link>
                  <i className='fas fa-home'></i> Home
                </Nav.Link>
              </LinkContainer>
              <LinkContainer to='/student/register'>
                <Nav.Link>
                  <i className='fas fa-graduation-cap'></i>Student Registration
                </Nav.Link>
              </LinkContainer>
              <LinkContainer to='/employee/register'>
                <Nav.Link>
                  <i className='fas fa-briefcase'></i>Employee Registration
                </Nav.Link>
              </LinkContainer>
              <LinkContainer to='/map'>
                <Nav.Link>
                  <i className='fas fa-map-marker-alt'></i>COVID-19 Map
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
