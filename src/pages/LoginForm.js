import React, { useState, useRef } from "react";

// Building a form using the Form element, and inside the form, going to have 2 inputs: username and pw.
// Then gonna have a button or two, then gonna have a link for signup (if don't do second button right).

// Look at 'Experimental-Michael' on Github; just gonna follow Joshua's example for Login.
    const numberLines = 10; // if more than 10, change the scss to allow more to render

function LoginForm() {
    const [loggedIn, setLoginInfo] = useState(null);
    const [errorState, setErrorState] = useState(false);

    const hasError = () => {
        usernameInputRef.current.value = "";
        passwordInputRef.current.value = "";
        usernameInputRef.current.focus();
        setErrorState(true);
    }

    const handleLogin = async () => {
        let bool = await login(usernameInputRef.current.value, passwordInputRef.current.value)
        if (bool)
            setLoginInfo(getUsername());
        else
            hasError()
    }

    const createAccount = async () => {
        let bool = await createUser(usernameInputRef.current.value, passwordInputRef.current.value);
        if (bool)
            setLoginInfo(getUsername());
        else
            hasError()
    }

    const usernameInputRef = useRef(null); // Ref for the username input
    const passwordInputRef = useRef(null); // Ref for the password input

    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent the form from submitting
    }

    const checkEnterKey = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            if (usernameInputRef.current === document.activeElement)
                passwordInputRef.current.focus()
            else if (passwordInputRef.current === document.activeElement)
                handleLogin();
        }
    }

    return (
        <div id="LoginPopUp" style={{ display: loggedIn ? "none" : "flex" }}>
            <div id="LoginModal">
                <span id="loginText">Login</span>
                <span id="loginError" style={{display: !errorState ? "none" : "block"}}>Error logging in!</span>
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
                        <button onClick={handleLogin}>
                            Login
                        </button>
                        <button onClick={createAccount}>
                            Create Account
                        </button>
                    </span>

                </form>
            </div>
            <div id="backdrop">
                {[...Array(numberLines).keys()].map(i => <span key={i} className="line" />)}
            </div>
        </div>
    );
}

export default LoginForm;
