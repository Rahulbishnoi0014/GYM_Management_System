import React, { useEffect, useState } from 'react'
import NavBar2 from './NavBar2'
import "../CSS/memberdetails.css"
import { NavLink, useNavigate } from 'react-router-dom'
import * as Icon from 'react-bootstrap-icons';
export default function MemberDetails() {
    const navigate = useNavigate()
    const [memberDetails, setMemberDetail] = useState([])
    const [my_search, setMy_search] = useState("")

    const MemberDetails = async () => {
        try {
            const res = await fetch("/memberdetails", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            })
            const data = await res.json();
            setMemberDetail(data.newmembers)
        } catch (error) {
            console.log(error);
            navigate("/")
        }
    }

    useEffect(() => {
        MemberDetails();
        // eslint-disable-next-line
    }, [])

    const deleteMember = async (id) => {
        if (window.confirm("Are You Sure to delete Member ") === true) {
            try {
                const res = await fetch("/deleteMember/" + id, {
                    method: "delete"
                })

                if (res.status === 200) {
                    alert("Delete Success")
                }
                else {
                    alert("Not Delete")
                }
            } catch (error) {
                console.log(error);
            }
        }
    }





    const [datq, setDat] = useState({ feeDuration: "" });
    const [registerationDate, setregisterDate] = useState({ registerdate: "" })
    const [plane, setplane] = useState({ feeDuration: "" })
    const [addamount, setaddamount] = useState({ amount: "", remark: "" })

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


    const [idd, setId] = useState("")
    const [display, setDisplay] = useState(false)
    const ids = (id) => {
        setId(id)
        // console.log(id);
        console.log(idd);
        setDisplay((e) => !e)
        // setShowModel((d) => !d)
    }

    const addHistory = async (e) => {
        e.preventDefault();

        const { feeDuration } = datq;
        const planeType = plane.feeDuration
        const { registerdate } = registerationDate
        const { amount, remark } = addamount
        // console.log(idd);
        const res = await fetch("/addHistory/" + idd, {
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
            alert("Costumer Added Successfully")
        }
        else {
            alert("Something went wrong")
        }
    }


    const [oneData, setoneData] = useState("")

    const oneMember = async (id) => {
        try {
            const res = await fetch("/onemember/" + id, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            })
            const data = await res.json();
            setoneData(data.feeHistory)
            setShowModel(true)
        } catch (error) {
            console.log(error);
            navigate("/")
        }
    }
    const [showModel, setShowModel] = useState(false)
    const MyModel = () => {
        return <>
            <div className="model_wrapper"></div>
            <div className="model_container">
                <Icon.XLg onClick={() => setShowModel(false)} style={{ color: "white", fontSize: "30", cursor: "pointer" }} />
                <table>
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
                            oneData.map((curr, index) => {
                                const registeration = new Date(curr.registerdate)
                                const x = registeration.toLocaleDateString();

                                const feeDuration = new Date(curr.feeDuration);
                                const z = feeDuration.toLocaleDateString();
                                return (
                                    <>
                                        <tr>
                                            <td>{index}</td>
                                            <td>{curr.planeType}</td>
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
                </table>
            </div>
        </>
    }

    return (
        <>
            <NavBar2 gymname="sbdhj" />
            <div className="memberDetails">
                {showModel && <MyModel />}
                <div className="search">
                    <input type="text" name="search" onChange={(e) => setMy_search(e.target.value)} placeholder="Search" /> <label><Icon.SearchHeartFill id='searchIcon' /></label>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>SNO.</th>
                            <th>Name</th>
                            <th>Phone N0.</th>
                            <th>Address</th>
                            <th>Amount</th>
                            <th>Plane Type</th>
                            <th>Registration</th>
                            <th>Plan End</th>
                            <th>Days Left</th>
                            <th>Add History</th>
                            <th>Delete</th>
                            <th>View History</th>
                            <th>Details</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            memberDetails.filter((val) => {
                                if (my_search === "") {
                                    return val;
                                }
                                else if (val.userName.toLowerCase().includes(my_search.toLocaleLowerCase()) || (val.name.toLocaleLowerCase().includes(my_search.toLocaleLowerCase())) || (val.phone).toString().includes(my_search.toLocaleLowerCase())) {
                                    return val;
                                }

                                return ""

                            }, []).map((curr, index) => {
                                const registeration = new Date(curr.registerdate[curr.registerdate.length - 1])
                                const x = registeration.toLocaleDateString();
                                {/* console.log(registeration.getTime() + "regidtaeershfhs") */ }
                                const feeDuration = new Date(curr.feeDuration[curr.feeDuration.length - 1]);
                                const z = feeDuration.toLocaleDateString();

                                const q = new Date();
                                let Remaining;
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
                                            <td>{curr.name}</td>
                                            <td>{curr.phone}</td>
                                            <td>{curr.address}</td>
                                            <td>{curr.amount[curr.amount.length - 1]}</td>
                                            <td>{curr.planeType[curr.planeType.length - 1]} Month</td>
                                            <td>{x}</td>
                                            <td>{z}</td>
                                            <td>{Remaining}</td>
                                            <td>
                                                <button onClick={() => ids(curr._id)}>Update History</button>
                                            </td>
                                            <td>
                                                <Icon.Trash3Fill onClick={() => deleteMember(curr._id)} />
                                            </td>
                                            <td>
                                                <button onClick={() => oneMember(curr._id)}>view History</button>
                                            </td>
                                            <td>                                                <span>
                                                <NavLink to={"/onememberdata/" + curr._id}>In Details</NavLink>
                                            </span>
                                            </td>
                                        </tr>
                                    </>
                                )
                            })
                        }
                    </tbody>
                </table>
                <div className="sign" style={display === false ? { display: "none" } : { display: "flex" }}>
                    <form action="">
                        <div className="icon">
                            <Icon.XLg onClick={() => setDisplay((e) => !e)} />
                        </div>
                        <div className="input-line">
                            <input type="date" name='registerdate' value={registerationDate.registerdate} onChange={handleDate} />
                            <select name="feeDuration" onChange={handleDate} defaultValue={'DEFAULT'}>
                                <option value="DEFAULT" disabled>Fee Type</option>
                                <option value="1">1 Months</option>
                                <option value="3">3 Months</option>
                                <option value="12">1 Year</option>
                            </select>
                        </div>
                        <div className="input-line">
                            <input type="number" name='amount' value={addamount.amount} placeholder='Amount' onChange={handleDate} />
                            <input type="text" name='remark' value={addamount.remark} placeholder="Remark" onChange={handleDate} />
                        </div>
                        <button onClick={addHistory}>Add Amount</button>
                    </form>
                </div>
            </div>
        </>
    )
}
