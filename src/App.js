import React, { useState } from "react";
import Axios from 'axios'
import "./App.css";
import Login from "./Login"
import Dashboard from "./Dashboard";
import ProtectedRoute from "./ProtectedRoute";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import {FaSearch} from "react-icons/fa";

function App() {

  // const [usernameLogin, setUsernameLogin] = useState('')
  // const [passwordLogin, setPasswordLogin] = useState('')

  // const login = () => {
  //   Axios.post('http://localhost:3001/login', { 
  //     username: usernameLogin, 
  //     password: passwordLogin
  //   }).then((response) => {
  //     console.log(response);
  //   })
  // };

  return (
    <Router>
      <Switch>
      {/* <Route path="/">
          <Login />
        </Route> */}
        <Route path="/login">
          <Login />
        </Route>
        <ProtectedRoute path="/dashboard">
          <Dashboard />
        </ProtectedRoute>
        <Route path="/dashboard">
          <Redirect from="/" to="dashboard" />
        </Route>
        <Route path="*">
          <Redirect from="/" to="dashboard" />
        </Route>
      </Switch>
      </Router>
    // <div className="App">
    //   <div className="registration">
    //     <h1>Login</h1>
    //     <label>Username</label>
    //     <input type="text" onChange={(e) => { setUsernameLogin(e.target.value) }} />
    //     <label>Password</label>
    //     <input type="password" onChange={(e) => { setPasswordLogin(e.target.value) }} />
    //     <button onClick={login}>Login</button>
    //   </div>
    // </div>
  );
}

export default App;