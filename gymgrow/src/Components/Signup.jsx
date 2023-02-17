import React, { useState } from 'react'
import NavBar from './NavBar'
import "../CSS/sign.css"
import { useNavigate } from 'react-router-dom'
export default function Signup() {
  const navigate = useNavigate()
  const [ownerRegister, setownerRegister] = useState({
    name: "", email: "", phone: "", gymname: "", password: ""
  })

  let name, value
  const ownerData = (e) => {
    e.preventDefault();

    name = e.target.name;
    value = e.target.value;
    setownerRegister({ ...ownerRegister, [name]: value });
    // console.log(ownerRegister);
  }

  const register = async (e) => {
    e.preventDefault();
    // console.log("Running");

    const { name, email, phone, gymname, password } = ownerRegister

    const res = await fetch("/ownerRegister", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name, email, phone, gymname, password
      })
    });

    await res.json();

    if (res.status === 422) {
      alert("Fill all the fields")
    }
    else if (res.status === 201) {
      alert("Register SuccessFull")
      navigate("/addgymdetails")
    }
    else {
      alert("Register Failed / or Email is already exist")
    }
  }
  return (
    <>
      <NavBar />
      <div className="sign from">
        <h2>Registeration Form</h2>
        <form method='POST'>
          <input type="text" name='name' value={ownerRegister.name} placeholder='Name' onChange={ownerData} required />
          <input type="email" name='email' value={ownerRegister.email} placeholder='Email' onChange={ownerData} required />
          <input type="number" name='phone' value={ownerRegister.phone} placeholder='Phone' onChange={ownerData} required />
          <input type="text" name='gymname' value={ownerRegister.gymname} placeholder='GYM Name' onChange={ownerData} required />
          <input type="password" name='password' value={ownerRegister.password} placeholder='Password' onChange={ownerData} required />
          <button onClick={register}>Register</button>
        </form>
      </div>
    </>

  )
}
