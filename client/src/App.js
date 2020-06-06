import React, { Fragment } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { About } from './components/pages/About';
import { Home } from './components/pages/Home';
import { Navbar } from './components/layout/Navbar';
import { RegistrationForm } from './components/auth/RegistrationForm';
import { LoginForm } from './components/auth/LoginForm';

import { ContactState } from './context/contact/state';

import './App.css';

function App() {
  return (
    <ContactState>
      <BrowserRouter>
        <Fragment>
          <Navbar />
          <div className="container">
            <Switch>
              <Route exact path='/' component={Home} />
              <Route exact path='/about' component={About} />
              <Route exact path='/register' component={RegistrationForm} />
              <Route exact path='/login' component={LoginForm} />
            </Switch>
          </div>
        </Fragment>
      </BrowserRouter>
    </ContactState>
  );
}

export default App;
