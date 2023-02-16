import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
export default function Logout() {
    
    const navigate = useNavigate();
    const userlogout = async () => {
        const res = await fetch("/logoutuser", {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            credentials: "include"
        });
        await res.json();
        if (res.status === 200) {
            console.log("Logout Success");
            navigate("/")
        }

        else {
            console.log("Logout Failed");
        }
    }
    useEffect(() => {
        userlogout();
    })

    // useEffect(() => {
    //     fetch("/logout", {
    //         method: "GET",
    //         headers: {
    //             Accept: "application/json",
    //             "Contant-Type": "application/json",
    //         },
    //         credentials: "include"
    //     }).then((res) => {
    //         navigate("/", { replace: true });
    //         if (res.status !== 200) {
    //             const error = new Error(res.error);
    //             throw error;
    //         }

    //     }).catch((e) => {
    //         console.log(e);
    //     })
    // })
    return (
        <>
            <h1>You Logout Successfully</h1>
        </>
    )
}
