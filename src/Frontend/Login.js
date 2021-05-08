/*
1155125630 Tse Shun Chi
1155126571 Chim Ka Chun
1155127047 Au Tsz Nga
1155127334 Wong Yi Oi
1155127464 Liu Hoi Pan
*/

import React from "react";
import image from "../bg-image.jpg";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.validate = this.validate.bind(this);
  }

  validate() { // Validation
    fetch(
      `http://csci2720-g96.cse.cuhk.edu.hk/login`, // Please use your own port when working.
      { // Otherwise it won't work.
        method: "POST",
        headers: new Headers({
          "Content-Type": 'application/json',
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS",
          "Access-Control-Allow-Credentials": true,
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
      <div className="loginPage" style={{ backgroundImage: `url(${image})`}}>
        <h1>Login</h1>
        <form className="loginForm">
          <div>
          <label htmlFor="login-id">Login ID:</label>
          <input type="text" id="login-id" name="id"></input>
          </div>

          <div>
          <label htmlFor="login-pw">Password:</label>
          <input type="password" id="login-pw" name="pw"></input>
          </div>

          <button className="loginButton" id="Submit" type="button" onClick={this.validate}>Login</button>
        </form>

      </div>
    );
  }
}

export default Login;