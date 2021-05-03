import React from "react";
import "./App.css";
import LoginedRouterClassUser from "./Frontend/LoginedRouterClassUser.js";
import LoginedRouterClassAdmin from "./Frontend/LoginedRouterClassAdmin.js";
import Login from "./Frontend/Login.js";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { username: "", logined: -1 }; // -1 is wrong, 0 is user, 1 is admin
    this.handleAdminLogin = this.handleAdminLogin.bind(this);
    this.handleUserLogin = this.handleUserLogin.bind(this);
    this.Logout = this.Logout.bind(this);
    this.getUsername = this.getUsername.bind(this);
  }

  handleAdminLogin() {
    this.setState({
      logined: 1
    })
  }

  handleUserLogin() {
    this.setState({
      logined: 0,
      username: document.getElementById("login-id").value
    })
  }

  Logout() {
    this.setState({
      logined: -1
    })
  }

  getUsername() {
    document.getElementById("username").innerHTML = this.state.username;
  }

  render() {
    if (this.state.logined === 0) { // USER INTERFACE
      return (
        <div>
          <LoginedRouterClassUser logined={this.state.logined} Logout={this.Logout} getUsername={this.getUsername} />
        </div>
      );
    }
    else if (this.state.logined === 1) { // ADMIN INTERFACE
        return (
          <div>
            <LoginedRouterClassAdmin logined={this.state.logined} Logout={this.Logout} />
          </div>
        );
    }
    else {
      return (
        <div>
          <Login
            handleAdminLogin={this.handleAdminLogin}
            handleUserLogin={this.handleUserLogin}
          />
        </div>
      )
    }
  }
}

export default App;