import React from "react";
import { Link, Route, Switch, useRouteMatch } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";

function LongLink({label, to, activeOnlyWhenExact}) {
    let match = useRouteMatch({
      path: to,
      exact: activeOnlyWhenExact
    });
    return (
      <li className={match ? "active" : ""}>
        {match && "> "}
        <Link to={to}>{label}</Link>
      </li>
    );
  }

class placeData extends React.Component {
    render() {
        return (
            <Router>
                <ul>
                    <LongLink to="/createPlace" label="Create Place"/>
                    <LongLink to="/retrievePlace" label="Retrieve Place"/>
                    <LongLink to="/updatePlace" label="Update Place"/>
                    <LongLink to="/deletePlace" label="Delete Place"/>
                </ul>
                <Switch>
                    <Route path="/createPlace" component={createPlace}/>
                    <Route path="/retrievePlace" component={retrievePlace}/>
                    <Route path="/updatePlace" component={updatePlace}/>
                    <Route path="/deletePlace" component={deletePlace}/>
                </Switch>
                </Router>
        )
    }
}

class createPlace extends React.Component {
    render (){
        return(
            <div>
                <h2>Create a Place</h2>
                <form action="http://csci2720-g84.cse.cuhk.edu.hk/placeData/createPlace/create" method="post">
                    <label htmlFor="place-id">Place ID:</label>
                    <input type="text" id = "place-id" name="id"></input>
                    
                    <label htmlFor="place-name">Place name:</label>
                    <input type="text" id ="place-name" name="name"></input>

                    <label htmlFor="place-latitude">Place latitude:</label>
                    <input type="text" id ="place-latitude" name="lat"></input>

                    <label htmlFor="place-longitude">Place longitude:</label>
                    <input type="text" id ="place-longitude" name="log"></input>

                    <input type="submit" />
                    {/*<button id="Submit" type="button" onClick={this.validate}>Create</button>*/}
                </form>
            </div>
        )
    }
}

class retrievePlace extends React.Component {
    render (){
        return(
            <div>
            <h2>Retrieve a Place</h2>
            <form action="http://csci2720-g84.cse.cuhk.edu.hk/placeData/retrievePlace/retrieve" method="post">
                <label htmlFor="place-id">Place ID:</label>
                <input type="text" id = "place-id" name="id"></input>
                
                <input type="submit" />
                {/*<button id="Submit" type="button" onClick={this.validate}>Create</button>*/}
            </form>
        </div>
        )
    }
}

class updatePlace extends React.Component {
    render (){
        return(
            <div>
             <h2>Update a Place account</h2>
            <form action="http://csci2720-g84.cse.cuhk.edu.hk/placeData/updatePlace/update" method="post">
                <label htmlFor="place-id">Original Place ID:</label>
                <input type="text" id = "place-id" name="id"></input>

                <label htmlFor="newplace-id">New Place ID:</label>
                <input type="text" id = "newplace-id" name="newid"></input>
                
                <label htmlFor="newplace-name">New Place name:</label>
                <input type="text" id ="newplace-name" name="newname"></input>

                <label htmlFor="newplace-latitude">New Place latitude:</label>
                <input type="text" id ="newplace-latitude" name="newlat"></input>

                <label htmlFor="newplace-longitude">New Place longitude:</label>
                <input type="text" id ="newplace-longitude" name="newlog"></input>

                <input type="submit" />
                {/*<button id="Submit" type="button" onClick={this.validate}>Create</button>*/}
            </form>
        </div>
        )
    }
}

class deletePlace extends React.Component {
    render (){
        return(
            <div>
             <h2>Delete a Place account</h2>
            <form action="http://csci2720-g84.cse.cuhk.edu.hk/placeData/deletePlace/delete" method="post">
                <label htmlFor="place-id">Place ID:</label>
                <input type="text" id = "place-id" name="id"></input>
            
                <input type="submit" />
                {/*<button id="Submit" type="button" onClick={this.validate}>Create</button>*/}
            </form>
            </div>
        )
    }
}
export default placeData;