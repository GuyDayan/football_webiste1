import React, {useState} from 'react';
import "../css/signup.css";
import {StartMatch} from "./StartMatch";
import {NavLink, useLocation, useNavigate} from "react-router-dom";
import {sendApiGetRequest, sendApiPostRequest, sendSignInRequest} from "../ApiRequests";


function LoginPage(props) {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [loginSuccess, setLoginSuccess] = useState(false);
    let user = {id: '', username: '', token: '', creationDate: ''};


        const onLogin = () => {
            let signInResponse = "";
            sendSignInRequest({username , password}, (response) => {
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

            { window.$userDetails.loggedIn === true ? <StartMatch /> : <div className="signup-container">
                <div>Doesn't have a user? <NavLink to={"/signup"}>Sign up</NavLink> </div>
                <br/>
                <span className="signup-title">Welcome To Login Page</span>
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
                    <button className={'submit'} onClick={onLogin}>
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