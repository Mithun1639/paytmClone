import React from "react";
import NavBar from "./NavBar";
import "../css files/user_signup.css";
import { useState } from "react";
import { MdPassword } from "react-icons/md";
import CustomAleart from "./Custom_Aleart";
const User_Signup = () => {

    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [phone,setPhone] = useState('');
    const [pin,setPin] = useState('');
    const [pass, setPass] = useState('');
    const [confirm_pass, setConfirmPass] = useState('');
    const [alertmsg,setAlertMsg] = useState('');
    
    


    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const response = await fetch("http://localhost:3000/user/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ name,email , password: pass, mobilenumber:phone,pin:pin })
            })
                
                const data = await response.json();
                if(data.error){
                    console.error("cannot create user:", data)
                }else{
                    const token = data.token
                    localStorage.setItem('jsonwebtoken',token)
                    console.log("User Created Sucessfully...", data);
                    setAlertMsg("User Created Succesfully");
                    
                }
                
                

        } catch (error) {
            console.error("Error Creating User:", error);
        }
    };

    return(
        <>
            <div className="user-signup-navbar">
                <NavBar />
            </div>
            <div>
                {alertmsg && <CustomAleart msg={"User Created Succesfully"} />}

            </div>
            <div className="user-signup-outer-div">
                
                <h2 className="user-signup-title">User Signup</h2>

                <label htmlFor="user-name">Name:</label>
                <input type="text" id="user-name" value={name} onChange={(e) => {setName(e.target.value)}}/>

                <label htmlFor="user-email">Email:</label>
                <input type="text" id="user-email" value={email} onChange={(e) => {setEmail(e.target.value)}}/>

                <label htmlFor="user-phone-no">Phone No:</label>
                <input type="text" id="user-phone-no" value={phone} onChange={(e) => {setPhone(e.target.value)}}/>

                <label htmlFor="user-pin">Security Pin:</label>
                <input type="text" id="user-pin" value={pin} onChange={(e) => {setPin(e.target.value)}}/>

                <label htmlFor="user-pass">Password:</label>
                <input type="password" id="user-pass" value={pass} onChange={(e) => {setPass(e.target.value)}}/>

                <label htmlFor="user-conform-pass">Conform Password:</label>
                <input type="password" id="user-conform-pass" value={conform_pass} onChange={(e) => {setConformPass(e.target.value)}}/>

                


                <button className="user-signup-btn" onClick={handleSubmit}>Create User</button>
            </div>
        </>
    )

}

export default User_Signup