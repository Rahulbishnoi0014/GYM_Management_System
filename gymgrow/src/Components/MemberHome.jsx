import React, { useState } from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import NavBar3 from './NavBar3'
import "../CSS/memberhome.css"
import "../CSS/ownerhome.css"
import LoadingBar from 'react-top-loading-bar'
export default function MemberHome() {
  const navigate = useNavigate()
  const [memberHomeData, setmemberHomeData] = useState("")
  const [progress, setProgress] = useState(0)
  const callMemberData = async () => {
    try {
      setProgress(30)
      const res = await fetch("/memberHome", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        credentials: "include"
      });
      setProgress(60)
      const data = await res.json();
      console.log(data);
      setProgress(100)
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
      <LoadingBar
        color="linear-gradient(to right, #ff3300 0%, #000099 100%)"
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
      <NavBar3 gymname={memberHomeData.userName} />
      <div className="memberhome">
        <h3>Dashboard</h3>
        <div className="dashboard">
          <div className="dash_right">
            <div className="top-bar">
              <p>Welcome  <span>TO</span>  <span style={{ color: "red" }}>{memberHomeData.gymname}</span> </p>
              <p>See YOUR ALL DETAILS HERE</p>
            </div>
            <div className="dash-right-bottom">
              <div className="time">
                <h3><span>Name:- </span>{memberHomeData.name}</h3>
                <h3><span>Phone:- </span>{memberHomeData.phone}</h3>
                <h3><span>UserName:- </span>{memberHomeData.userName}</h3>
                <h3><span>Dite:-</span>{memberHomeData.dite}</h3>
              </div>
            </div>
          </div>
          <div className="dash_left">

            <h3><span>Morning Time:-</span>Specify Here -to- specify here   </h3>
            <h3><span>Evening Time:-</span>Specify Here -to- specify here   </h3>
            <h3><span>Address:- </span>Address</h3>
            <h3><span>Descreption:- </span>Lorem ipsum dolor, sit amet </h3>
          </div>
        </div>
      </div>
    </>
  )
}
