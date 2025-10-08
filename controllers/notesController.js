const { newNote, getAllNotesByUser, getNoteById, updateNoteById, removeNoteById, getAllNotes } = require('../models/notesModel');

// CREATE NOTE
const createNote = async (req, res) => {
  try {
    const { content, content_hash, signature } = req.body;
    const userId = req.user?.userId; // from JWT

    if (!content) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const note = await newNote(userId, content, content_hash, signature);
    return res.status(201).json({ message: 'Note created successfully', note });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to create note' });
  }
};

// // GET ALL NOTES FOR LOGGED-IN USER
// const getNotes = async (req, res) => {
//   try {
//     const userId = req.user?.userId;
//     const role = req.user?.role;

//     let notes;

//     if (role === "admin") {
//         // Admins see all notes
//         notes = await getAllNotes();
//     } else {
//       // Regular users see only their own notes
//       notes = await getAllNotesByUser(userId);
//     }

//     return res.status(200).json({ message: 'Notes retrieved', notes });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ error: 'Failed to retrieve notes' });
//   }
// };

// GET ALL NOTES FOR LOGGED-IN USER
const getNotes = async (req, res) => {
  try {
    const userId = req.user?.userId;
    notes = await getAllNotesByUser(userId);

    return res.status(200).json({ message: 'Notes retrieved', notes });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to retrieve notes' });
  }
};

const getAllNotesForAdmin = async (req, res) => {
    try {
        const role = req.user?.role;
        
        if (role !== "admin") {
            return res.status(403).json({ error: 'Access denied' });
        }
        
        const notes = await getAllNotes();
        return res.status(200).json({ message: 'All notes retrieved', notes });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Failed to retrieve all notes' });
    }
};


// GET SINGLE NOTE (ENSURE USER OWNS IT)
const getNote = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user?.userId;

    const note = await getNoteById(id);

    if (!note || note.length === 0 || note[0].userId !== userId) {
      return res.status(404).json({ error: `Note not found or access denied` });
    }

    return res.status(200).json({ message: 'Note retrieved', note });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to retrieve note' });
  }
};

// UPDATE NOTE (ENSURE USER OWNS IT)
const updateNote = async (req, res) => {
  try {
    const { id } = req.params;
    const { content } = req.body;
    const userId = req.user?.userId;

    const note = await getNoteById(id);
    if (!note || note.length === 0 || note[0].userId !== userId) {
      return res.status(404).json({ error: 'Note not found or access denied' });
    }

    if (!content) {
      return res.status(400).json({ error: 'Content is required' });
    }

    await updateNoteById(content, id);
    const updatedNote = await getNoteById(id);

    return res.status(200).json({ message: 'Note updated', note: updatedNote });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to update note' });
  }
};

// DELETE NOTE (ENSURE USER OWNS IT)
const deleteNote = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user?.userId;
    const role = req.user?.role;

    if (role === "admin") {
        // Admins can delete any note
        await removeNoteById(id);
        return res.status(200).json({ message: 'Note deleted successfully' });
    }

    // Regular users can only delete their own notes

    const note = await getNoteById(id);
    if (!note || note.length === 0 || note[0].userId !== userId) {
      return res.status(404).json({ error: 'Note not found or access denied' });
    }

    await removeNoteById(id);

    return res.status(200).json({ message: 'Note deleted successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to delete note' });
  }
};

module.exports = {
  createNote,
  getNotes,
  getNote,
  updateNote,
  deleteNote,
  getAllNotesForAdmin
};
