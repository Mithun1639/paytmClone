import React, { useEffect, useState } from "react";
import NavBar from "./NavBar";
import '../css files/account_details.css'
const Account_Details = ({bal}) => {
    const [user,setUser] = useState({})
    const fetchdata = async() =>{  
        try{
            const reesponse = await fetch('http://localhost:3000/user/getuser',{
                method:'GET',
                headers:{
                    "auth-token":localStorage.getItem('jsonwebtoken')
                }
            })
            const data = await reesponse.json();
            
            setUser(data);
            
        }
        catch(err){
            console.log(err)
        }

    }
    useEffect(()=>{fetchdata()},[])
    return(
        <>
            <div className="account-details-navbar">
                <NavBar />
            </div>
            <div className="account-details-main">
                <div className="account-details-logo"></div>
                <div className="account-info-label">
                    <p>Name:</p>
                    <p>Email:</p>
                    <p>Phone Number:</p>
                    <p>Balance:</p>
                    <p>Account Type:</p>
                </div>
                <div className="account-info-details">
                    <p>{user.name}</p>
                    <p>{user.email}</p>
                    <p>{user.mobilenumber}</p>
                    <p>{bal}</p>
                    <p>Saving A/C</p>
                </div>

            </div>
        </>
    )
}

export default Account_Details