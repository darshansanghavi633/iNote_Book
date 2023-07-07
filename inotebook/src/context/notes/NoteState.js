import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {
    const notesInitital = [
        {
            "_id": "64a2966474f4ccb1cd18eca4",
            "user": "649c78ef6ecc1b527f880dd5",
            "title": "gym timings",
            "description": "go to gym at 10AM",
            "tag": "gym",
            "date": "1688376932107",
            "__v": 0
        },
        {
            "_id": "64a2968574f4ccb1cd18eca6",
            "user": "649c78ef6ecc1b527f880dd5",
            "title": "office timings",
            "description": "go to office at 12AM",
            "tag": "office",
            "date": "1688376965513",
            "__v": 0
        }
    ]
    const [notes, setNotes] = useState(notesInitital)
    return (
        <NoteContext.Provider value={{ notes, setNotes }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;