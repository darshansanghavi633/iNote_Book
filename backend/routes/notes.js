const express = require('express')
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const Note = require('../models/Note');
const { body, validationResult } = require('express-validator');

//! Route 1
// Get all the notes using : GET "/api/notes/fetchallnotes" . Login required
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id })
        res.json(notes);
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error");
    }
});

//! Route 2
// Add a new notes using : POST "/api/notes/addnote" . Login required
router.post('/addnote', fetchuser, [body("title", "Enter a valid title").isLength({ min: 3 }),
body("description", "Description must be atleast 5 characters").isLength({ min: 5 })],
    async (req, res) => {
        try {

            const { title, description, tag } = req.body;
            //IF there are errors return Bad request and the errors
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const note = new Note({
                title, description, tag, user: req.user.id
            });
            const savedNotes = await note.save();
            res.json(savedNotes);
        } catch (error) {
            console.log(error.message);
            res.status(500).send("Internal Server Error");
        }
    });

//! Route 3
// Update existing notes using : Put "/api/notes/updatenote" . Login required
router.put('/updatenote/:id', fetchuser, async (req, res) => {
    const { title, description, tag } = req.body;
    try {
        //Create a newNote Object
        const newNote = {};
        if (title) {
            newNote.title = title;
        }
        if (description) {
            newNote.description = description;
        }
        if (tag) {
            newNote.tag = tag;
        }

        //Find the note which needs to be updated and update it 
        let note = await Note.findById(req.params.id)
        if (!note) {
            return res.status(404).send("Not found");
        }
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Notes Exists which such title");
        }
        note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true },)
        res.json({ note });
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error");
    }
})

//!Route 4
//Delete note using delete  "/api/notes/deletenote" . Login required
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    try {
        //Find the note which needs to be deleted and delete it 
        let note = await Note.findById(req.params.id)
        if (!note) {
            return res.status(404).send("Not found");
        }
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("No Notes Exists which such title");
        }
        //Allow user to delete notes if the user owns this note
        note = await Note.findByIdAndDelete(req.params.id)
        res.json({ message: "Note deleted successfully" });
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error");
    }
});

//!Route 5
//Get details of the notes to be updated using get "/api/notes/getdetails" Login required
router.get('/getdetails/:id', fetchuser, async (req, res) => {
    try {
        let note = await Note.findOne({ _id: req.params.id });
        if (!note) {
            return res.status(404).send("Not found");
        }
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("No Notes Exists which such title");
        }
        res.json({ note });
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error");
    }
})


module.exports = router;