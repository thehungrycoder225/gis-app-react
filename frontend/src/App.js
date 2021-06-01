import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './screens/Home';
import StudentRegister from './screens/StudentRegister';
import StudentList from './screens/StudentList';
import StudentEdit from './screens/StudentEdit';
import StudentLogin from './screens/StudentLogin';
import StudentProfile from './screens/StudentProfile';
import EmployeeRegister from './screens/EmployeeRegister';
import EmployeeLogin from './screens/EmployeeLogin';
import EmployeeProfile from './screens/EmployeeProfile';
import EmployeeList from './screens/EmployeeList';
import EmployeeEdit from './screens/EmployeeEdit';
import CovidRegister from './screens/CovidRegister';
import CovidList from './screens/CovidList';
import CovidEdit from './screens/CovidEdit';
import CovidMap from './screens/CovidMap';
import UserLogin from './screens/UserLogin';
import UserRegister from './screens/UserRegister';
import UserProfile from './screens/UserProfile';
import UserList from './screens/UserList';
import UserEdit from './screens/UserEdit';
import Register from './screens/Register';
import LoginMenu from './screens/Login';
import NotFound from './screens/404';
import './sass/main.scss';
import './App.css';
class App extends React.Component {
  render() {
    return (
      <Router>
        <main>
          <Header />
          <Route path='/' component={Home} exact />
          <Container className='mt-5'>
            <Route path='/register' component={Register} />
            <Route path='/login' component={LoginMenu} />
            <Route path='/employee/register' component={EmployeeRegister} />
            <Route path='/employee/login' component={EmployeeLogin} />
            <Route path='/student/register' component={StudentRegister} />
            <Route path='/student/login' component={StudentLogin} />
            <Route path='/client/covid/register' component={CovidRegister} />
            <Route path='/client/covid/:id/edit' component={CovidEdit} />
            <Route path='/user/login' component={UserLogin} />
            <Route path='/user/register' component={UserRegister} />
            <Route path='/user/profile' component={UserProfile} />
            <Route path='/admin/user/list' component={UserList} />
            <Route path='/admin/user/:id/edit' component={UserEdit} />
            <Route path='/admin/student/:id/edit' component={StudentEdit} />
            <Route path='/admin/employee/:id/edit' component={EmployeeEdit} />
            <Route path='/404' component={NotFound} />
          </Container>
          <Route path='/client/covid/list' component={CovidList} />
          <Route path='/admin/student/list' component={StudentList} exact />
          <Route
            path='/admin/student/list/page/:pageNumber'
            component={StudentList}
          />
          <Route path='/admin/employee/list' component={EmployeeList} />
          <Route path='/employee/profile' component={EmployeeProfile} />
          <Route path='/student/profile' component={StudentProfile} />
          <Route path='/covid/map' component={CovidMap} />
        </main>
        <Footer />
      </Router>
    );
  }
}

export default App;
