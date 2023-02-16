import React, { useEffect, useState } from 'react'
import NavBar2 from './NavBar2'
import { useParams, useNavigate } from 'react-router-dom'
import "../CSS/one/memberDetail.css"
export default function OneMemberData() {
    const navigate = useNavigate()
    const { id } = useParams()

    const [oneData, setoneData] = useState([])

    const oneMember = async (id) => {
        try {
            const res = await fetch("/onemember/" + id, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            })
            const data = await res.json();
            setoneData(data)
            console.log(oneData);
            // console.log(data);
        } catch (error) {
            console.log(error);
            navigate("/")
        }
    }

    useEffect(() => {
        oneMember(id);
        // eslint-disable-next-line
    }, [])
    return (
        <>
            <NavBar2 />
            {/* <h1>UserName:- {oneData.userName}</h1>
            <h1>Name:-{oneData.name}</h1>
            <h1>Phone:-{oneData.phone}</h1>
            <h1>Address:-{oneData.address}</h1>
            <h1>Dite:-{oneData.dite}</h1> */}

            <div className="card">
                <h2>{oneData.name}</h2>
                <h2>{oneData.email}</h2>
                <div className="collect">
                    <h3>{oneData.address},</h3>
                    <h3>{oneData.phone}</h3>
                </div>
            </div>
        </>
    )
}
