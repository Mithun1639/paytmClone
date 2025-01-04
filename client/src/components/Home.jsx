import React from "react";
import NavBar from "./NavBar";
import "../css files/home.css"
import { MdAccountCircle } from "react-icons/md";
import { IoSend } from "react-icons/io5";
import { GrTransaction } from "react-icons/gr";
import { useNavigate } from 'react-router-dom'
import { useState } from 'react';
import CustomAleart from "./Custom_Aleart";
import { useEffect } from "react";


const Home = () => {

    const navigate = useNavigate();
    const [isClicked,setIsClicked] = useState(false)
    const [isLoggedIn,setIsLoggedIn] = useState(false)
    
    const featchUser = async() => {
        try{

            const res = await fetch("http://localhost:3000/user/getUser",{
                method: 'GET',
                headers: {
                    "auth-token": localStorage.getItem('jsonwebtoken')
                }
            })

            const data = await res.json()
            const name = data.name
            setIsLoggedIn(name)
        }catch(e)
        {
            console.log(e)
        }
    }
    useEffect(() => {featchUser()},[])

    const checkLogin = (login,navigation_link) => {
        if(login)
        {
            navigate(navigation_link);
        }
        else{
            setIsClicked(true)
        }
    }

    return(
        <>
            <div className="home-navbar">
                <NavBar isClicked={isClicked} setIsClicked={setIsClicked}/>
            </div>
            <div>
                {isClicked?
                    <CustomAleart pos={15} msg={"Please Signup/Login to use those features..."} setIsClicked={setIsClicked}/>
                    :
                    <></>
                }
            </div>
            <div className="main-section">
                <h2 className="home-title">CARRY LESS, PAY MORE ...</h2>
                <div className="home-trans-section">
                    <button className="transaction-btn" onClick={() => {{checkLogin(isLoggedIn,'/transactions')}}}><GrTransaction size={30}/></button>
                    <p>Transcations</p>
                </div>
                <div className="home-send-money-section">
                    <button className="send-money-btn" onClick={() => {checkLogin(isLoggedIn,'/send_money')}}><IoSend size={30}/></button>
                    <p>Send Money</p>
                </div>
                <div className="home-acc-details-section">
                    <button className="account-btn" onClick={() => {{checkLogin(isLoggedIn,'/account_details')}}}><MdAccountCircle size={30} /></button>
                    <p>Account Detail</p>
                </div>

            </div>

        </>
    )
}

export default Home