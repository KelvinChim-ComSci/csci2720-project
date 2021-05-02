import React from "react";

class Login extends React.Component {

  constructor(props) {
    super(props);
    this.state = { authenticated: -1 };
  }

  validate() { // Validation

    fetch(
      `http://csci2720-g101.cse.cuhk.edu.hk/login`,
      {
        method: "POST",
        headers: new Headers({
          //"Access-Control-Allow-Header": "Content-Type",
          //"Accept": 'application/json',
          "Content-Type": 'application/json',
          //"Access-Control-Allow-Origin" : "'http://localhost:3000'",
          //"Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS",
          //"Access-Control-Allow-Credentials" : true, 
        }),
        body: JSON.stringify({
          id: document.getElementById("login-id").value,
          pw: document.getElementById("login-pw").value,
        }),
      }
    )
      .then((res) => res.json())
      .catch(error => console.error('Error:', error))
      .then(function (response) {
        console.log(response);
        return response; // NOT DONE
      });
  }

  checkLogin() { // CHECK IF INPUT IS CORRECT
    var response = this.validate();
    // const response = await this.validate();
    if (response === "ADMIN") {
      console.log("welcome, admin!");
    }
    else if (response === "TRUE") {
      console.log("welcome, normal user!");
    }
    else {
      console.log("Wrong ID or password. Please try again.")
    }
  }

  render() {
    //'http://localhost:3000/event/%27+document.getElementById(%27new-event%27).value+%27/loc/%27+document.getElementById(%27new-loc%27).value'
    return (
      <div>
        <h1>Login</h1>
        <form>
          <label htmlFor="login-id">Login ID:</label>
          <input type="text" id="login-id" name="id"></input>

          <label htmlFor="login-pw">Password:</label>
          <input type="password" id="login-pw" name="pw"></input>

          <button id="Submit" type="button" onClick={this.validate}>Login</button>
        </form>
        <button onClick={this.props.handleLogin}>To Logined Page</button>
      </div>
    );
  }
}

export default Login;

