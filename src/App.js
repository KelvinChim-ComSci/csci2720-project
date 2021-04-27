import React from "react";
import "./App.css";
import RouterClass from "./frontend/RouterClass.js";

class App extends React.Component {
  render() {
    return (
      <div className="App">
        {/*<header className="App-header"/>*/}
        <RouterClass/>
      </div>
    );
  }
}

export default App;
