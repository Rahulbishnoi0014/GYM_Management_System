import React, { useState } from 'react'
import NavBar from './NavBar'
import { useNavigate } from 'react-router-dom';

// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
export default function Signin() {
  const navigate = useNavigate();
  const [ownerLogin, setOwnerLogin] = useState({
    email: "", password: ""
  });

  const login = (e) => {
    e.preventDefault();
    var name = e.target.name;
    var value = e.target.value;
    console.log(value);
    setOwnerLogin({ ...ownerLogin, [name]: value });
  }

  const loginOwner = async (e) => {
    e.preventDefault();
    const { email, password } = ownerLogin;
    const res = await fetch("/ownerlogin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email, password
      })
    })
    await res.json()

    if (res.status === 422) {
      alert("Fill all the fields")
    }
    else if (res.status === 200) {
      navigate("/ownerhome")
      // toast.success('🦄 Wow so easy!', {
      //   position: "top-right",
      //   autoClose: 1000,
      //   hideProgressBar: false,
      //   closeOnClick: false,
      //   pauseOnHover: false,
      //   draggable: true,
      //   progress: undefined,
      //   theme: "dark",
      // });
    }
    else {
      alert("Cresentials not match")

    }
  }
  return (
    <><NavBar />
      <div className="sign from">
        <h1>Owner Login</h1>
        <form method='POST'>
          <input type="email" name='email' value={ownerLogin.email} placeholder='email' onChange={login} />
          <input type="password" name='password' value={ownerLogin.password} placeholder='password' onChange={login} />
          <button type="submit" onClick={loginOwner}>Login</button>
        </form>
      </div>


      {/* <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover={false}
        theme="dark"
      /> */}
    </>
  )
}
