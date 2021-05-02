import React from "react";
import "./App.css";
//import RouterClass from "./Frontend/RouterClass.js";
import LoginedRouterClassUser from "./Frontend/LoginedRouterClassUser.js";
import LoginedRouterClassAdmin from "./Frontend/LoginedRouterClassAdmin.js";
import Login from "./Frontend/Login.js";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { logined: -1 }; // -1 is wrong, 0 is user, 1 is admin
    this.handleLogin = this.handleLogin.bind(this);
  }

  handleLogin() { // DEFAULT AS USER CURRENTLY
    this.setState({
      logined: 0
    })
  }

  render() {
    if (this.state.logined === 0) { //USER INTERFACE
      return (
        <div>
          <LoginedRouterClassUser logined={this.state.logined} />
        </div>
      );
    }
    else if (this.state.logined === 1) { //ADMIN INTERFACE
        return (
          <div>
            <LoginedRouterClassAdmin logined={this.state.logined} />
          </div>
        );
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