import React from "react";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.validate = this.validate.bind(this);
  }

  validate() { // Validation
    fetch(
      `http://csci2720-g101.cse.cuhk.edu.hk/login`, // Please use your own port when working.
      { // Otherwise it won't work.
        method: "POST",
        headers: new Headers({
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
      .then((res) => {
        if (res.status === 201) { // admin
          this.props.handleAdminLogin();
        }
        else if (res.status === 200) { // user
          this.props.handleUserLogin();
        }
        else if (res.status === 422) { // no user
          alert("Invalid username or password! Please try again.");
        }
        else
          return console.log("error");
      })
  }


  render() {
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
      </div>
    );
  }
}

export default Login;