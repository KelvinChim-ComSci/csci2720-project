/*
1155125630 Tse Shun Chi
1155126571 Chim Ka Chun
1155127047 Au Tsz Nga
1155127334 Wong Yi Oi
1155127464 Liu Hoi Pan
*/

import React from "react";
import { Route, Switch } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";
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
            <Route path="/login" component={Login} />
            {/*<Route path="*" component={NoMatch} />*/}
          </Switch>
        </div>
      </Router>
    );
  }
}

export default RouterClass;
