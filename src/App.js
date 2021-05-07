import React from "react";
import "./App.css";
import LoginedRouterClassUser from "./Frontend/LoginedRouterClassUser.js";
import LoginedRouterClassAdmin from "./Frontend/LoginedRouterClassAdmin.js";
import Login from "./Frontend/Login.js";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: window.localStorage.getItem("username"),
      logined: window.localStorage.getItem("logined"), // "0" means user, "1" mean admin
    }

    this.handleAdminLogin = this.handleAdminLogin.bind(this);
    this.handleUserLogin = this.handleUserLogin.bind(this);
    this.Logout = this.Logout.bind(this);
  }

  async handleAdminLogin() {
    window.localStorage.setItem("logined", 1);
    window.location.reload(false);
  }

  async handleUserLogin() {
    window.localStorage.setItem("username", document.getElementById("login-id").value);
    window.localStorage.setItem("logined", 0);
    window.location.reload(false);
  }

  async Logout() {
    window.localStorage.setItem("username", "");
    window.localStorage.setItem("logined", "");
    window.location.reload(false);
  }

  componentDidMount() {
    console.log(window.localStorage.getItem("username"));
    console.log(window.localStorage.getItem("logined"));
  }

  render() {
    if (this.state.logined === "0") { // USER INTERFACE
      return (
        <div>
          <LoginedRouterClassUser 
            logined={this.state.logined}
            Logout={this.Logout}
            username={this.state.username}
          />
        </div>
      );
    }
    else if (this.state.logined === "1") { // ADMIN INTERFACE
        return (
          <div>
            <LoginedRouterClassAdmin 
              logined={this.state.logined} 
              Logout={this.Logout} 
            />
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