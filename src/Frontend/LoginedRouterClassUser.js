import React from "react";
import { Route, Switch } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";
import LongLink from "./LongLink.js";
import Info from "./Info.js";
import Place from "./Place.js";
import FavouritePlace from "./FavouritePlace.js";
import ChartPage from "./ChartPage.js";
import MapPage from "./MapPage.js";

class LoginedRouterClassUser extends React.Component { //User Page
    constructor(props) {
        super(props);
        this.state = { place: "H1" };
        this.changePlace = this.changePlace.bind(this);
    }

    changePlace(loc) {
        this.setState({
            place: loc
        });
    }

    render() {
        return (
            <Router>
                <div className="userMainPage">
                <button className="logoutButton" onClick={this.props.Logout}>Logout</button>
                    <header>
                        <h2>Welcome {window.localStorage.getItem("username")}!</h2>
                    </header>
                    {/*<h2>Welcome back, User! OwO</h2>*/}
                    <ul>
                        <LongLink to="/info" label="Real-time Data" />
                        <LongLink to="/favouriteplace" label="FavouritePlace" />
                        <LongLink to="/chartPage" label="ChartPage" />
                        {/*<LongLink to="/map" label="Map" />*/}
                        <LongLink to="/mapPage" label="MapPage" />
                        {/*<LongLink to="/search" label="Search" />*/}
                    </ul>

                    <hr />

                    <Switch>
                        <Route path="/info"><Info changePlace={this.changePlace} /></Route>
                        {/*<Route path="/info" component={Info} />*/}
                        <Route path="/place"><Place place={this.state.place} changePlace = {this.changePlace} /></Route>
                        <Route path="/favouriteplace">< FavouritePlace username={this.props.username} /></Route>
                        <Route path="/map" component={Map} />
                        <Route path="/chartPage" component={ChartPage} />

                        <Route path="/mapPage" component={MapPage} />

                        {/*<Route path="*" component={NoMatch} />*/}
                        {/*<Route path="/search" component={Search} />*/}
                        {/*info is for testing only/}
            {/*<Route path="*" component={NoMatch} />*/}
                    </Switch>
                </div>
            </Router>
        );
    }
}

export default LoginedRouterClassUser;