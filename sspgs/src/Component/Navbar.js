import React from 'react'

import {Link,useNavigate} from "react-router-dom"
import './Navbar.css'; 

function Navbar() {
  const navigate=useNavigate()
  const rendering=()=>{
    navigate("/")
  }
  return (
    <nav className='navbar'>
        <div className='navbar-logo'  onClick={rendering}>SSPGS</div>
        <ul className='navbar-links'>
            <li><Link to="/" >Home</Link></li>
            <li><Link to="/member" >Member</Link></li>
            <li><Link to="/calender">Calender</Link></li>    
            <li><Link to="/login" >Login</Link></li>
            <li><Link to="/register">Register</Link></li>    
        </ul>
    </nav>
  )
}

export default Navbar