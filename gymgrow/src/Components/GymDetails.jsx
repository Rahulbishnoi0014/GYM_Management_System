import React, { useEffect, useState } from 'react'
import NavBar2 from './NavBar2'
import { useNavigate } from 'react-router-dom'
import "../CSS/gymdetails.css"
export default function GymDetails() {
    const navigate = useNavigate();
    const [gymDetailDisplay, setGymDetailsDisplay] = useState("")

    const [ownerData,setOwnerData] = useState("")

    const callGymDetails = async (e) => {
        try {
            const res = await fetch("/ownerhome", {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                credentials: "include"
            });
            const data = await res.json();
            setOwnerData(data)
            setGymDetailsDisplay(data.gymDetails[0])

        } catch (error) {
            console.log(error);
            navigate("/")
        }
    }
    useEffect(() => {
        callGymDetails();
        // eslint-disable-next-line
    }, [])

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
            alert("Update Not SuccessFull")
        }
        else if(res.status === 200){
            alert("Update Success")
        }
    }

    return (
        <>
            <NavBar2 gymname={ownerData.gymname}/>
            <div className="gymDetails">
                <h2>Morning:-  {gymDetailDisplay.morningOpening} to {gymDetailDisplay.morningClosing}</h2>
                <h2>Evening:-  {gymDetailDisplay.eveningOpening} to {gymDetailDisplay.eveningClosing}</h2>
                <h2>Address:- {gymDetailDisplay.gymAddress}</h2>
                <h2>Descreption:- {gymDetailDisplay.descreption}</h2>
            </div>

            <div className="updateGymDetails">
                <div className="sign">
                    <h2>Update Details</h2>
                    <form method='PATCH'>
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
                        <textarea name="descreption" value={updategymdetails.descreption} onChange={handleupdateGymDetail} cols="65" rows="8" placeholder='Enter About Gym'></textarea>
                        <button onClick={gymDetailsUpdatePost}>Add Details</button>
                    </form>
                </div>
            </div>
        </>
    )
}
