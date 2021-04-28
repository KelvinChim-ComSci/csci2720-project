import React from "react";

class Login extends React.Component {
  render () {
    function validate() {
      console.log("test" + document.getElementById('login-id').value);
      fetch('http://csci2720-g96.cse.cuhk.edu.hk/login',
      {
        mode: 'no-cors',
        method: 'POST',
        header: {
          'Content-Type':'application/json',
        },
        body: JSON.stringify({
          id: document.getElementById('login-id').value
        }),
      })
      .then((res) => res.text())
      .then((data) => {
        console.log(data);
      })
      //'http://localhost:3000/event/%27+document.getElementById(%27new-event%27).value+%27/loc/%27+document.getElementById(%27new-loc%27).value'
    }
    return (
      <div>
        <h1>Login</h1>
        <form>
          <label htmlFor="login-id">Login ID:</label>
          <input type="text" id = "login-id" name="id"></input>
          
          <label htmlFor="login-pw">Password:</label>
          <input type="password" id ="login-pw" name="pw"></input>

          <button id="Submit" type="button" onClick={validate}>Login</button>
        </form>
      </div>
    );
  }
}

export default Login;