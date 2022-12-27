import React, {useState, useEffect} from 'react';
import "../css/LoginPage.css";
import "../css/signup.css";
import {sendApiPostRequest} from "../ApiRequests";
import {NavLink} from "react-router-dom";


export function SignUp() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [secondPassword, setSecondPassword] = useState('');
    const [currentErrorCode, setCurrentErrorCode] = useState('');
    const [showError, setShowError] = useState(false);
    const [signUpSuccess, setSignUpSuccess] = useState(false);
    const [errorList, setErrorList] = useState([
        {errorCode: 1, reason: "username must contain @"},
        {errorCode: 2, reason: "password length must be at least 8 digits"},
        {errorCode: 3, reason: "username already exist"}
    ]);


    const onSignup = () => {
        let signUpResponse;
        sendApiPostRequest("http://localhost:8989/create-user?", {
            username: username,
            password: password
        }, (response) => {
            signUpResponse = response.data;
            if (signUpResponse.success) {
                let user = signUpResponse.user;
                window.$userDetails.userId = user.id;
                window.$userDetails.token = user.token;
                setSignUpSuccess(true)
            } else {
                setCurrentErrorCode(signUpResponse.errorCode);
                setShowError(true);
            }
        });
    }

    const findError = () => {
        let foundError = errorList.find(error => error.errorCode === currentErrorCode);
        return foundError.reason;
    }
    return (
        <div className={"signup-container"}>
            {signUpSuccess === true ? (
                <div>
                    <h2>Sign-Up has been successfully! </h2>
                    <NavLink to={"/login"}>Click here to Login</NavLink>
                </div>
            ) : (
                <div>
                    <form>
                        <label htmlFor={"username"}>Username</label>
                        <input type={"text"} id={"username"} value={username} onChange={event => setUsername(event.target.value)}/>
                        <label className="fields-text">Password</label>
                        <input type={"password"} value={password} onChange={event => setPassword(event.target.value)}/>
                        <label className="fields-text">Enter password again</label>
                        <input type={"password"} value={secondPassword} onChange={event => setSecondPassword(event.target.value)}/>
                        <br/>
                        <button className="login-button" onClick={onSignup}>Sign up</button>
                    </form>
                    <div>
                        {
                            (password !== secondPassword) && (password.length > 0 && secondPassword.length > 0) &&
                            <div>Passwords dont match</div>
                        }
                    </div>
                    <div>
                        {showError === true && findError()}
                    </div>
                </div>
            )}
        </div>
    )

}
