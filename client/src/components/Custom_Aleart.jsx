import React from "react";
import '../css files/custom_aleart.css';
import { useNavigate } from 'react-router-dom';


const CustomAleart = ({msg,pos,setIsClicked}) => {
    const navigate = useNavigate();


    // const aleart = ({msg}) => {
        return(
            <div className="custom-aleart" style={{top: pos + "%"}}>
                {/* <p>User Created Successfully...</p> */}
                <p>{msg}</p>
                <button onClick={() => {navigate('/'); setIsClicked(false)}}>Ok</button>
            </div>
        )
    // }
    
}
export default CustomAleart