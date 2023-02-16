import React from 'react'
import { NavLink } from 'react-router-dom'

export default function NavBar2(props) {
    return (
        <>
            <nav>
                <ul>
                    <li>{props.gymname}</li>
                </ul>
                <ul>
                <li><NavLink to="/ownerhome">Home</NavLink></li>
                    <li><NavLink to="/addmember">Add Member</NavLink></li>
                    <li><NavLink to="/memberdetails">Member Details</NavLink></li>
                    <li><NavLink to="/gymdetails">Gym Details</NavLink></li>
                    <li><NavLink to="/logout">Logout</NavLink></li>
                </ul>
            </nav>
        </>
    )
}
