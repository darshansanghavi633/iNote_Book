import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AddNote(props) {
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [tag, setTag] = useState('');
    const [message, setMessage] = useState();
    const handleNote = async () => {
        try {
            let response = await fetch('http://localhost:5000/api/notes/addnote', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": localStorage.getItem('authToken')
                },
                body: JSON.stringify({ title, description, tag }),
            })
            response = await response.json();
            console.log(response.errors);
            if (!response.errors) {
                setMessage("Notes Added Successfully");
                setTitle("");
                setDescription("");
                setTag("");
                navigate("/");
                props.showAlert("Notes Added Successfully", "success");

            } else {
                setMessage("Either your title or description is too short");
            }
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div className='conatiner my-3'>
            <h2>Add Note</h2>
            <div className="input-group my-3">
                <span className="input-group-text">Note Title</span>
                <input type="text" onChange={(e) => { setTitle(e.target.value) }} aria-label="title" name='etitle' className="form-control" />
            </div>
            <div className="input-group my-3">
                <span className="input-group-text">Note Description</span>
                <input type="text" onChange={(e) => { setDescription(e.target.value) }} aria-label="description" className="form-control" />
            </div>
            <div className="input-group my-3">
                <span className="input-group-text">Note Tag</span>
                <input type="text" onChange={(e) => { setTag(e.target.value) }} aria-label="tag" className="form-control" />
            </div>
            {message === "Notes Added Successfully" ? <div style={{ color: "green" }}>{message}</div> : <div style={{ color: "red" }}>{message}</div>}
            <div className='text-center'>
                <button disabled={title.length < 3 || description.length < 5} type="button" onClick={handleNote} className="btn btn-dark">Add Note</button>
            </div>
        </div>
    )
}
