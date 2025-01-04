import './App.css'
import Home from './components/Home'
import Transactions_Page from './components/Transcations'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import User_Login from './components/User_Login'
import User_Signup from './components/User_Signup'
import Account_Details from './components/Account_Details'
import Send_Money from './components/Send_Money'
import { useEffect } from 'react';
import { useState } from 'react';
import Analysis from './components/Analysis'


function App() {
  const [balance,setBalance] = useState("")
  const featchBal = async() => {
    try{
      const responsee = await fetch('http://localhost:3000/account/balance',{
        method:'GET',
        headers:{
                    "auth-token":localStorage.getItem('jsonwebtoken')
                }
    })

    const data = await responsee.json();
    const bal = data.balance;
    setBalance(bal);
    }
    catch(e)
    {
      console.log(e);
    }

  } 
  useEffect(() => {featchBal()},[]);

  return (
    <>
    <Router>
      <Routes>
        <Route path={'/'} element={<Home />}/>
        <Route path={'/transactions'} element={<Transactions_Page bal={balance}/>}/>
        <Route path={'/user_login'} element={<User_Login/>}/>
        <Route path={'/user_signup'} element={<User_Signup/>}/>
        <Route path={'/account_details'} element={<Account_Details bal={balance}/>}/>
        <Route path={'/send_money'} element={<Send_Money />}/>
        <Route path={'/analysis'} element={<Analysis />} />

      </Routes>
    </Router>
      {/* <Home /> */}
    </>
  )
}

export default App
