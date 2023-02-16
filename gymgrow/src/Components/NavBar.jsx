import React from 'react'
import { NavLink } from 'react-router-dom'
import "../CSS/Nav.css"
export default function NavBar() {
  return (
    <>
     <nav>
     <ul>
        <li>GYMSTER</li>
     </ul>
        <ul>
            <li><NavLink to="/signup">Signup</NavLink></li>
            <li><NavLink to="/">Signin</NavLink></li>
            <li><NavLink to="/memberlogin">Member Login</NavLink></li>
        </ul>
     </nav> 
    </>
  )
}
