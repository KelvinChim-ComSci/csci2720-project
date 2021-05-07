import React from "react";
import { Route, Switch } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";
import LongLink from "./LongLink.js";
// import Info from "./Info.js";
// import Login from "./Login.js";
import placeData from "../Backend/placeData.js";
import userData from "../Backend/userData.js";



class LoginedRouterClassAdmin extends React.Component { //Admin Page
    render() {
        return (
            <Router>
                <div className ="adminMainPage">
                <button className="logoutButton" onClick={this.props.Logout}>Logout</button>
                <header>
                    <h2>Welcome back, Admin!</h2>
                    
                </header>
                <div>
                    
                    <ul>
                        <LongLink to="/placeData" label="placeData" />
                        <LongLink to="/userData" label="userData" />
                    </ul>

                    <hr />

                    <Switch>
                        <Route path="/placeData" component={placeData} />
                        <Route path="/userData" component={userData} />
            {/*<Route path="*" component={NoMatch} />*/}
                    </Switch>
                </div>
                </div>
            </Router>
        );
    }
}


export default LoginedRouterClassAdmin;