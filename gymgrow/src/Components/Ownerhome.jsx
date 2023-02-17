import React, { useEffect, useState } from 'react'
import NavBar2 from './NavBar2'
import { useNavigate } from "react-router-dom"
import "../CSS/ownerhome.css"
export default function Ownerhome() {
  const navigate = useNavigate();

  const [ownerData, setOwnerData] = useState("")
  const [updateOwner, setUpdateOwner] = useState({
    name: ownerData.name, phone: "", gymname: ""
  })

  const callOwnerInfo = async (e) => {
    try {
      console.log("hii");
      const res = await fetch("/ownerhome", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        credentials: "include"
      });
      // console.log("JS i rfdsnb");
      const data = await res.json();
      setOwnerData(data)

    } catch (error) {
      console.log(error);
      navigate("/")
    }
  }
  useEffect(() => {
    callOwnerInfo();
    // eslint-disable-next-line
  }, [])



  const ownerUpdate = (e) => {
    e.preventDefault();
    var name = e.target.name;
    var value = e.target.value;
    setUpdateOwner({ ...updateOwner, [name]: value });
  }

  const sendUpdate = async (e) => {
    e.preventDefault()
    const { name, phone, gymname } = updateOwner

    // if (name === "") {
    //   this.name = ownerData
    // }
    // if (phone === "") {
    //   let phone = ownerData
    // }
    // if (gymname === "") {
    //   this.gymname = ownerData
    // }


    const res = await fetch("/updateOwner", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name, phone, gymname
      })
    })

    await res.json();
    if (res.status === 422) {
      alert("PLZ Fill all the fields")
    }
    else if (res.status === 200) {
      alert("Update Data Success")
    }
    else {
      alert("Update Failed")
    }
  }


  const deleteAccount = async () => {
    if (window.confirm("Are You sure to delete your account") === true) {

      try {
        const res = await fetch("/deleteOwner", {
          method: "DELETE"
        })

        if (res.status === 200) {
          alert("Account Deleted Successfully")
          navigate("/")
        }
        else {
          alert("User Not Deleted")
        }
      } catch (error) {
        console.log(error);
      }

    }
  }
  return (
    <>
      <NavBar2 gymname={ownerData.gymname}/>
      <div className="ownerhome">
        <div className="ownerinfo">
          <h1>Name:- {ownerData.name}</h1>
          <h1>email:- {ownerData.email}</h1>
          <h1>phone:- {ownerData.phone}</h1>
          <h1>gymname:- {ownerData.gymname}</h1>
          <button onClick={deleteAccount}>Delete Account</button>
        </div>


        <div className="formx sign">
          <form method='PATCH'>
            <label htmlFor="name">Name</label>
            <input type="text" name='name' defaultValue={ownerData.name} onChange={ownerUpdate} />
            <label htmlFor="phone">Phone</label>
            <input type="number" name='phone' defaultValue={ownerData.phone} onChange={ownerUpdate} />
            <label htmlFor="gymname">Gym Name</label>
            <input type="text" name='gymname' defaultValue={ownerData.gymname} onChange={ownerUpdate} />
            <button type='submit' onClick={sendUpdate}>Update</button>
          </form>
        </div>
      </div>
    </>
  )
}
