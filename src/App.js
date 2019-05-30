import React, { Component } from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import Landing from "./views/Landing";
import Login from "./views/Login";
import ComparePage from "./views/Compare";
import DetailsPage from "./views/Details";
import CreatePage from './views/Create';

class App extends Component {

  render() {
    return (
      
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route path="/login" component={Login} />
          <Route path="/compare" component={ComparePage} />
          <Route path="/details/:compareId" component={DetailsPage} />
          <Route path="/create-user" component={CreatePage} />
        </Switch>
      </BrowserRouter>
      
    );
  }
}

export default App;