import React from "react";
import { Route, Switch } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";
import LongLink from "./LongLink.js";
// import Info from "./Info.js";
// import Login from "./Login.js";
import trafficData from "../Backend/trafficData.js";
import userData from "../Backend/userData.js";


class LoginedRouterClassAdmin extends React.Component { //Admin Page
    render() {
        return (
            <Router>
                <div>
                    <h2>Welcome back, Admin!</h2>
                    <ul>
                        <LongLink to="/trafficData" label="trafficData" />
                        <LongLink to="/userData" label="userData" />
                        <button onClick={this.props.Logout}>Logout</button>
                    </ul>

                    <hr />

                    <Switch>
                        <Route path="/trafficData" component={trafficData} />
                        <Route path="/userData" component={userData} />
            {/*<Route path="*" component={NoMatch} />*/}
                    </Switch>
                </div>
            </Router>
        );
    }
}

export default LoginedRouterClassAdmin;