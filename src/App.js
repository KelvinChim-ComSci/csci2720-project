import React from "react";
import "./App.css";
//import RouterClass from "./Frontend/RouterClass.js";
import LoginedRouterClass from "./Frontend/LoginedRouterClass.js";
import Login from "./Frontend/Login.js";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { logined: false };
    this.handleLogin = this.handleLogin.bind(this);
  }

  handleLogin() {
    this.setState({
      logined: true
    })
  }

  render() {
    if (this.state.logined) {
      return (
        <div>
          <LoginedRouterClass logined={this.state.logined} />
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
