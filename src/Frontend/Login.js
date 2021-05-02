import React from "react";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.validate = this.validate.bind(this);
  }


  validate(){ // Validation
    console.log("id: " + document.getElementById("login-id").value);
    console.log("pw: " + document.getElementById("login-pw").value);
    fetch(
      `http://csci2720-g114.cse.cuhk.edu.hk/login`,
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
      .then((res) => {
        var a = 0;
        console.log("res.status: " + res.status);
        const test = res.status;
        if (test === 201) {
          a = 1;
          this.props.handleLogin();
        }
        else if (test === 200) {
          a = 0;
          this.props.handleLogin();
        }
        else if (test === 422) {
          a = -1;
          alert("hello");
        }
        else
          return console.log("error");
        return a;
      })
      .then((res) => res.json())
      .catch(error => console.error('Error:', error))
      .then((res) => console.log(res))
  }


  render () {   
      //'http://localhost:3000/event/%27+document.getElementById(%27new-event%27).value+%27/loc/%27+document.getElementById(%27new-loc%27).value'
    return (
      <div>
        <h1>Login</h1>
        <form>
          <label htmlFor="login-id">Login ID:</label>
          <input type="text" id = "login-id" name="id"></input>
          
          <label htmlFor="login-pw">Password:</label>
          <input type="password" id ="login-pw" name="pw"></input>

          <button id="Submit" type="button" onClick={this.validate}>Login</button>
        </form>
        <button onClick={this.props.handleLogin}>To Logined Page</button>
      </div>
    );
  }
}

export default Login;