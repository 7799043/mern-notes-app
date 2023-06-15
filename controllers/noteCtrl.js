const Notes = require('../models/noteModel')

const noteCtrl = {
    getNotes: async (req, res) => {
        try {
            const notes = await Notes.find({ user_id: req.user.id })
            res.json(notes)
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    createNote: async (req, res) => {
        try {
            const { title, content, date } = req.body;
            const newNote = new Notes({
                title,
                content,
                date,
                user_id: req.user.id,
                name: req.user.name
            })
            await newNote.save()
            res.json({ msg: "Created a Note" })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    deleteNote: async (req, res) => {
        try {
            await Notes.findByIdAndDelete(req.params.id)
            res.json({ msg: "Deleted a Note" })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    updateNote: async (req, res) => {
        try {
            const { title, content, date } = req.body;
            await Notes.findOneAndUpdate({ _id: req.params.id }, {
                title,
                content,
                date
            })
            res.json({ msg: "Updated a Note" })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    getNote: async (req, res) => {
        try {
            const note = await Notes.findById(req.params.id)
            res.json(note)
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },

    shareNote: async (req, res) => {
        try {
            const { targetUser, noteId } = req.body;
            const note = await Notes.findById(noteId);
            if (!note) {
                return res.status(404).json({ msg: 'Note not found' });
            }
            const sharedNote = new Notes({
                title: note.title,
                content: note.content,
                date: note.date,
                userId: targetUser,
                name: req.user.name, 
                user_id: req.user.id 
            });

            await sharedNote.save();
            res.status(200).json({ msg: 'Note shared successfully' });

        } catch (err) {
            console.error('Error sharing note:', err);
            res.status(500).json({ error: 'Internal server error' });
        }
    },


}

module.exports = noteCtrl

