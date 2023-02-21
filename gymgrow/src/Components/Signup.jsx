import React, { useState } from 'react'
import NavBar from './NavBar'
import "../CSS/sign.css"
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import LoadingBar from 'react-top-loading-bar'
export default function Signup() {
  const navigate = useNavigate()
  const [ownerRegister, setownerRegister] = useState({
    name: "", email: "", phone: "", gymname: "", password: ""
  })

  // const [progress, setProgress] = useState(0)

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
      toast.error('Fill All The Fields!', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
    else if (res.status === 201) {
      // setProgress(100);
      navigate("/addgymdetails")
    }
    else {
      toast.warn('Register Failed / or Email is already exist', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  }
  return (
    <>

      {/* <LoadingBar
        color='red'
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      /> */}

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


      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover={false}
        theme="dark"
      />

    </>

  )
}
