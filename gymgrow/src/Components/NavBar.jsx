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
            <li><NavLink to="/">Signup</NavLink></li>
            <li><NavLink to="/signin">Signin</NavLink></li>
        </ul>
     </nav> 
    </>
  )
}
