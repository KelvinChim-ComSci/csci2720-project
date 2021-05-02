import React from "react";
import { Route, Switch } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";
import Home from "./Home.js";
import LongLink from "./LongLink.js";
import Login from "./Login.js";
import LoginedRouterClass from "./LoginedRouterClass.js";

class RouterClass extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <ul>
            <LongLink activeOnlyWhenExact={true} to="/" label="Home" />
            <LongLink to="/login" label="Login" />
            <LongLink to="/logined" label="LoginedRouterClass" />
          </ul>

          <hr />
          {/*<button type="button" onClick={() => console.log(this.props.logined)}>change to login</button>*/}
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/logined" component={LoginedRouterClass} />
            {/*info is for testing only/}
            {/*<Route path="*" component={NoMatch} />*/}
          </Switch>
        </div>
      </Router>
    );
  }
}


export default RouterClass;

