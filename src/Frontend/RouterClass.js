import React from "react";
import { Route, Switch } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";
import Home from "./Home.js";
import LongLink from "./LongLink.js";
import Login from "./Login.js";
import Info from "./Info.js";

class RouterClass extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <ul>
            <LongLink activeOnlyWhenExact={true} to="/" label="Home" />
            <LongLink to="/login" label="Login" />
            <LongLink to="/info" label="Info" />
          </ul>

          <hr />

          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/info" component={Info} />
            {/*info is for testing only/}
            {/*<Route path="*" component={NoMatch} />*/}
          </Switch>
        </div>
      </Router>
    );
  }
}

export default RouterClass;

