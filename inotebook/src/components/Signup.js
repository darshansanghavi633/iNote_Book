import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = (props) => {
    const [email, setEmail] = useState();
    const [name, setName] = useState();
    const [password, setPassword] = useState();
    const [error, setError] = useState();
    const navigate = useNavigate();
    const handleSignupCredentials = async (e) => {
        e.preventDefault();
        console.log({ name, email, password, error });
        let response = await fetch('http://localhost:5000/api/auth/createuser', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name, email, password }),
        })
        response = await response.json();
        if (response.success) {
            localStorage.setItem('authToken', response.authToken);
            navigate('/add');
            props.showAlert("Craeted Account Successfully", "success");
        }
        else {
            setError("This email is already used")
            props.showAlert("Invalid Credentials", "danger");
        }
    }
    return (
        <div className='container'>
            <h3 className='text-center mt-4'>
                Let's Signup to iNote_Book
            </h3>
            <form className='mt-5 pt-3'>
                <div className="input-group my-3">
                    <span className="input-group-text">Name</span>
                    <input type="text" onChange={(e) => { setName(e.target.value) }} className="form-control" />
                </div>
                <div className="input-group my-3">
                    <span className="input-group-text">Email</span>
                    <input type="email" onChange={(e) => { setEmail(e.target.value) }} className="form-control" />
                </div>
                <div className="input-group my-3">
                    <span className="input-group-text">Password</span>
                    <input type="password" onChange={(e) => { setPassword(e.target.value) }} className="form-control" />
                </div>
                <div className='text-center'>
                    <button type="submit" className="btn btn-dark mt-3" onClick={handleSignupCredentials}>Signup</button>
                </div>
                {error && <div className='text-center' style={{ color: "red" }}>{error}</div>}
            </form>
        </div>
    )
}

export default Signup