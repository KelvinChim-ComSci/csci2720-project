import React from "react";
import { Route, Switch } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";
import LongLink from "./LongLink.js";
import Info from "./Info.js";
import Place from "./Place.js";
import FavouritePlace from "./FavouritePlace.js";


class LoginedRouterClassUser extends React.Component { //User Page
    componentDidMount() {
        this.props.getUsername();
    }
    render() {
        return (
            <Router>
                <div>
                    <header>
                        <p id="username"></p>
                        <button onClick={this.props.Logout}>Logout</button>
                    </header>
                    {/*<h2>Welcome back, User! OwO</h2>*/}
                    <ul>
                        <LongLink to="/info" label="Real-time Data" />
                        <LongLink to="/favouriteplace" label="FavouritePlace" />
                    </ul>

                    <hr />

                    <Switch>
                        <Route path="/info" component={Info} />
                        <Route path="/place" component={Place} />
                        <Route path="/favouriteplace" component={FavouritePlace} />
                        {/*<Route path="*" component={NoMatch} />*/}
                    </Switch>
                </div>
            </Router>
        );
    }
}

export default LoginedRouterClassUser;