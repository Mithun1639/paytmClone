import React from "react";
import NavBar from "./NavBar";
import Total_Balance from "./Total_Balance";
import '../css files/transactions.css'
import { useState } from "react";
import { useEffect } from "react";

const Transcations_Page = ({bal}) => {

    
    const [user,setUser] = useState([]);
    const [currentUserId, setCurrentUserId] = useState("")
    
    const fetchUser = async () => {
        try{

            const ressponse = await fetch('http://localhost:3000/account/transactions',{
                method: 'GET',
                headers:{
                    "auth-token":localStorage.getItem('jsonwebtoken')
                }  
            })
            const data = await ressponse.json();
            console.log(data);
    
            const all_Transactions = data.map(d => ({
                id: d._id,
                name: d.receiver.name,
                amount:d.amount,
                receiver_id: d.receiver._id,
                sender_id: d.sender._id,
                date: d.date
            
            }))
            all_Transactions.forEach(d => {
                console.log(d.id)

            })
            setUser(all_Transactions)
                
        }catch(e)
        {
            console.log(e);
        }

    }
    useEffect(() => {
        fetchUser();
        featchUserId();
    },[])


    const featchUserId = async() => {
        try{

            const res = await fetch("http://localhost:3000/user/getUser",{
                method: 'GET',
                headers: {
                    "auth-token": localStorage.getItem('jsonwebtoken')
                }
            })
            const dataa = await res.json()
            setCurrentUserId(dataa._id)
        }catch(e)
        {
            console.log(e)
        }

    }


   
    return(
        <>
            <div className="trans-navbar">
                <NavBar />
            </div>
            <div className="trans-total-bal">
                <Total_Balance bal={bal}/>
            </div>
            <div className="trans-main-section">
                <ul className="trans-titles">
                    <li>Date</li>
                    <li>Name</li>
                    <li>Amount</li>
                </ul>
                <ul>
                    {user.map(u => {
                        console.log(localStorage.getItem('jsonwebtoken'))
                    return(
                            <span key={u.id}>
                                <li>{u.date}</li>
                                <li>{u.name}</li>
                                <li style={{color: currentUserId == u.sender_id ? "red" : "#3FFF00"}}>{u.amount}</li>
                            </span> 

                        )
                    })}
                    
                </ul>
            </div>
        </>
    )
}
export default Transcations_Page