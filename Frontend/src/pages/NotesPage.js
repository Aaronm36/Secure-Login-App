import React, { useEffect, useState } from "react";
import api from "../api/api";
import { Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import "../styles/NotesPage.css";


export default function NotesPage() {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");
  const [userId, setUserId] = useState(null);
  const [role, setRole] = useState(null);

  useEffect(() => {
    // Get JWT from localStorage and decode it
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwtDecode(token);
      setUserId(decoded.userId);
      setRole(decoded.role);
    }

    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const res = await api.get("/notes"); // backend will filter based on role
      setNotes(res.data.notes);
    } catch (err) {
      console.error("Failed to fetch notes:", err);
      alert("Failed to fetch notes");
    }
  };

  const addNote = async () => {
    try {
      await api.post("/notes", {
        content: newNote,
        content_hash: "N/a",
        signature: "N/a",
      });
      setNewNote("");
      fetchNotes();
    } catch (err) {
      console.error("Error adding note:", err);
      alert(err.response?.data?.error || "Failed to add note");
    }
  };

  const deleteNote = async (id) => {
    try {
      await api.delete(`/notes/${id}`);
      fetchNotes();
    } catch (err) {
      console.error("Error deleting note:", err);
      alert(err.response?.data?.error || "Failed to delete note");
    }
  };

  return (
    <div className="notes-container">
      <h2>{role === "admin" ? "All Notes" : "Your Notes"}</h2>

      <div className="note-form">
        <input
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          placeholder="Write a note..."
        />
        <button onClick={addNote}>Add Note</button>
      </div>

      {notes.length === 0 ? (
        <p>No notes found.</p>
      ) : (
        notes.map((note) => (
          <div key={note.id} className="note-item">
            <p>{note.content}</p>
            <div>
              <Link to={`/notes/${note.id}`}>Edit</Link>
              {role === "admin" || note.userId === userId ? (
                <button onClick={() => deleteNote(note.id)}>Delete</button>
              ) : null}
            </div>
          </div>
        ))
      )}
    </div>
  );
}
