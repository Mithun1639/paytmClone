import React from "react";
import NavBar from "./NavBar";
import "../css files/user_login.css";
import { useState } from "react";
import {useNavigate} from 'react-router-dom'
const User_Login = () => {

    const navigate = useNavigate();

    const [isSigndUp,setIsSignedUp] = useState(false)

    const [email,setEmail] = useState('');
    const [pass, setPass] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try{

            const response = await fetch('http://localhost:3000/user/login', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email, password: pass})

            });
            const data = await response.json();
            if(data.error){
                console.error("Unable To Login...",data.error)
            }else{
                console.log("Logged in successfully....", data);
                const token = data.token
                localStorage.setItem('jsonwebtoken',token)
                setIsSignedUp(true)
                navigate('/');

            }

        }catch (error){
            console.log("Falid to login. Incorrect email and/or password",error);
        }
    };

    return(
        <>
            <div className="user-login-navbar">
                <NavBar isSigndUp={isSigndUp} setIsSignedUp={setIsSignedUp}/>
            </div>
            <div className="user-outer-div">
                <h2 className="user-login-title">User Login</h2>
                <label htmlFor="user-email">Email:</label>
                <input type="text" id="user-email" value={email} onChange={(e) => {setEmail(e.target.value)}}/>
                <label htmlFor="user-pass">Password:</label>
                <input type="password" id="user-pass" value={pass} onChange={(e) => {setPass(e.target.value)}}/>
                <button className="user-login-btn" onClick={handleLogin}>Submit</button>
            </div>
        </>
    )

}

export default User_Login