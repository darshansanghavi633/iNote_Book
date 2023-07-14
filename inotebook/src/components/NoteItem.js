import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


export default function NoteItem(props) {
    const [title, setTitle] = useState();
    const [description, setDescription] = useState();
    const [tag, setTag] = useState();
    const [show, setShow] = useState(false);
    const [edit, setEdit] = useState(false);
    const [deleted, setDeleted] = useState(false);
    const handleEdit = () => setEdit(true);
    const handleClose = () => setShow(false);
    const handleClose1 = () => setEdit(false);
    const handleShow = () => setShow(true);
    const handleUpdate = () => {
        console.log('update');
        console.log({ title, description, tag })
        handleClose1();
    }
    const handleDelete = async () => {
        let response = await fetch(`http://localhost:5000/api/notes/deletenote/${props.note._id}`, {
            method: 'DELETE',
            'headers': {
                "Content-Type": "application/json",
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ5Yzc4ZWY2ZWNjMWI1MjdmODgwZGQ1In0sImlhdCI6MTY4ODAwNzY2MX0.KGFxM83nUOWS07seojRhExJkA2HHYnZEzQquF1nznrs"
            }
        });
        if (response) {
            setDeleted(true);
            handleClose();
        }
    }
    return (
        <div className='col-md-3 my-2'>
            <div className="card" >
                <div className="card-body">
                    <h4 className="card-title">{props.note.title}</h4>
                    <div className="card-text">{props.note.description}</div>
                    <div style={{ color: "blue" }}>{props.note.tag}</div>
                    <button className="fa-solid fa-trash my-2" style={{ color: "red", backgroundColor: "white", border: "none" }} onClick={handleShow}></button>
                    <i className="fa-solid fa-pen-to-square mx-2 my-2" style={{ color: "purple" }} onClick={handleEdit}></i>
                    {deleted && <div style={{ color: "red" }}>This note is deleted</div>}
                </div>
            </div>
            {/* Added modal to comfirm from user that he is sure he want to delete the note */}
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete Note</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are You sure you want to delete this note ?</Modal.Body>
                <Modal.Footer>
                    <Button variant="dark" onClick={handleClose}>
                        No
                    </Button>
                    <Button variant="danger" onClick={handleDelete}>
                        Yes
                    </Button>
                </Modal.Footer>
            </Modal>
            {/* Added modal to comfirm from user that he is sure he want to edit the note */}
            <Modal show={edit} onHide={handleClose1}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Note</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are You sure you want to edit this note ?</Modal.Body>
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
                <Modal.Footer>
                    <Button variant="dark" onClick={handleClose1}>
                        No
                    </Button>
                    <Button variant="danger" onClick={handleUpdate}>
                        Yes
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}
