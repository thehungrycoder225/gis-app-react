import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { logout } from '../actions/userActions';
const Header = () => {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const logoutHandler = () => {
    dispatch(logout());
  };
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
              {userInfo ? (
                <NavDropdown title={userInfo.name} id='username'>
                  <LinkContainer to='/user/profile'>
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <>
                  <LinkContainer to='/student/register'>
                    <Nav.Link>
                      <i className='fas fa-graduation-cap'></i>Student
                      Registration
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
                </>
              )}
              {userInfo && userInfo.role === 'admin' && (
                <NavDropdown title={userInfo.role} id='adminmenu'>
                  <LinkContainer to='/admin/user-list'>
                    <NavDropdown.Item>Users</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/admin/student-list'>
                    <NavDropdown.Item>Students</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/admin/employee-list'>
                    <NavDropdown.Item>Employees</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/admin/map'>
                    <NavDropdown.Item>Map</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}
              {userInfo && userInfo.role === 'client' && (
                <NavDropdown title={userInfo.role} id='clientmenu'>
                  <LinkContainer to='/covid/register'>
                    <NavDropdown.Item>Covid Case</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/client/map'>
                    <NavDropdown.Item>Covid Map</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
