import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'

const Register = () => {

    const history = useNavigate()

    const [user, setUser] = useState({
        companyName: "", email: "", phoneNumber: "", password: "", cpassword: ""
    })

    const handleInputs = (e) => {
        let namee = e.target.name;
        let value = e.target.value;

        setUser({ ...user, [namee]: value })
    }

    const PostData = async (e) => {
        e.preventDefault()

        const { companyName, email, phoneNumber, password, cpassword } = user

        const res = await fetch('/adminRegister', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                companyName, email, phoneNumber, password, cpassword
            })
        });

        const data = await res.json();

        if (res.status === 201) {
            localStorage.setItem('token', data.token)
            window.alert('Registration Successful')
            history('/')
        } else {
            window.alert('Registration Failed')
        }
    }


    return (
        <>
            <section>
                <div className='container mt-5'>
                    <div className='row'>
                        <div className='col-12 col-md-7 col-sm-6'>
                            <h1 className='mt-5'>Welcome!</h1>
                        </div>
                        <div className='col-12 col-md-5 col-sm-6'>
                            <form method='POST'>
                                <div className="form-group">
                                    <label htmlFor="companyName">Company Name</label>
                                    <input type="text" className="form-control" id="companyName" name="companyName"
                                        value={user.companyName} onChange={handleInputs} placeholder="Enter your name" />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="email">Email</label>
                                    <input type="email" className="form-control" id="email" name="email"
                                        value={user.email} onChange={handleInputs} placeholder="Enter your Email" />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="phoneNumber">Phone No.</label>
                                    <input type="tel" className="form-control" id="phoneNumber" name="phoneNumber"
                                        value={user.phoneNumber} onChange={handleInputs} placeholder="Enter your Phone No." />
                                </div>


                                <div className="form-group">
                                    <label htmlFor="password">Password</label>
                                    <input type="password" className="form-control" id="password" name="password" value={user.password} onChange={handleInputs} placeholder="Enter your Password" />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="cpassword">Confirm password</label>
                                    <input type="password" className="form-control" id="cpassword" name="cpassword"
                                        value={user.cpassword} onChange={handleInputs} placeholder="Confirm password" />
                                </div>

                                <NavLink to='/login'>Already Registered, then Login here!</NavLink><br /><br />
                                <button type="submit" className="btn btn-primary" id='register' name='register' onClick={PostData}>Register</button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Register