import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { logout } from '../actions/userActions';
import { elogout } from '../actions/employeeActions';
import { slogout } from '../actions/studentActions';
import logo from '../extras/Logo.svg';
const Header = () => {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const employeeLogin = useSelector((state) => state.employeeLogin);
  const { employeeInfo } = employeeLogin;
  const studentLogin = useSelector((state) => state.studentLogin);
  const { studentInfo } = studentLogin;
  const [navbar, setNavbar] = useState('');
  const logoutHandler = () => {
    dispatch(logout());
  };
  const eLogoutHandler = () => {
    dispatch(elogout());
  };
  const sLogoutHandler = () => {
    dispatch(slogout());
  };

  const navBackgroundHandler = () => {
    window.scrollY >= 50 ? setNavbar(true) : setNavbar(false);
  };

  window.addEventListener('scroll', navBackgroundHandler);
  return (
    <header>
      <Navbar
        className={`navbar-dark navbar-transparent py-0 ${
          navbar ? 'navbar active' : 'navbar'
        }`}
        expand='lg'
        collapseOnSelect
        fixed='top'
      >
        <Container>
          <LinkContainer to='/'>
            <Navbar.Brand>
              {/* {' '}
              <img src={logo} alt='' />{' '} */}
              <i className='fab fa-typo3'></i>
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='m-auto'>
              {userInfo ? (
                <NavDropdown title={userInfo.name} id='username'>
                  <LinkContainer to='/user/profile'>
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : employeeInfo ? (
                <NavDropdown title={employeeInfo.name} id='employeeName'>
                  <LinkContainer to='/employee/profile'>
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={eLogoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : studentInfo ? (
                <NavDropdown title={studentInfo.name} id='studentName'>
                  <LinkContainer to='/student/profile'>
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={sLogoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <>
                  <LinkContainer to='/'>
                    <Nav.Link>
                      <i className='px-1 fas fa-home'></i> Home
                    </Nav.Link>
                  </LinkContainer>
                  <LinkContainer to='/covid/map'>
                    <Nav.Link>
                      <i className='px-1 fas fa-map-marker-alt'></i>Covid Zone
                    </Nav.Link>
                  </LinkContainer>
                  <LinkContainer to='/register'>
                    <Nav.Link>
                      <i className='px-1 far fa-edit'></i>
                      Registration
                    </Nav.Link>
                  </LinkContainer>
                  <LinkContainer to='/login'>
                    <Nav.Link>
                      <i className='px-1 fas fa-fingerprint'></i>
                      Login
                    </Nav.Link>
                  </LinkContainer>
                </>
              )}
              {userInfo && userInfo.role === 'admin' && (
                <NavDropdown title={userInfo.role + 'Panel'} id='adminmenu'>
                  <LinkContainer to='/admin/user/list'>
                    <NavDropdown.Item>Users</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/admin/student/list'>
                    <NavDropdown.Item>Students</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/admin/employee/list'>
                    <NavDropdown.Item>Employees</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}
              {userInfo && userInfo.role === 'client' && (
                <NavDropdown title={userInfo.role + 'Panel'} id='clientmenu'>
                  <LinkContainer to='/client/covid/list'>
                    <NavDropdown.Item>Covid Records</NavDropdown.Item>
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
