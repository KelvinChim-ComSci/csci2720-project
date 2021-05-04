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
                        {/*<LongLink to="/search" label="Search" />*/}
                    </ul>

                    <hr />

                    <Switch>
                        <Route path="/info" component={Info} />
                        <Route path="/place" component={Place} />
                        <Route path="/favouriteplace" component={FavouritePlace} />
<<<<<<< HEAD
                        {/*<Route path="*" component={NoMatch} />*/}
=======
                        {/*<Route path="/search" component={Search} />*/}
                        {/*info is for testing only/}
            {/*<Route path="*" component={NoMatch} />*/}
>>>>>>> 000f1456b8ef6110505a388d34cdb94ad47af418
                    </Switch>
                </div>
            </Router>
        );
    }
}

export default LoginedRouterClassUser;