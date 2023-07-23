import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Login = (props) => {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [error, setError] = useState();
    const navigate = useNavigate();
    const handleLoginCredentials = async (e) => {
        e.preventDefault();
        let response = await fetch('http://localhost:5000/api/auth/login', {
            method: 'POST',
            headers: {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify({ email, password })
        });
        response = await response.json();
        if (response.success) {
            localStorage.setItem('authToken', response.authToken);
            navigate('/add');
            props.showAlert("Logged in successfully", "success");

        }
        else {
            setError("Invalid Credentials!")
            props.showAlert("Invalid Credentials", "danger");
        }
    }
    return (
        <React.Fragment>
            <h3 className='text-center mt-4'>
                Let's Login to iNote_Book
            </h3>
            <form className='mt-5 pt-3'>
                <div className="input-group my-3">
                    <span className="input-group-text">Email</span>
                    <input type="email" onChange={(e) => { setEmail(e.target.value) }} className="form-control" />
                </div>
                <div className="input-group my-3">
                    <span className="input-group-text">Password</span>
                    <input type="password" onChange={(e) => { setPassword(e.target.value) }} className="form-control" />
                </div>
                <div className='text-center'>

                    <button type="submit" className="btn btn-dark mt-3" onClick={handleLoginCredentials}>Login</button>
                </div>
                {error && <div className='text-center' style={{ color: "red" }}>{error}</div>}
            </form>
        </React.Fragment>
    )
}

export default Login