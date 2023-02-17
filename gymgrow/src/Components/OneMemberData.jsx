import React, { useEffect, useState } from 'react'
// import NavBar2 from './NavBar2'
import { useParams, useNavigate } from 'react-router-dom'
import "../CSS/oneMemberDetail.css"
import * as Icon from "react-bootstrap-icons"
import { NavLink } from 'react-router-dom'
export default function OneMemberData() {
    const navigate = useNavigate()
    const { id } = useParams()

    const [oneData, setoneData] = useState([])
    const [oneDataHistory, setoneDataHistory] = useState([])
    const [dashboard, setdashboard] = useState(true)
    const [displayEditMember, setDisplayEditMember] = useState(false)
    const [displayhistoryUpdate, setdisplayhistoryupdate] = useState(false)

    // const [clsname, setclaname] = useState("Memberactionactive")
    const clsname = "Memberactionactive"

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
            setoneDataHistory(data.feeHistory)
            // console.log(oneData);
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


    let Remaining;
    // eslint-disable-next-line
    oneDataHistory.reverse().map((curr, index) => {
        const registeration = new Date(curr.registerdate)
        const feeDuration = new Date(curr.feeDuration);
        const q = new Date();
        if (q.getTime() > registeration.getTime()) {
            // console.log("Q is greater")
            const diff = feeDuration.getTime() - q.getTime();
            const one_day = 1000 * 3600 * 24;
            Remaining = Math.ceil(diff / one_day)
        }
        else {
            // console.log("Register is greater")
            const diff = feeDuration.getTime() - registeration.getTime();
            const one_day = 1000 * 3600 * 24;
            Remaining = Math.ceil(diff / one_day)
        }
    })

    const displadashboard = () => {
        setdashboard(true)
        setDisplayEditMember(false)
        setdisplayhistoryupdate(false)
    }

    const toggleDisplay = () => {
        setdashboard(false)
        setDisplayEditMember(true)
        setdisplayhistoryupdate(false)
    }

    const displayUpdate = () => {
        setdashboard(false)
        setDisplayEditMember(false)
        setdisplayhistoryupdate(true)
    }


    const [datq, setDat] = useState({ feeDuration: "" });
    const [registerationDate, setregisterDate] = useState({ registerdate: "" })
    const [plane, setplane] = useState({ feeDuration: "" })
    const [addamount, setaddamount] = useState({ amount: "", remark: "" })
    const _id = oneData._id

    const handleDate = (e) => {
        e.preventDefault();
        const name = e.target.name
        const value = e.target.value
        setregisterDate({ ...registerationDate, [name]: value })
        setaddamount({ ...addamount, [name]: value })
        const q = new Date(registerationDate.registerdate)
        const duration = new Date(q.getFullYear(), q.getMonth() + parseInt(value), q.getDate());
        setplane({ ...plane, [name]: value });
        setDat({ ...datq, [name]: duration })
    }


    const addHistory = async (e) => {
        e.preventDefault();

        const { feeDuration } = datq;
        const planeType = plane.feeDuration
        const { registerdate } = registerationDate
        const { amount, remark } = addamount
        // console.log(idd);
        const res = await fetch("/addHistory/" + _id, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                registerdate, planeType, amount, feeDuration, remark
            })
        })
        await res.json();
        if (res.status === 422) {
            alert("Fill all the fields")
        }
        else if (res.status === 200) {
            alert("History Added SuccessFully")
        }
        else {
            alert("Something went wrong")
        }
    }

    const [memberUpdate, setmemberUpdate] = useState({
        address: "", dite: ""
    })
    const mamberdetailUpdate = (e) => {
        e.preventDefault();
        var name = e.target.name;
        var value = e.target.value;

        setmemberUpdate({ ...memberUpdate, [name]: value })

    }

    const patchMemberUpdate = async (e) => {
        try {
            e.preventDefault();
            const { address, dite } = memberUpdate
            console.log("running");

            
            const res = await fetch("/updatemember/" + _id, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    address, dite
                })
            })
            await res.json();
            if (res.status === 422) {
                alert("Fill all the fields")
            }
            else if (res.status === 200) {
                alert("History Added SuccessFully")
            }
            else {
                alert("Something went wrong")
            }

        } catch (error) {
            console.log(error);
        }
    }
    return (
        <>
            {/* <NavBar2 gymname={oneData.userName}/> */}
            <div className="onememberdetail">
                <div className="username">
                    <h3>USERNAME:-{oneData.userName}</h3>
                    <h4>{Remaining} Days Left</h4>
                </div>
                <div className="action_card">
                    <div className="action">
                        <p className={dashboard === true ? clsname : ""} onClick={displadashboard}><span><Icon.Globe className='MemberActionicon' /></span> Dashboard</p>
                        <p onClick={toggleDisplay} className={displayEditMember === true ? clsname : ""}><span><Icon.Person className='MemberActionicon' /></span> Edit Member</p>
                        {/* <p onClick={history}><span><Icon.HSquareFill className='MemberActionicon' /></span> Fee History</p> */}
                        <p className={displayhistoryUpdate === true ? clsname : ""} onClick={displayUpdate}><span><Icon.ClockFill className='MemberActionicon' /></span> Update History</p>
                        <NavLink to="/memberdetails"><span><Icon.ArrowBarLeft className='MemberActionicon' /></span> Back</NavLink>
                    </div>

                    <div className="card" style={dashboard === false ? { display: "none" } : { display: "block" }}>
                        <h2>{oneData.name}</h2>
                        <h2>{oneData.phone}, {oneData.address}</h2>
                        <div className="dite">
                            <h2>Dite:- {oneData.dite}</h2>
                        </div>
                    </div>


                    {/* -------------------Member Detail update------------------------------  */}
                    <div className='sign oneMemberDetailForm' style={displayEditMember === false ? { display: "none" } : { display: "block" }}>
                        <h2>Edit Details</h2>
                        <form method="PATCH" >
                            <label htmlFor="address">Address</label>
                            <input type="text" name="address" value={memberUpdate.address} onChange={mamberdetailUpdate} placeholder='Address' />
                            <label htmlFor="textarea" >Dite</label>
                            <textarea name="dite" cols="30" rows="4" value={memberUpdate.dite} onChange={mamberdetailUpdate} ></textarea>
                            <button onClick={patchMemberUpdate}>Update</button>
                        </form>
                    </div>

                    {/* -------------------Member Fee update------------------------------  */}

                    <div className="sign oneMemberDetailForm" style={displayhistoryUpdate === false ? { display: "none" } : { display: "block" }}>
                        <h2>Update Fee</h2>
                        <form method='POST'>
                            <div className="input-line">
                                <label htmlFor="registerdate">Register Date </label>
                                <input type="date" name='registerdate' value={registerationDate.registerdate} onChange={handleDate} />
                                <label htmlFor="feeDuration"> Plane Type</label>
                                <select name="feeDuration" defaultValue={'DEFAULT'} onChange={handleDate}>
                                    <option value="DEFAULT" disabled>Fee Type</option>
                                    <option value="1">1 Months</option>
                                    <option value="3">3 Months</option>
                                    <option value="12">1 Year</option>
                                </select>
                            </div>
                            <div className="input-line2">
                                <label htmlFor="amount">Amount</label>
                                <input type="number" name='amount' value={addamount.amount} onChange={handleDate} placeholder='Amount' />
                                <label htmlFor="remark">Remark</label>
                                <input type="text" name='remark' value={addamount.remark} onChange={handleDate} placeholder="Remark" />
                            </div>
                            <button onClick={addHistory}>Add Amount</button>
                        </form>
                    </div>
                </div>


                <table>
                    <caption>History Summary</caption>
                    <thead>
                        <tr>
                            <th scope="col">Plane Type</th>
                            <th scope="col">Amount</th>
                            <th scope="col">Period</th>
                            <th scope="col">Remark</th>

                        </tr>
                    </thead>

                    {/* <tr>
                            <td scope="row" data-label="Acount">Visa - 3412</td>
                            <td data-label="Due Date">02/01/2016</td>
                            <td data-label="Amount">$842</td>
                            <td data-label="Period">01/01/2016 - 01/31/2016</td>
                        </tr> */}
                    {
                        oneDataHistory.reverse().map((curr, index) => {
                            const registeration = new Date(curr.registerdate)
                            const x = registeration.toLocaleDateString();

                            const feeDuration = new Date(curr.feeDuration);
                            const z = feeDuration.toLocaleDateString();
                            return (
                                <tbody>
                                    <>
                                        <tr>
                                            <td data-label="Plane Type">{curr.planeType} Month</td>
                                            <td data-label="Amount">{curr.amount}</td>
                                            <td data-label="Period">{x} - {z}</td>
                                            <td data-label="Remark">{curr.remark}</td>
                                        </tr>
                                    </>
                                </tbody>
                            )
                        })
                    }
                </table>
            </div>




            {/* <table >
                        <thead>
                            <tr>
                                <th>SNO.</th>
                                <th>Plane Type</th>
                                <th>Amount</th>
                                <th>Registration</th>
                                <th>Plan End</th>
                                <th>Remark</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                oneDataHistory.reverse().map((curr, index) => {
                                    const registeration = new Date(curr.registerdate)
                                    const x = registeration.toLocaleDateString();

                                    const feeDuration = new Date(curr.feeDuration);
                                    const z = feeDuration.toLocaleDateString();
                                    const q = new Date();
                                    if (q.getTime() > registeration.getTime()) {
                                        console.log("Q is greater")
                                        const diff = feeDuration.getTime() - q.getTime();
                                        const one_day = 1000 * 3600 * 24;
                                        Remaining = Math.ceil(diff / one_day)
                                    }
                                    else {
                                        console.log("Register is greater")
                                        const diff = feeDuration.getTime() - registeration.getTime();
                                        const one_day = 1000 * 3600 * 24;
                                        Remaining = Math.ceil(diff / one_day)
                                    }
                                    return (
                                        <>
                                            <tr>
                                                <td>{index + 1}</td>
                                                <td>{curr.planeType} Month</td>
                                                <td>{curr.amount}</td>
                                                <td>{x}</td>
                                                <td>{z}</td>
                                                <td>{curr.remark}</td>
                                            </tr>
                                        </>
                                    )
                                })
                            }
                        </tbody>
                    </table> */}

        </>
    )
}
