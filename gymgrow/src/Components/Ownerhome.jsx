import React, { useEffect, useState } from 'react'
import NavBar2 from './NavBar2'
import { useNavigate } from "react-router-dom"
import "../CSS/ownerhome.css"
import * as Icon from "react-bootstrap-icons"
import LoadingBar from 'react-top-loading-bar'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function Ownerhome() {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0)

  const [ownerData, setOwnerData] = useState({
    allData: "", totalMember: "", gymdetail: ""
  })


  const [updateOwner, setUpdateOwner] = useState({
    name: ownerData.name, phone: "", gymname: ""
  })

  // const [ll, setll] = useState(true)

  const [ren, setrun] = useState(false)


  const callOwnerInfo = async (e) => {
    try {
      console.log("hii");
      setProgress(30)
      const res = await fetch("/ownerhome", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        credentials: "include"
      });
      // console.log("JS i rfdsnb");
      setProgress(50)
      const data = await res.json();
      const dat2 = data.newmembers.length
      setProgress(70)
      setOwnerData({ allData: data, totalMember: dat2, gymdetail: data.gymDetails[0] })
      setProgress(100)


    } catch (error) {
      console.log(error);
      navigate("/")
    }
  }
  useEffect(() => {
    callOwnerInfo();
    // eslint-disable-next-line
  }, [ren])



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
    else if (res.status === 200) {
      setrun((e) => !e)
      toast.success('Your Details Updated Successfully', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });


      // setll(true)
      // if (ll) return 
      // setTimeout(() => {
      //   : "/ownerhome"
      // }, 10);

      setDisplayContent(true)
      setDisplayFrom(false)
      setdisplaygymupdatefrom(false)


      // eslint-disable-next-line
    }
    else {
      toast.warn('Update Failed / Something Went Wrong', {
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



  const [updategymdetails, setupdategymDetails] = useState({
    morningOpening: "", morningClosing: "", eveningOpening: "", eveningClosing: "", gymAddress: "", descreption: ""
  })


  const handleupdateGymDetail = (e) => {
    e.preventDefault();
    let name = e.target.name;
    let value = e.target.value

    setupdategymDetails({ ...updategymdetails, [name]: value })
  }

  const gymDetailsUpdatePost = async (e) => {
    e.preventDefault();
    const { morningOpening, morningClosing, eveningOpening, eveningClosing, gymAddress, descreption } = updategymdetails


    const res = await fetch("/updategymDetails", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        morningOpening, morningClosing, eveningOpening, eveningClosing, gymAddress, descreption
      })
    })
    await res.json();

    if (res.status === 404) {
      toast.error('Something Went Wrong', {
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
    else if (res.status === 422) {
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
    else if (res.status === 200) {
      setrun((e) => !e)
      toast.success('Update Success', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });


      setDisplayContent(true)
      setDisplayFrom(false)
      setdisplaygymupdatefrom(false)
    }
  }



  const deleteAccount = async () => {
    if (window.confirm("Are You sure to delete your account") === true) {

      try {
        const res = await fetch("/deleteOwner", {
          method: "DELETE"
        })

        if (res.status === 200) {
          toast.success('Delete Success', {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
          navigate("/")
        }
        else {
          toast.warn('Delete Failed / Something Went Wrong', {
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
      } catch (error) {
        console.log(error);
      }

    }
  }


  const [dislayContent, setDisplayContent] = useState(true)
  const [displayForm, setDisplayFrom] = useState(false)
  const [displaygymupdatefrom, setdisplaygymupdatefrom] = useState(false)

  const displayownerfrom = () => {
    setDisplayFrom(true)
    setDisplayContent(false)
    setdisplaygymupdatefrom(false)
  }

  const displaygymdetailfrom = () => {
    setDisplayFrom(false)
    setDisplayContent(false)
    setdisplaygymupdatefrom(true)
  }
  const reset = () => {
    setDisplayContent(true)
    setDisplayFrom(false)
    setdisplaygymupdatefrom(false)
  }
  return (
    <>
      <LoadingBar
        color='red'
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
      <NavBar2 gymname={ownerData.allData.gymname} />
      <div className="ownerhome">
        <h3>Dashboard</h3>
        <div className="dashboard">
          <div className="dash_right">
            <div className="top-bar">
              <p>Welcome  <span>{ownerData.allData.__v === 2 ?  "To the Gym Grow app"  : "Backk"}</span>  <span style={{ color: "red" }}>'{ownerData.allData.name}'</span> </p>
              <p>Manage your GYM on the go.</p>
            </div>
            <div className="dash-right-bottom" style={dislayContent === true ? { display: "block" } : { display: "none" }}>
              <div className="time">
                <h2>Morning:- {ownerData.gymdetail.morningOpening} - {ownerData.gymdetail.morningClosing}</h2>
                <h2>evening:- {ownerData.gymdetail.eveningOpening} - {ownerData.gymdetail.eveningClosing}</h2>
              </div>
              <h2>Address:- {ownerData.gymdetail.gymAddress} </h2>
              <h2>Descreption:- {ownerData.gymdetail.descreption}</h2>
              <div className="buttons">
                <button onClick={displaygymdetailfrom}>Edit Gym Details</button>
              </div>
            </div>
          </div>
          <div className="dash_left" style={dislayContent === true ? { display: "block" } : { display: "none" }}>
            <h3><span>Email:- </span>{ownerData.allData.email}</h3>
            <h3><span>Phone:- </span>{ownerData.allData.phone}</h3>
            <h4 style={{ textTransform: "uppercase" }}><span>GYMNAME:- </span>{ownerData.allData.gymname}</h4>
            <h2>Total Member :-<span style={{ color: "red" }}> {ownerData.totalMember}</span></h2>
            <div className="buttons">
              <button onClick={displayownerfrom}>Update ME</button>
              <button onClick={deleteAccount} id="delete">Delete ME</button>
            </div>
          </div>
        </div>


        <div className="formx sign" style={displayForm === false ? { display: "none" } : { display: "flex" }}>
          <form method='PATCH'>
            <Icon.XLg style={{ margin: "auto", fontSize: "30px" }} onClick={reset} />
            <label htmlFor="name">Name</label>
            <input type="text" name='name' defaultValue={ownerData.name} onChange={ownerUpdate} />
            <label htmlFor="phone">Phone</label>
            <input type="number" name='phone' defaultValue={ownerData.phone} onChange={ownerUpdate} />
            <label htmlFor="gymname">Gym Name</label>
            <input type="text" name='gymname' defaultValue={ownerData.gymname} onChange={ownerUpdate} />
            <button type='submit' onClick={sendUpdate}>Update</button>
          </form>
        </div>


        <div className="updateGymDetails" style={displaygymupdatefrom === false ? { display: "none" } : { display: "block" }}>
          <div className="sign">
            <h2>Update Details</h2>
            <form method='PATCH'>
              <Icon.XLg style={{ margin: "auto", fontSize: "30px" }} onClick={reset} />
              <div className="time">
                <label htmlFor="">Morning Time</label>
                <input type="time" name="morningOpening" value={updategymdetails.morningOpening} onChange={handleupdateGymDetail} />
                <input type="time" name="morningClosing" value={updategymdetails.morningClosing} onChange={handleupdateGymDetail} />
              </div>
              <div className="time">
                <label htmlFor="">Evening Time</label>
                <input type="time" name="eveningOpening" value={updategymdetails.eveningOpening} onChange={handleupdateGymDetail} />
                <input type="time" name="eveningClosing" value={updategymdetails.eveningClosing} onChange={handleupdateGymDetail} />
              </div>
              <div className="time">
                <label htmlFor="">Gym Add.</label>
                <input type="text" name='gymAddress' placeholder='GYM Address' value={updategymdetails.gymAddress} onChange={handleupdateGymDetail} />
              </div>
              <textarea name="descreption" value={updategymdetails.descreption} onChange={handleupdateGymDetail} cols="5" rows="4" placeholder='Enter About Gym'></textarea>
              <button onClick={gymDetailsUpdatePost}>Add Details</button>
            </form>
          </div>
        </div>
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
        navigate={"/ownerehome"}
      />
    </>
  )
}
