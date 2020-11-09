import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import { Container } from 'react-bootstrap';
import Home from './screens/Home';
import StudentRegister from './screens/StudentRegister';
import StudentList from './screens/StudentList';
import StudentEdit from './screens/StudentEdit';
import EmployeeRegister from './screens/EmployeeRegister';
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
class App extends React.Component {
  render() {
    return (
      <Router>
        <Header />
        <main className='py-3'>
          <Container>
            <Route path='/' component={Home} exact />
            <Route path='/student/register' component={StudentRegister} />
            <Route path='/register' component={Register} />
            <Route path='/employee/register' component={EmployeeRegister} />
            <Route path='/client/covid/register' component={CovidRegister} />
            <Route path='/client/covid/:id/edit' component={CovidEdit} />
            <Route path='/user/login' component={UserLogin} />
            <Route path='/user/register' component={UserRegister} />
            <Route path='/user/profile' component={UserProfile} />
            <Route path='/admin/user/list' component={UserList} />
            <Route path='/admin/user/:id/edit' component={UserEdit} />
            <Route path='/admin/student/:id/edit' component={StudentEdit} />
            <Route path='/admin/employee/:id/edit' component={EmployeeEdit} />
          </Container>
          <Route path='/client/covid/list' component={CovidList} />
          <Route path='/admin/student/list' component={StudentList} />
          <Route path='/admin/employee/list' component={EmployeeList} />
          <Route path='/covid/map' component={CovidMap} />
        </main>
        <Footer />
      </Router>
    );
  }
}

export default App;
