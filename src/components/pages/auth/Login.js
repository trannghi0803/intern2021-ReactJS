import React, { useState } from "react";
import axios from "axios";
// import { Link, Redirect } from "react-router-dom";
import Loading from "../../loading/Loading";

function Login() {
  const [user, setUser] = useState({ username: "", password: "" });
  // const [token, setToken] = useState(false);
  const [isLogged, setIsLogged] = useState(false);

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
    // console.log(e.target.name);
  };
  const loginSubmit = async (e) => {
    setIsLogged(true);
    e.preventDefault();

    if (user.username === "") {
      alert("The username field is required");
    } else if (user.password === "") {
      alert("The password field is required");
    } else {
      const res = await axios.post(
        "https://qlsc.maysoft.io/server/api/auth/login",
        { ...user }
      );
      if (res.data.status === false) {
        alert(res.data.errors);
      } else {
        // console.log(res);
        setIsLogged(false);
        localStorage.setItem("login", res.data.data.access_token);
        window.location.href = "/";
      }
      // console.log(res);
    }
  };
  return (
    <>
      {isLogged ? (
        <Loading />
      ) : (
        <div className="login-page ">
          <form onSubmit={loginSubmit}>
            <h2>Login</h2>
            <input
              type="username"
              name="username"
              required
              placeholder="Username"
              value={user.username}
              onChange={onChangeInput}
            />
            <input
              type="password"
              name="password"
              required
              placeholder="Password"
              autoComplete="on"
              value={user.password}
              onChange={onChangeInput}
            />

            <div className="row">
              <button type="submit">Login</button>
              <button>Register</button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}

export default Login;
