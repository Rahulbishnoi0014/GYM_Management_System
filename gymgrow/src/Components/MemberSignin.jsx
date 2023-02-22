import React, { useState } from 'react'
import NavBar from './NavBar'
import { useNavigate } from 'react-router-dom'
export default function MemberSignin() {
    const navigate = useNavigate()
    const [loginData, setLoginData] = useState({
        userName: "", phone: ""
    })


    const memberlogin = (e) => {
        e.preventDefault()
        let name = e.target.name;
        let value = e.target.value;

        setLoginData({ ...loginData, [name]: value })
    }

    const postMemberLogin = async (e) => {
        e.preventDefault();
        const { userName, phone } = loginData

        const res = await fetch("/memberLogin", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                userName, phone
            })
        })

        await res.json();
        if (res.status === 422) {
            alert("Fill the fields")
        }
        else if (res.status === 200) {
            alert("Login Successful")
            navigate('/memberhome')
        }
        else {
            alert("Invalid Credentials")
        }
    }
    return (
        <>
            <NavBar gymname="GYMGROW" />
            <div className="sign from">
                <h1>Member Login</h1>
                <form method="post">
                    <input type="text" name='userName' value={loginData.userName} placeholder='Username' onChange={memberlogin} />
                    <input type="number" name="phone" value={loginData.phone} placeholder='Phone Number' onChange={memberlogin} />
                    <button type="submit" onClick={postMemberLogin}>Login</button>
                </form>
            </div>
        </>
    )
}
