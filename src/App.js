import React from "react";
import "./App.css";
import LoginedRouterClassUser from "./Frontend/LoginedRouterClassUser.js";
import LoginedRouterClassAdmin from "./Frontend/LoginedRouterClassAdmin.js";
import Login from "./Frontend/Login.js";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { username: "", logined: -1 }; // -1 is wrong, 0 is user, 1 is admin
    this.handleLogin = this.handleLogin.bind(this);
    this.Logout = this.Logout.bind(this);
  }

  handleLogin() {
    this.setState({
      logined: 1
    })
  }

  /*
  handleUserLogin() {
    this.setState({
      logined: 0
    })
  }
  */

  Logout() {
    this.setState({
      logined: -1
    })
  }

  render() {
    if (this.state.logined === 0) { // USER INTERFACE
      return (
        <div>
          <LoginedRouterClassUser logined={this.state.logined} Logout={this.Logout} />
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
          <Login handleLogin={this.handleLogin} />
        </div>
      )
    }

    return (
      <div className="App">
        <Login handleLogin={this.handleLogin} />
        {/*<RouterClass logined={this.state.logined} />
        <button type="button" onClick={() => console.log(this.state.logined)}>changeState</button>
        <button type="button" onClick={() => this.setState({ logined: true })}>LoginPage</button>*/}
      </div>
    );
  }
}

export default App;