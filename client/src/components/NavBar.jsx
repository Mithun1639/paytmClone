import React, { useEffect } from "react";
import "../css files/navbar.css"
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import CustomAleart from "./Custom_Aleart";
const NavBar = ({isClicked, setIsClicked}) => {

    const navigate = useNavigate()
    const [user, setUser] = useState()
    const [isDropDown,setIsDropDown] = useState(false)
    const fetchUser = async()=>{
        try{
            const reesponse = await fetch('http://localhost:3000/user/getuser',{
                method:'GET',
                headers:{
                    "auth-token":localStorage.getItem('jsonwebtoken')
                }
            })
            const data = await reesponse.json();
            const name = data.name
            setUser(name);
            
        }
        catch(err){
            console.log(err)
        }
    }
    useEffect(()=>{fetchUser() },[])


    return(
        <>
            {user? 
                <div className="navbar">
                    <h2 className="navbar-title">DIGITAL WALLET</h2>
                    <ul style={{position: 'absolute', left: 90 + '%', width: 5 + '%', height: 30 + '%'}} onMouseLeave={() => {setIsDropDown(false)}}>
                        <li className="navbar-username" style={{position: 'relative', left: -15 + '%'}}  onMouseEnter={() => {setIsDropDown(true)}} >{user}</li>
                        <li style={{position: 'absolute', left: -770 + '%', width: 100 + "%"}} onClick={() => {navigate('/')}}>Home</li>
                        <li style={{position: 'absolute', left: -673 + '%'}} onClick={() => {navigate('/send_money')}}>Send Money</li>
                        <li style={{position: 'absolute', left: -561 + '%'}} onClick={() => {navigate('/account_details')}}>Account Details</li>
                        <li style={{position: 'absolute', left: -425 + '%'}} onClick={() => {navigate('/transactions')}}>Transactions</li>
                        <li style={{position: 'absolute', left: -312 + '%'}} onClick={() => {navigate('/analysis')}}>Analysis</li>

                    </ul>
                    {isDropDown && (
                            <div className="dropdown-content" onMouseEnter={() => {setIsDropDown(true)}} onMouseLeave={() => {setIsDropDown(false)}}>
                                <button onClick={() => {
                                    localStorage.clear();
                                    location.reload();
                                }}>Logout</button>
                            </div>
                        )}
                </div>
                : 
                <div className="navbar">
                    

                    <h2 className="navbar-title">OPEN WALLET</h2>
                    <ul>
                        <li onClick={() => setIsClicked(true)}>Home</li>
                        <li onClick={() => setIsClicked(true)}>Send Money</li>
                        <li onClick={() => setIsClicked(true)}>Account Details</li>
                        <li onClick={() => setIsClicked(true)}>Transactions</li>
                        <li onClick={() => setIsClicked(true)}>Analysis</li>
                    </ul>
                    <ul>
                        <span></span>
                        <li onClick={() => {navigate('/user_login')}}>LogIn</li>
                        <span></span>
                        <li onClick={() => {navigate('/user_signup')}}>SignUp</li>
                    </ul>
                    <span>

                    </span>
                </div>
            }
        </>
    )
}

NavBar.prototype = {
    isSigndUp: PropTypes.bool,
    setIsSignedUp: PropTypes.func,

}
export default NavBar