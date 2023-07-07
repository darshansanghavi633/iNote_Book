import React from 'react'

export default function NoteItem(props) {
    const { note } = props;
    return (
        <div className='col-md-3 my-2'>
            <h3></h3>
            <div></div>
            <div className="card" >
                <div className="card-body">
                    <h5 className="card-title">{note.title}</h5>
                    <div className="card-text">{note.description}</div>
                    <div>{note.tag}</div>
                    <i className="fa-solid fa-trash my-2"></i>
                    <i className="fa-solid fa-pen-to-square mx-2 my-2"></i>
                </div>
            </div>
        </div>
    )
}
