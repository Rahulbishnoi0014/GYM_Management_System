import React, { useEffect, useState } from 'react'
import NavBar2 from './NavBar2'
import "../CSS/memberdetails.css"
import { NavLink, useNavigate } from 'react-router-dom'
import * as Icon from 'react-bootstrap-icons';
export default function MemberDetails() {
    const navigate = useNavigate()
    const [memberDetails, setMemberDetail] = useState([])
    const [my_search, setMy_search] = useState("")
    const [gymname, setgymname] = useState({
        gymname: "", name: ""
    })
    const MemberDetails = async () => {
        try {
            const res = await fetch("/memberdetails", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            })
            const data = await res.json();
            setgymname({ gymname: data.gymname, name: data.name })
            // console.log(gymname);
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
    // const [display, setDisplay] = useState(false)
    const ids = (id) => {
        setId(id)
        // console.log(id);
        // console.log(idd);
        // setDisplay((e) => !e)
        setShowModel((d) => !d)
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
            alert("History Added SuccessFully")
        }
        else {
            alert("Something went wrong")
        }
    }


    // const [oneData, setoneData] = useState("")

    // const oneMember = async (id) => {
    //     try {
    //         const res = await fetch("/onemember/" + id, {
    //             method: "GET",
    //             headers: {
    //                 "Content-Type": "application/json"
    //             }
    //         })
    //         const data = await res.json();
    //         setoneData(data.feeHistory)
    //         setShowModel(true)
    //     } catch (error) {
    //         console.log(error);
    //         navigate("/")
    //     }
    // }
    const [showModel, setShowModel] = useState(false)

    // const MyModel = () => {
    //     return <>
    //         <div className="model_wrapper"></div>
    //         <div className="model_container">
    //             <div className="sign">
    //                 <form action="">
    //                     <div className="icon">
    //                         <Icon.XLg onClick={() => setShowModel((e) => !e)} style={{ fontSize: "30px" }} />
    //                     </div>
    //                     <div className="input-line">
    //                         <input type="date" name='registerdate' value={registerationDate.registerdate} onChange={handleDate} />
    //                         <select name="feeDuration" onChange={handleDate} defaultValue={'DEFAULT'}>
    //                             <option value="DEFAULT" disabled>Fee Type</option>
    //                             <option value="1">1 Months</option>
    //                             <option value="3">3 Months</option>
    //                             <option value="12">1 Year</option>
    //                         </select>
    //                     </div>
    //                     <div className="input-line">
    //                         <input type="number" name='amount' value={addamount.amount} placeholder='Amount' onChange={handleDate} />
    //                         <input type="text" name='remark' value={addamount.remark} placeholder="Remark" onChange={handleDate} />
    //                     </div>
    //                     <button onClick={addHistory}>Add Amount</button>
    //                 </form>
    //             </div>
    //         </div>
    //     </>
    // }


    // let Remaining;

    // const expired = {}
    // const day10 = {}
    // memberDetails.reverse().map((curr, index) => {
    //     const registeration = new Date(curr.registerdate)
    //     const feeDuration = new Date(curr.feeDuration[curr.feeDuration.length - 1]);
    //     const q = new Date();
    //     if (q.getTime() > registeration.getTime()) {
    //         // console.log("Q is greater")
    //         const diff = feeDuration.getTime() - q.getTime();
    //         const one_day = 1000 * 3600 * 24;
    //         Remaining = Math.ceil(diff / one_day)

    //     }
    //     else {
    //         // console.log("Register is greater")
    //         const diff = feeDuration.getTime() - registeration.getTime();
    //         const one_day = 1000 * 3600 * 24;
    //         Remaining = Math.ceil(diff / one_day)
    //         // console.log("jshdgusj" + Remaining);
    //     }
    // })


    return (
        <>
            <NavBar2 gymname={gymname.gymname} />
            {/* {showModel && <MyModel />} */}
            <div className="div" style={showModel === true ? { display: "block", overflow: "hidden" } : { display: "none" }}>
                <div className="model_wrapper"></div>
                <div className="model_container">
                    <div className="sign">
                        <form action="">
                            <div className="icon">
                                <Icon.XLg onClick={() => setShowModel((e) => !e)} style={{ fontSize: "30px" }} />
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
            </div>
            <div className="memberDetails">
                <div className="search">
                    <input type="text" name="search" onChange={(e) => setMy_search(e.target.value)} placeholder="Search" /> <label><Icon.SearchHeartFill id='searchIcon' /></label>
                </div>
                <table>
                    <caption>Member Details</caption>
                    <thead>
                        <tr>
                            <th scope="col">SNO.</th>
                            <th scope="col">Name</th>
                            <th scope="col">Phone N0.</th>
                            <th scope="col">Amount</th>
                            <th scope="col">Plane Type</th>
                            <th scope="col">Duration</th>
                            {/* <th scope="col">Plan End</th> */}
                            <th scope="col">Days Left</th>
                            <th scope="col">Update Fee</th>
                            <th scope="col">Delete</th>
                            <th scope="col">Details</th>
                        </tr>
                    </thead>

                    {
                        memberDetails.filter((val) => {
                            if (my_search === "") {
                                return val;
                            }
                            else if (val.userName.toLowerCase().includes(my_search.toLocaleLowerCase()) || (val.name.toLocaleLowerCase().includes(my_search.toLocaleLowerCase())) || (val.phone).toString().includes(my_search.toLocaleLowerCase())) {
                                return val;
                            }

                            return ""

                        }, []).slice(-25).reverse().map((curr, index) => {
                            const registeration = new Date(curr.registerdate[curr.registerdate.length - 1])
                            const x = registeration.toLocaleDateString();
                            const feeDuration = new Date(curr.feeDuration[curr.feeDuration.length - 1]);
                            const z = feeDuration.toLocaleDateString();

                            const q = new Date();
                            let Remaining;
                            if (q.getTime() > registeration.getTime()) {
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
                                    <tbody>
                                        <tr >
                                            <td data-label="Sno.">{index + 1}</td>
                                            <td data-label="Name">{curr.name}</td>
                                            <td data-label="Phone No.">{curr.phone}</td>
                                            <td data-label="Amount">{curr.amount[curr.amount.length - 1]}</td>
                                            <td data-label="Plane Type">{curr.planeType[curr.planeType.length - 1]} Month</td>
                                            <td data-label="Duration">{x} <br /> TO <br /> {z}</td>
                                            {/* <td data-label="End Date"></td> */}
                                            <td data-label="Days Left">{Remaining}</td>
                                            <td data-label="Update History">
                                                <button onClick={() => ids(curr._id)}>Update Fee</button>
                                            </td>
                                            <td data-label="Delete">
                                                <Icon.Trash3Fill onClick={() => deleteMember(curr._id)} style={{ color: "red" }} />
                                            </td>
                                            <td data-label="Details">
                                                <span><NavLink to={"/onememberdata/" + curr._id}>All Detail</NavLink></span>
                                            </td>
                                        </tr>
                                    </tbody>
                                </>
                            )
                        })
                    }
                </table>
            </div>
        </>
    )
}
