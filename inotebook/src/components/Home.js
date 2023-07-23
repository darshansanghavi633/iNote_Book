import React from "react"
import AllNotes from "./AllNotes"

export default function Home(props) {

    return (
        <div>
            <AllNotes showAlert={props.showAlert} />
        </div>
    )
}

