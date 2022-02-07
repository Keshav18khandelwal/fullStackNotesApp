const express = require('express');
const router = express.Router();
const Notes = require('../models/Notes');
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const fetchuser = require("../middleware/fetchuser");


//Route 1: fetch all notes  - /api/notes/fetchallnotes
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    const notes = await Notes.find({ user: req.user.id })
    res.json(notes);
})

//Route 2: add notes  - /api/notes/addnotes
router.post('/addnotes', fetchuser, [

    body('title', "enter a valid title").isLength({ min: 3 }),
    body('description', "enter a valid description").isLength({ min: 5 }),
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { title, description, tag } = req.body;
        const note = new Notes({
            title, description, tag, user: req.user.id
        })

        const savednote = await note.save();
        res.json(savednote);
    } catch (error) {
        res.status(500).send("Internal server 676676 error");
    }
})


//Route 3: update notes  - /api/notes/updatenote/:id
router.put('/updatenote/:id', fetchuser, [

    body('title', "enter a valid title").isLength({ min: 3 }),
    body('description', "enter a valid description").isLength({ min: 5 }),
], async (req, res) => {

    try {
        const { title, description, tag } = req.body;

        let newnote = {};
        if (title) { newnote.title = title };
        if (description) { newnote.description = description };
        if (tag) { newnote.tag = tag };

        let note = await Notes.findById(req.params.id);
        if (!note) { return res.status(404).send("Not Found") }

        if (note.user.toString() !== req.user.id) {
            return res.status(404).send("Not Allowed")
        }

        note = await Notes.findByIdAndUpdate(req.params.id, { $set: newnote }, { new: true })
        res.json(note)
    } catch (error) {
        res.status(500).send("Internal server error");
    }

})


//Route 4: delete note  - /api/notes/deletenote/:id

router.delete('/deletenote/:id', fetchuser, async (req, res) => {

    try {
        let note = await Notes.findById(req.params.id);
        if (!note) { return res.status(404).send("Not Found") }

        if (note.user.toString() !== req.user.id) {
            return res.status(404).send("Not Allowed")
        }

        note = await Notes.findByIdAndDelete(req.params.id)
        res.json({ "Success": "Note has been deleted", note: note })
    } catch (error) {
        res.status(500).send("Internal server error");
    }

})


module.exports = router;