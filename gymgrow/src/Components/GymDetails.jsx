import React, { useState } from 'react'

export default function GymDetails() {

    const [gymdetails,setgymDetails] = useState({
        mmorningOpening:"", morningClosing:"", eveningOpening:"", eveningClosing:"", gymAddress:"", descreption:"" 
    })
    const handleGymDetail = (e) => {
        e.preventDefault();
        let name = e.target.name;
        let value = e.target.value;

        setgymDetails({...gymdetails,[name]:value})
    }

    const gymDetailsPost =async (e) =>{

        e.preventDefault();

        const { morningOpening, morningClosing, eveningOpening, eveningClosing, gymAddress, descreption } = gymdetails;
        const res = await fetch("/addgymDetails", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                morningOpening, morningClosing, eveningOpening, eveningClosing, gymAddress, descreption
            })
        });

        await res.json();
        if (res.status === 422) {
            alert("Fill all the fields")
        }
        else if (res.status === 201) {
            alert("Added Successfully")
        }
        else{
            alert("Something went wrong")
        }
    }
    return (
        <>
            <div className="sign">
            <h1>Add Gym Details</h1>
                <form method='POST'>
                    <div className="time">
                        <label htmlFor="">Morning Time</label>
                        <input type="time" name="morningOpening" value={gymdetails.morningOpening} onChange={handleGymDetail} />
                        <input type="time" name="morningClosing" value={gymdetails.morningClosing} onChange={handleGymDetail} />
                    </div>
                    <div className="time">
                        <label htmlFor="">Evening Time</label>
                        <input type="time" name="eveningOpening" value={gymdetails.eveningOpening} onChange={handleGymDetail} />
                        <input type="time" name="eveningClosing" value={gymdetails.eveningClosing} onChange={handleGymDetail} />
                    </div>
                    <div className="time">
                        <label htmlFor="">Gym Add.</label>
                        <input type="text" name='gymAddress' placeholder='GYM Address' value={gymdetails.gymAddress} onChange={handleGymDetail} />
                    </div>
                    <textarea name="descreption" value={gymdetails.descreption} onChange={handleGymDetail} cols="65" rows="8" placeholder='Enter About Gym'></textarea>
                    <button onClick={gymDetailsPost}>Add Details</button>
                </form>
            </div>
        </>
    )
}
