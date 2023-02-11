import React from 'react'
import NavBar from './NavBar'

export default function Signin() {
  return (
    <><NavBar/>
     <div className="sign">
     <form>
  <div className="group">
    <input type="text" placeholder='Name'/>
    <label>Name</label>
  </div>
  <div className="group">
    <input type="email" placeholder='Email'/>
    <label>Email</label>
  </div>
  <button type="button" className="button buttonBlue">Subscribe</button>
</form>
     </div>
    </>
  )
}
