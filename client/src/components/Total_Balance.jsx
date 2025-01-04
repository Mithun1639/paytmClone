// import React from "react";
// import { useState } from "react";
// import "../css files/total_balance.css"
// import { useEffect } from "react";
// const Total_Balance = ({bal}) => {
    
// useEffect(() => {},[bal])
//     // const [totalBal,setTotalBal] = useState("");
//     return(
//         <>
//             <div className="total-bal-div">
//                 <p>TOTAL AVAILABLE: </p>
//                 <p>{bal}</p>
//             </div>
//         </>
//     )
// }

// export default Total_Balance
import React from "react";
import "../css files/total_balance.css";

const Total_Balance = ({ bal }) => {
  
  return (
    <div className="total-bal-div">
      <p>TOTAL AVAILABLE: </p>
      <p>{bal}</p>
    </div>
  );
}

export default Total_Balance;
