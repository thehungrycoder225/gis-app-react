import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import { Container } from 'react-bootstrap';
import Home from './screens/Home';
import StudentRegister from './screens/StudentRegister';
import EmployeeRegister from './screens/EmployeeRegister';
import CovidMap from './screens/CovidMap';
import UserLogin from './screens/UserLogin';

class App extends React.Component {
  render() {
    return (
      <Router>
        <Header />
        <main className='py-3'>
          <Container>
            <Route path='/' component={Home} exact />
            <Route path='/student/register' component={StudentRegister} exact />
            <Route
              path='/employee/register'
              component={EmployeeRegister}
              exact
            />
            <Route path='/user/login' component={UserLogin} exact />
            <Route path='/map' component={CovidMap} exact />
          </Container>
        </main>
        <Footer />
      </Router>
    );
  }
}

export default App;
