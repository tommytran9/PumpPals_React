import { useState } from 'react';

// Building a form using the Form element, and inside the form, going to have 2 inputs: username and pw.
// Then gonna have a button or two, then gonna have a link for signup (if don't do second button right).

// Look at 'Experimental-Michael' on Github; just gonna follow Joshua's example for Login.

function LoginForm() {
    return (
        <form>
            <label>Username 
                <input type="text" />
            </label>
            <label>Password 
                <input type="text" />
            </label>
            <button>Submit</button>
        </form>
    )
}

export default LoginForm;
