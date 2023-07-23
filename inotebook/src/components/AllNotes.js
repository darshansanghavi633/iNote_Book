import React, { useEffect, useState } from 'react';
import NoteItem from './NoteItem';
import { useNavigate } from 'react-router-dom';

export default function UpdateNote(props) {
    const [data, setData] = useState([]);
    const navigate = useNavigate();
    const handleFetchAllNotes = async () => {
        let response = await fetch('http://localhost:5000/api/notes/fetchallnotes', {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('authToken')
            }
        })
        response = await response.json();
        setData(response);
        if (!response) {
            navigate('/add');
            props.showAlert("No notes to display", "success");
        }
    }
    useEffect(() => {
        handleFetchAllNotes();
    }, [])

    return (
        <div className='row my-3'>
            <h2 className='mb-3'> Your Note</h2>
            {data.map((item) => (
                <NoteItem key={item._id} note={item} showAlert={props.showAlert} />
            ))}
        </div>
    )
}
