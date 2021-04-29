import React from "react";

class Login extends React.Component {
  constructor(props)
  {
    super(props);
    this.state = { login: false };
  }
  async validate() {
    var id = document.getElementById('login-id').value;
    var pw = document.getElementById('login-pw').value;
    console.log(id + " " + pw);
    await fetch("http://csci2720-g114.cse.cuhk.edu.hk/login", {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type':'application/json',
      },
      body: JSON.stringify({
        id,
        pw,
      }),
    })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
    })
    .catch((err) => console.log(err));
  }

  render () {
    return (
      <div>
        <h1>Login</h1>
        <form>
          <label htmlFor="login-id">Login ID:</label>
          <input type="text" id = "login-id" name="id"></input>
          
          <label htmlFor="login-pw">Password:</label>
          <input type="password" id ="login-pw" name="pw"></input>

          <button id="Submit" type="button" onClick={() => this.validate()}>Login</button>
        </form>
      </div>
    );
  }
}

export default Login;