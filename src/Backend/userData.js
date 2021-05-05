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
  

class userData extends React.Component {
    render() {
        return (
            <Router>
                <ul>
                    <LongLink to="/createUser" label="Create User"/>
                    <LongLink to="/retrieveUser" label="Retrieve User"/>
                    <LongLink to="/updateUser" label="Update User"/>
                    <LongLink to="/deleteUser" label="Delete User"/>
                </ul>
                <Switch>
                    <Route path="/createUser" component={createUser}/>
                    <Route path="/retrieveUser" component={retrieveUser}/>
                    <Route path="/updateUser" component={updateUser}/>
                    <Route path="/deleteUser" component={deleteUser}/>
                </Switch>
                </Router>
        )
    }

}

class createUser extends React.Component {
    constructor(props) {
        super(props);
        this.validate = this.validate.bind(this);
    }

    validate(){ 
        
    }

    render (){
        return(
            <div>
                <h2>Create a User account</h2>
                <form action="http://csci2720-g84.cse.cuhk.edu.hk/userData/createUser/create" method="post">
                    <label htmlFor="user-id">User ID:</label>
                    <input type="text" id = "user-id" name="id"></input>
                    
                    <label htmlFor="user-pw">Password:</label>
                    <input type="password" id ="user-pw" name="pw"></input>

                    <input type="submit" />
                    {/*<button id="Submit" type="button" onClick={this.validate}>Create</button>*/}
                </form>
            </div>
        )
    }
}

class retrieveUser extends React.Component {
    render (){
        return(
            <h2>Retrieve a User account</h2>
        )
    }
}

class updateUser extends React.Component {
    render (){
        return(
            <h2>Update a User account</h2>
        )
    }
}

class deleteUser extends React.Component {
    render (){
        return(
            <h2>Delete a User account</h2>
        )
    }
}
export default userData;