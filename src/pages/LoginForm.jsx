import React, { useState, useRef, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { login, getUsername, loginStillValid} from "../Util/ServerConnector.js";

// Building a form using the Form element, and inside the form, going to have 2 inputs: username and pw.
// Then gonna have a button or two, then gonna have a link for signup (if don't do second button right).

// Look at 'Experimental-Michael' on Github; just gonna follow Joshua's example for Login.
function LoginForm({ setIsLoggedIn }) {
  const [loggedIn, setLoginInfo] = useState(null);
  const [errorState, setErrorState] = useState(false);
  // used to redirect to the home page after login
  // as well as direct to the signup page
  const navigate = useNavigate();
  
  const usernameInputRef = useRef(null); // Ref for the username input
  const passwordInputRef = useRef(null); // Ref for the password input

  // Add useEffect hook here
useEffect(() => {
  const checkLogin = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      if (await loginStillValid()) {
        setLoginInfo(getUsername());
        navigate("/");
      }
    }
  };

  checkLogin();
}, []); // Empty dependency array means this effect runs once on mount

  const hasError = () => {
    usernameInputRef.current.value = "";
    passwordInputRef.current.value = "";
    usernameInputRef.current.focus();
    setErrorState(true);
  };

  const handleLogin = async () => {
    let bool = await login(
      usernameInputRef.current.value,
      passwordInputRef.current.value
    );
    if (bool) {
      setLoginInfo(getUsername());
      setIsLoggedIn(true);
      // redirect to home page
      navigate("/");
    } else hasError();
  };

  const createAccount = async () => {
    navigate("/create-account");
  };



  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the form from submitting
  };

  const checkEnterKey = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (usernameInputRef.current === document.activeElement)
        passwordInputRef.current.focus();
      else if (passwordInputRef.current === document.activeElement)
        handleLogin();
    }
  };

  return (
    <div id="LoginPopUp" style={{ display: loggedIn ? "none" : "flex" }}>
      <div id="LoginModal">
        <span id="loginText">Login</span>
        <span
          id="loginError"
          style={{ display: !errorState ? "none" : "block" }}
        >
          Error logging in!
        </span>
        <form onSubmit={handleSubmit}>
          <span id="modalInputs">
            <input
              ref={usernameInputRef}
              type="text"
              placeholder="username"
              onKeyDown={checkEnterKey}
            />
            <input
              ref={passwordInputRef}
              type="password"
              placeholder="password"
              onKeyDown={checkEnterKey}
            />
          </span>

          <span id="modalButtons">
            <button onClick={handleLogin}>Login</button>
            <button onClick={createAccount}>Create Account</button>
          </span>
        </form>
      </div>
      <div id="backdrop"></div>
    </div>
  );
}

export default LoginForm;
