import React from "react";
import { Route, Switch } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";
import Home from "./Home.js";
import LongLink from "./LongLink.js";
import Login from "./Login.js";

class RouterClass extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <ul>
            <LongLink activeOnlyWhenExact={true} to="/" label="Home" />
            <LongLink to="/login" label="Login" />
          </ul>

          <hr />

          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/login" component={Login} />
            {/*<Route path="*" component={NoMatch} />*/}
          </Switch>
        </div>
      </Router>
    );
  }
}

export default RouterClass;
