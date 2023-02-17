import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import * as Icon from "react-bootstrap-icons"
export default function NavBar2(props) {
    const [isopen, setisOpen] = useState(false)
    const toggle = () => {
        setisOpen((e) => !e)
    }
    return (
        <>
            {/* <div className="nav">
            <nav>
                <ul>
                    <li>{props.gymname}</li>
                </ul>
                <ul>
                <li><NavLink to="/ownerhome">Home</NavLink></li>
                    <li><NavLink to="/addmember">Add Member</NavLink></li>
                    <li><NavLink to="/memberdetails">Member Details</NavLink></li>
                    <li><NavLink to="/gymdetails">GYM Details</NavLink></li>
                    <li><NavLink to="/logout">Logout</NavLink></li>
                </ul>
            </nav>
        </div> */}

            <nav className={isopen ? "open" : ""}>
                <div className="logo">
                    <Icon.List className="menu-icon" onClick={toggle} />
                    <span className="logo-name">{props.gymname}</span>
                </div>
                <div className="sidebar">
                    <div className="logo">
                        <span className="logo-name">{props.gymname}</span>
                        <Icon.XCircle className="menu-icon" onClick={toggle} />
                    </div>

                    <div className="sidebar-content">
                        <ul className="lists">
                            <li className="list">
                                <NavLink to="/ownerhome" className="nav-link">
                                    <i className="bx bx-home-alt icon"></i>
                                    <span className="link">Home</span>
                                </NavLink>
                            </li>
                            <li className="list">
                                <NavLink to="/addmember" className="nav-link">
                                    <Icon.PersonAdd className='icon' />
                                    <span className="link">Add Members</span>
                                </NavLink>
                            </li>
                            <li className="list">
                                <NavLink to="/memberdetails" className="nav-link">
                                    <Icon.People className='icon' />
                                    <span className="link">Member Details</span>
                                </NavLink>
                            </li>
                            <li className="list">
                                <NavLink to="/gymdetails" className="nav-link">
                                    <Icon.TicketDetailed className='icon' />
                                    <span className="link">Gym Details</span>
                                </NavLink>
                            </li>
                        </ul>

                        <div className="bottom-cotent">
                            <li className="list">
                                <NavLink to="/logout" className="nav-link">
                                    <i className="bx bx-log-out icon"></i>
                                    <span className="link">Logout</span>
                                </NavLink>
                            </li>
                        </div>
                    </div>
                </div>
            </nav>
            <section className="overlay" onClick={() => setisOpen((e) => !e)}></section>

        </>
    )
}
