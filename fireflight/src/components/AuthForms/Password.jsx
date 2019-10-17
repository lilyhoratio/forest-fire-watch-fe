import React, { useState, useContext, useEffect } from "react";
import { GlobalContext } from "../../context/contextProvider";
import useInput from "../../utils/useInput";

function Password({ toggle, setShowAuthForms}) {
    //useInput is a custom hook that should be used for all controlled inputs
    const [email, setEmail, handleEmail] = useInput("", "email");
    const [loading, setLoading] = useState(false);
    const [errorStatus, setErrorStatus] = useState(false);
    const [errorText, setErrorText] = useState({});
    //get global context (think redux store)
    const context = useContext(GlobalContext);

    //view context once / example of how to use
    useEffect(() => {
        console.log(context);
    }, []);

    function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);
        const credentials = { email };

        setErrorStatus(false);
        setErrorText("");

        context.state.remote
            .login(credentials)
            .then(res => {
                setEmail("");
                setLoading(false);
                setShowAuthForms(false);
            })
            .catch(err => {
                setErrorText("Email is Invalid");
                setErrorStatus(true);
                setLoading(false);
            });
    }

    return (
        <div className="login-page-container">
            <button className="form-close-btn" onClick={() => setShowAuthForms(false)}>x</button>
            <h2 className="form-heading">Password Reset</h2>
            <label>Enter your address and we'll send you a link to reset your password.</label>
            <form className="auth-form-container" onSubmit={handleSubmit}>
                <div className="input-containers">
                    <label htmlFor="email">Email Address</label>
                    <input
                        className="form-input"
                        type="text"
                        name="email"
                        value={email}
                        onChange={handleEmail}
                        placeholder=""
                    />
                    {errorStatus ? (
                        <span className="name-error-text">{errorText}</span>
                    ) : (
                            <span className="user-error-text" />
                        )}
                    <br />
                    <button className="auth-btn" type="submit" disabled={loading}>
                        {loading ? "Loading..." : "Send Email"}
                    </button>
                </div>
                <p>
                    Need to create an account?
          <a className="create-an-account" href="#">
                        Sign up Here
          </a>
                </p>
            </form>
            {/* Remove Registration split */}
            {/* <LoginSplitContainer>
        <LoginSplit toggle={toggle} />
      </LoginSplitContainer> */}
        </div>
    );
}

export default Password;