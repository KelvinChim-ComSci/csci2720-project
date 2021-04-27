import React from "react";

class Login extends React.Component {



  render () {
    return (
      <div>
        <h1>Login</h1>
        <form>
          <label for="login-id">Login ID:</label>
          <input type="text" id = "login-id" name="id"></input>
          
          <label for="login-pw">Password:</label>
          <input type="text" id ="login-pw" name="pw"></input>

          <input type="submit"></input>
        </form>
      </div>
    );
  }
}

export default Login;