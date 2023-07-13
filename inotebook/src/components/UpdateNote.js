import React, { useEffect, useState } from 'react';
import NoteItem from './NoteItem';

export default function UpdateNote() {
    const [data, setData] = useState([]);
    const handleFetchAllNotes = async () => {
        let response = await fetch('http://localhost:5000/api/notes/fetchallnotes', {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ5Yzc4ZWY2ZWNjMWI1MjdmODgwZGQ1In0sImlhdCI6MTY4ODAwNzY2MX0.KGFxM83nUOWS07seojRhExJkA2HHYnZEzQquF1nznrs"
            }
        })
        response = await response.json();
        setData(response);
    }
    useEffect(() => {
        handleFetchAllNotes();
    }, [])

    return (
        <div className='row my-3'>
            <h2> Your Note</h2>
            {data.map((item) => (
                <NoteItem key={item._id} note={item} />
            ))}
        </div>
    )
}
