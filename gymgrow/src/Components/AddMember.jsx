import React, { useEffect, useState } from 'react'
import NavBar2 from "./NavBar2"
import "../CSS/addmember.css"
import { useNavigate } from 'react-router-dom'
export default function AddMember() {
    const navigate = useNavigate
    const [addmember, setAddmember] = useState({
        userName: "", name: "", phone: "", address: "", amount: "", dite: ""
    })

    const [ownerAllData, setOwnerAllData] = useState("")
    const [ownergymdetail, setOwnergymdetail] = useState("")


    const callownerAllData = async (e) => {
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
            setOwnerAllData(data)
            setOwnergymdetail(data.gymDetails[0])
            console.log(ownerAllData);

        } catch (error) {
            console.log(error);
            navigate("/")
        }
    }
    useEffect(() => {
        callownerAllData();
        // eslint-disable-next-line
    }, [])


    const [datq, setDat] = useState({ feeDuration: "" });
    const [registerationDate, setregisterDate] = useState({ registerdate: "" })
    const [plane, setplane] = useState({ feeDuration: "" })

    const handleMember = (e) => {
        e.preventDefault();
        let name = e.target.name;
        let value = e.target.value;
        setAddmember({ ...addmember, [name]: value })
    }

    const handleDate = (e) => {
        e.preventDefault();
        const name = e.target.name
        const value = e.target.value
        setregisterDate({ ...registerationDate, [name]: value })
        const q = new Date(registerationDate.registerdate)
        const duration = new Date(q.getFullYear(), q.getMonth() + parseInt(value), q.getDate());
        setplane({ ...plane, [name]: value });
        setDat({ ...datq, [name]: duration })
    }

    const postMember = async (e) => {
        try {
            e.preventDefault();
            const { userName, name, phone, address, amount, dite } = addmember
            const gymname = ownerAllData.gymname
            const { morningOpening, morningClosing, eveningOpening, eveningClosing, gymAddress, descreption, _id } = ownergymdetail

            const { feeDuration } = datq;
            const planeType = plane.feeDuration
            const { registerdate } = registerationDate


            const res = await fetch("/addmember", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    userName, name, phone, address, registerdate, planeType, amount, dite, feeDuration,
                    morningOpening, morningClosing, eveningOpening, eveningClosing, gymAddress, descreption, _id, gymname
                })
            })
            await res.json();
            if (res.status === 422) {
                alert("Fill all the fields")
            }
            else if (res.status === 402) {
                alert("UserName already exist")
            }
            else if (res.status === 200) {
                alert("Costumer Added Successfully")
            }
            else if (res.status === 401) {
                navigate("/")
            }
            else {
                alert("Something went wrong")
            }


        } catch (error) {
            console.log(error);
            navigate("/")
        }
    }

    return (
        <>
            <NavBar2 gymname={ownerAllData.gymname} />
            <div className="addmember">
                <div className="sign">
                    <h1>Add Member</h1>
                    <form method='POST'>
                        <div className="input-line">
                            <input type="text" name='userName' value={addmember.userName} placeholder='UserName' onChange={handleMember} />
                            <input type="text" name='name' value={addmember.name} placeholder='Name' onChange={handleMember} />
                        </div>
                        <div className="input-line">
                            <input type="number" name="phone" value={addmember.phone} placeholder='Phone Number' onChange={handleMember} />
                            <input type="text" name="address" value={addmember.address} placeholder='Address' onChange={handleMember} />
                        </div>
                        <div className="input-line">
                            <input type="date" name='registerdate' value={registerationDate.registerdate} placeholder="Registeratoon date" onChange={handleDate} />
                            <select name="feeDuration" onChange={handleDate} defaultValue={'DEFAULT'}>
                                <option value="DEFAULT" disabled>Fee Type</option>
                                <option value="1">1 Months</option>
                                <option value="3">3 Months</option>
                                <option value="12">1 Year</option>
                            </select>
                        </div>
                        <div className="input-line">
                            <input type="number" name='amount' value={addmember.amount} placeholder='Amount' onChange={handleMember} />
                        </div>
                        <textarea name="dite" value={addmember.dite} cols="10" rows="5" placeholder='Add Dite' onChange={handleMember}></textarea>
                        <button onClick={postMember}>Add Member</button>
                    </form>
                </div>
            </div>
        </>
    )
}
