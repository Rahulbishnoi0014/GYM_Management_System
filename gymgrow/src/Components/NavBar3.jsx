import React from 'react'
import { NavLink } from 'react-router-dom'
export default function NavBar3() {
    return (
        <>
        <div className="nav">
            <nav>
                <ul>
                    <li>GYMSTER</li>
                </ul>
                <ul>
                    <li><NavLink to="/logout">Logout</NavLink></li>
                </ul>
            </nav>
        </div>
        </>
    )
}
