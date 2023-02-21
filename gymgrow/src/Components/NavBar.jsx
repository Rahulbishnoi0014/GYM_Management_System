import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import "../CSS/Nav.css"
import * as Icon from "react-bootstrap-icons"
export default function NavBar(props) {

  const [isopen, setisOpen] = useState(false)
  const toggle = () => {
    setisOpen((e) => !e)
  }
  return (
    <>
      {/* <div className="nav">
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
    </div> */}


      <nav className={isopen ? "open" : ""}>
        <div className="logo">
          {/* <i className="bx bx-menu menu-icon" onClick={toggle}></i> */}
          <Icon.List className="menu-icon" onClick={toggle} />
          <span className="logo-name">{props.gymname}</span>
        </div>
        <div className="sidebar">
          <div className="logo" style={{ marginLeft: "40px" }}>
            <span className="logo-name">{props.gymname}</span>
            <Icon.XCircle className="menu-icon" onClick={toggle} />
          </div>

          <div className="sidebar-content">
            <ul className="lists">
              <li className="list">
                <NavLink to="/signup" className="nav-link">
                  <Icon.PersonFillAdd className='icon' />
                  <span className="link">Signup</span>
                </NavLink>
              </li>
              <li className="list">
                <NavLink to="/" className="nav-link">
                  <Icon.PersonFillCheck className="icon" />
                  <span className="link">Owner Login</span>
                </NavLink>
              </li>
              <li className="list">
                <NavLink to="/memberlogin" className="nav-link">
                  {/* <i className="bx bx-bell icon"></i> */}
                  <Icon.PeopleFill />
                  <span className="link">Member Login</span>
                </NavLink>
              </li>
            </ul>

            {/* <div className="bottom-cotent">
              <li className="list">
                <NavLink to="/logout" className="nav-link">
                  <i className="bx bx-log-out icon"></i>
                  <span className="link">Logout</span>
                </NavLink>
              </li>
            </div> */}
          </div>
        </div>
      </nav>
      <section className="overlay" onClick={() => setisOpen((e) => !e)}></section>

    </>
  )
}
