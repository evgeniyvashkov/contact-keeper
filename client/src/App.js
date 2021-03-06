import React, { Fragment } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { setAuthToken } from './utils/setAuthToken';

import { About } from './components/pages/About';
import { Home } from './components/pages/Home';
import { Navbar } from './components/layout/Navbar';
import { RegistrationForm } from './components/auth/RegistrationForm';
import { LoginForm } from './components/auth/LoginForm';
import { Alerts } from './components/layout/Alerts';
import { PrivateRoute } from './routing/PrivateRoute';

import { ContactState } from './context/contact/state';
import { AlertState } from './context/alert/state';
import { AuthState } from './context/auth/state';

import './App.css';

if (localStorage.token) {
  setAuthToken();
}

function App() {
  return (
    <AuthState>
      <AlertState>
        <ContactState>
          <BrowserRouter>
            <Fragment>
              <Navbar />
              <div className="container">
                <Alerts />
                <Switch>
                  <PrivateRoute exact path='/' component={Home} />
                  <Route exact path='/about' component={About} />
                  <Route exact path='/register' component={RegistrationForm} />
                  <Route exact path='/login' component={LoginForm} />
                </Switch>
              </div>
            </Fragment>
          </BrowserRouter>
        </ContactState>
      </AlertState>
    </AuthState>
  );
}

export default App;
