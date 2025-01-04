import React from "react";
import NavBar from "./NavBar";
import "../css files/send_money.css";
import { useState } from "react";
import CustomAleart from "./Custom_Aleart";

const Send_Money = () => {
    
    const [ph,setPh] = useState("")
    const [msg,setMsg] = useState("")
    const [amt, setAmt] = useState("")
    const [pin, setPin] = useState("")
    const [haveVal,setHaveVal] = useState(false)
    const [btnClicked, setBtnClicked] = useState(false)
    
    const ctg = [
        {value: "food", label: "Food"},
        {value: "travel", label: "Travel"},
        {value: "clothes", label: "Clothes"},
        {value: "medicines", label: "Medicines"},
        {value: "others", label: "Others"}];

    const handleSubmit =async(e)=>{
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:3000/account/transfer",{
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token":localStorage.getItem('jsonwebtoken')
                },
                body:JSON.stringify({amount:amt,to:ph,pin:pin, category:msg})
            })
            const data = await response.json();
            if(data){
                if(data.message == 'Invalid pin'){
                    alert(data.message);
                }
                else{

                    alert("Amount Sent....");
                }
                // console.log(data)
            }
        } catch (error) {
            alert("Error: ",error);
        }
    }

    const featchUserPin = async() => {
        try{

            const res = await fetch("http://localhost:3000/user/getuser",{
                method: 'GET',
                headers: {
                    'auth-token': localStorage.getItem('jsonwebtoken')
                }
            })

            const dataa = res.json()
            const user_pin = dataa.pin
            
        }catch(e)
        {
            console.log(e);
        }

    }

    const filedEmpty = (ph,amt,pin) => {
        if(ph != "" && amt != "" && pin != "")
        {
            setHaveVal(true)
            setBtnClicked(false)
        }
        else
        {
            setHaveVal(false);
            setBtnClicked(false)
        }
        
    }
    return(
        <>
            <div className="send-money-navbar">
                <NavBar />
            </div>
            <div>
                {btnClicked? 
                    haveVal ? <CustomAleart pos={"16"} msg={"Amount Sent...."}  /> : <CustomAleart pos={"16"} msg={"Error: Fill all the details first."} />

                                :
                    <></>
                }
                        
            </div>
            <div className="send-money-main">
                <h2 className="send-money-title">SEND MONEY</h2>
                <p>Send To:</p>
                <input type="tel" name="phone_no" value={ph} placeholder="Recivers Phone No." onChange={(e) => {setPh(e.target.value)}}/>
                <input type="number" name="amt" value={amt} placeholder="Amount" onChange={(e) => {setAmt(e.target.value)}}/>
                <input type="password" name="pin" value={pin} placeholder="Enter Your Pin" onChange={(e) => {setPin(e.target.value)}}/>
                <select value={""} onChange={(e) => {setMsg(e.target.value)}}>
                    {ctg.map((group) => (
                        <option key={group.value} value={group.value}>
                            {group.label}
                        </option>
                    ))}
                </select>
               
                <button className="send-money-btn" onClick={handleSubmit}>Send</button>
            </div>

        </>
    )
}

export default Send_Money