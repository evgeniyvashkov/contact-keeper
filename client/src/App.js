import React, { Fragment } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { About } from './components/pages/About';
import { Home } from './components/pages/Home';
import { Navbar } from './components/layout/Navbar';

import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Fragment>
        <Navbar />
        <div className="container">
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/about' component={About} />
          </Switch>
        </div>
      </Fragment>
    </BrowserRouter>
  );
}

export default App;
