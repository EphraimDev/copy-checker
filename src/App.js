import React, { Component } from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

// import "./assets/css/animate.min.css";
// import "./assets/sass/light-bootstrap-dashboard-react.scss?v=1.3.0";
// import "./assets/css/demo.css";

import Landing from "./views/Landing";
import Login from "./views/Login";
import ComparePage from "./views/Compare";
import DetailsPage from "./views/Details";

class App extends Component {

  render() {
    return (
      
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route path="/login" component={Login} />
          <Route path="/compare" component={ComparePage} />
          <Route path="/details/:compareId" component={DetailsPage} />
        </Switch>
      </BrowserRouter>
      
    );
  }
}

export default App;
