import React from "react";
import { Route, Switch } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";
import LongLink from "./LongLink.js";
import Info from "./Info.js";


class LoginedRouterClassAdmin extends React.Component { //Admin Page
    render() {
        return (
            <Router>
                <div>
                    <h2>Welcome back, Admin!</h2>
                    <ul>
                        <LongLink to="/info" label="Info" />
                    </ul>

                    <hr />

                    <Switch>
                        <Route path="/info" component={Info} />
                        {/*info is for testing only/}
            {/*<Route path="*" component={NoMatch} />*/}
                    </Switch>
                </div>
            </Router>
        );
    }
}

export default LoginedRouterClassAdmin;