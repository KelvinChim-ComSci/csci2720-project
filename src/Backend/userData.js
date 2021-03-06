/*
1155125630 Tse Shun Chi
1155126571 Chim Ka Chun
1155127047 Au Tsz Nga
1155127334 Wong Yi Oi
1155127464 Liu Hoi Pan
*/

import React from "react";
import { Link, Route, Switch, useRouteMatch } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";


function LongLink({ label, to, activeOnlyWhenExact }) {
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


class userData extends React.Component {
    render() {
        return (
            <Router>
                <ul>
                    <LongLink to="/createUser" label="Create User" />
                    <LongLink to="/retrieveUser" label="Retrieve User" />
                    <LongLink to="/updateUser" label="Update User" />
                    <LongLink to="/deleteUser" label="Delete User" />
                </ul>
                <Switch>
                    <Route path="/createUser" component={createUser} />
                    <Route path="/retrieveUser" component={retrieveUser} />
                    <Route path="/updateUser" component={updateUser} />
                    <Route path="/deleteUser" component={deleteUser} />
                </Switch>
            </Router>
        )
    }

}

class createUser extends React.Component {
    render() {
        return (
            <div>
                <h2>Create a User account</h2>
                <form action="http://csci2720-g96.cse.cuhk.edu.hk/userData/createUser/create" method="post">
                    <div>
                        <label htmlFor="user-id">User ID:</label>
                        <input type="text" id="user-id" name="id" required></input>
                    </div>
                    <div>
                        <label htmlFor="user-pw">Password:</label>
                        <input type="password" id="user-pw" name="pw" required></input>
                    </div>
                    <div style={{display:"-ms-inline-flexbox" }}>
                    <input type="submit"  value= "Submit" style={{ margin: "0", marginTop:"2%"}}/>
                    </div>
                </form>
            </div>
        )
    }
}

class retrieveUser extends React.Component {
    render() {
        return (
            <div>
                <h2>Retrieve a User account</h2>
                <form action="http://csci2720-g96.cse.cuhk.edu.hk/userData/retrieveUser/retrieve" method="post">
                    <div>
                        <label htmlFor="user-id">User ID:</label>
                        <input type="text" id="user-id" name="id" required></input>
                    </div>
                    <div style={{display:"-ms-inline-flexbox" }}>
                    <input type="submit"  value= "Submit" style={{ margin: "0", marginTop:"2%"}}/>
                    </div>
                </form>
            </div>
        )
    }
}

class updateUser extends React.Component {
    render() {
        return (
            <div>
                <h2>Update a User account</h2>
                <form action="http://csci2720-g96.cse.cuhk.edu.hk/userData/updateUser/update" method="post">
                    <div>
                        <label htmlFor="user-id">Original User ID:</label>
                        <input type="text" id="user-id" name="id" required></input>
                    </div>
                    <div>
                        <label htmlFor="newuser-id">New User ID:</label>
                        <input type="text" id="newuser-id" name="newid" required></input>
                    </div>
                    <div>
                        <label htmlFor="newuser-pw">New Password:</label>
                        <input type="text" id="newuser-pw" name="newpw" required></input>
                    </div>
                    <div style={{display:"-ms-inline-flexbox" }}>
                    <input type="submit"  value= "Submit" style={{ margin: "0", marginTop:"2%"}}/>
                    </div>
                </form>
            </div>
        )
    }
}

class deleteUser extends React.Component {
    render() {
        return (
            <div>
                <h2>Delete a User account</h2>
                <form action="http://csci2720-g96.cse.cuhk.edu.hk/userData/deleteUser/delete" method="post">
                    <div>
                        <label htmlFor="user-id">User ID:</label>
                        <input type="text" id="user-id" name="id" required></input>
                    </div>
                    <div style={{display:"-ms-inline-flexbox" }}>
                    <input type="submit"  value= "Submit" style={{ margin: "0", marginTop:"2%"}}/>
                    </div>
                </form>
            </div>
        )
    }
}
export default userData;