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
                    <div class="btn-group">
                    <LongLink to="/info" label="Real-time Data" class="button" />
                      <LongLink to="/favouriteplace" label="Favourite Place" class="button" /> 
                      <LongLink to="/chartPage" label="Chart Page" class="button" /> 
                      <LongLink to="/mapPage" label="Map Page" class="button"/> 
                    </div>
                    </ul>

                    <hr />

                    <Switch>
                        <Route path="/info"><Info changePlace={this.changePlace} /></Route>
                        {/*<Route path="/info" component={Info} />*/}
                        <Route path="/place"><Place place={this.state.place} changePlace = {this.changePlace} /></Route>
                        <Route path="/favouriteplace">< FavouritePlace username={this.props.username} /></Route>
                        <Route path="/map" component={Map} />
                        <Route path="/chartPage" component={ChartPage} />

                        <Route path="/mapPage"><MapPage place = {this.state.place} changePlace = {this.changePlace}/> </Route>

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