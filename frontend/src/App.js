import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import { Container } from 'react-bootstrap';
import Home from './screens/Home';
import StudentRegister from './screens/StudentRegister';
import EmployeeRegister from './screens/EmployeeRegister';
import CovidRegister from './screens/CovidRegister';
import CovidMap from './screens/CovidMap';
import UserLogin from './screens/UserLogin';
import UserRegister from './screens/UserRegister';
import UserProfile from './screens/UserProfile';
import UserList from './screens/UserList';
import UserEdit from './screens/UserEdit';
import StudentList from './screens/StudentList';
import StudentEdit from './screens/StudentEdit';

class App extends React.Component {
  render() {
    return (
      <Router>
        <Header />
        <main className='py-3'>
          <Container>
            <Route path='/' component={Home} exact />
            <Route path='/student/register' component={StudentRegister} />
            <Route path='/employee/register' component={EmployeeRegister} />
            <Route path='/client/covid/register' component={CovidRegister} />
            <Route path='/user/login' component={UserLogin} />
            <Route path='/user/register' component={UserRegister} />
            <Route path='/user/profile' component={UserProfile} />
            <Route path='/admin/user-list' component={UserList} />
            <Route path='/admin/user/:id/edit' component={UserEdit} />
            <Route path='/admin/student-list' component={StudentList} />
            <Route path='/admin/student/:id/edit' component={StudentEdit} />
          </Container>
          <Route path='/covid/map' component={CovidMap} />
        </main>
        <Footer />
      </Router>
    );
  }
}

export default App;
