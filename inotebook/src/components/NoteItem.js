import React from 'react'

export default function NoteItem(props) {
    const handleDeleteNote = () => {
        console.log('Delete Note')
    }
    return (
        <div className='col-md-3 my-2'>
            <h3></h3>
            <div></div>
            <div className="card" >
                <div className="card-body">
                    <h5 className="card-title">{props.note.title}</h5>
                    <div className="card-text">{props.note.description}</div>
                    <div>{props.note.tag}</div>
                    <i className="fa-solid fa-trash my-2" onClick={handleDeleteNote}></i>
                    <i className="fa-solid fa-pen-to-square mx-2 my-2"></i>
                </div>
            </div>
        </div>
    )
}
