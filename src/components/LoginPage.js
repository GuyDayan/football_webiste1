import React, {useState} from 'react';
import "../css/LoginPage.css";
import {StartMatch} from "./StartMatch";
import {NavLink, useLocation, useNavigate} from "react-router-dom";
import {sendApiGetRequest, sendApiPostRequest} from "../ApiRequests";


function LoginPage(props) {

    const [username, setUsername] = useState("yossi@");
    const [password, setPassword] = useState("12345678");
    const [error, setError] = useState(null);
    const [loginSuccess, setLoginSuccess] = useState(false);
    let user = {id: '', username: '', token: '', creationDate: ''};


    const onLogin = () => {
        let signInResponse = "";
        sendApiPostRequest("http://localhost:8989/sign-in?", {username: username, password: password}, (response) => {
            signInResponse = response.data;
            if (signInResponse.success) {
                user = signInResponse.user;
                window.$userDetails.loggedIn = true;
                window.$userDetails.userId = user.id
                window.$userDetails.token = user.token
                setLoginSuccess(true);
            } else {
                setError(signInResponse.errorCode);

            }
        });


    }


    return (
        <>

            { window.$userDetails.loggedIn === true ? <StartMatch /> : <div className="login-container">
                <span className="login-title">Welcome To Login Page</span>
                Doesn't have a user? <NavLink to={"/signup"}>Sign up</NavLink>
                <div className="fields-container">
                    <div>
                        <div className="fields-text">Username</div>
                        <input value={username} onChange={(event => setUsername(event.target.value))}/>
                    </div>

                    <div>
                        <div className="fields-text">Password</div>
                        <input value={password} onChange={(event => setPassword(event.target.value))}/>
                    </div>
                </div>
                <div>
                    <button className="login-button" onClick={onLogin}>
                        Login
                    </button>
                    <br/>
                    {
                        error === 1 &&
                        <div>Wrong credentials </div>
                    }
                </div>
            </div>
            }
        </>


    );
}

export default LoginPage;