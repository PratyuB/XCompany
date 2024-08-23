import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';



const Logout = () => {


    const [show, setShow] = useState(false)
    const history = useNavigate();

    const adminLogout = async () => {

        const token = await localStorage.getItem('token')
        console.log('===>' + token)
        try {

            const res = await fetch('/logoutAdmin', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "auth": token
                })
            });

            const data = await res.json();
            if (res.status === 201) {
                setShow(true)
                await localStorage.removeItem('token')
                window.alert('Successfully Logout')

                history.push('/login', { replace: true })
                window.location.reload();
            }


        } catch (error) {
            console.log(error);

        }
    }


    useEffect(() => {
        const confirmBox = window.confirm(
            "Do you really want to Logout?"
        )
        if (confirmBox === true) {
            adminLogout()
            localStorage.removeItem('token')
            history('/login', { replace: true })

        } else {
            history('/')
        }

    })

    return (
        <div>
            <h1>{show ? 'Logout Successfully!' : 'processing...'}</h1>
        </div>
    )
}

export default Logout