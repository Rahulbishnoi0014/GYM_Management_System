import React, { useState } from 'react'
import { useEffect } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import NavBar3 from './NavBar3'
import "../CSS/memberhome.css"
export default function MemberHome() {
  const navigate = useNavigate()
  const [memberHomeData, setmemberHomeData] = useState("")
  const callMemberData = async () => {
    try {
      const res = await fetch("/memberHome", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        credentials: "include"
      });
      const data = await res.json();
      console.log(data);
      setmemberHomeData(data)
      // console.log(memberHomeData);

    } catch (error) {
      console.log(error);
      navigate("/memberlogin")
    }

  }
  useEffect(() => {
    callMemberData();
    // eslint-disable-next-line
  }, [])
  return (
    <>
      <NavBar3 gymname={memberHomeData.gymname} />
      <div className="memberhome">
        <h1>{memberHomeData.name}</h1>
      </div>
    </>
  )
}
