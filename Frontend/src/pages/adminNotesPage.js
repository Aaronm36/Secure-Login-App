import React, { useEffect, useState } from "react";
import api from "../api/api";
import { jwtDecode } from "jwt-decode";

export default function AdminNotesPage() {
    const [notes, setNotes] = useState([]);
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
      const res = await api.get("/notes/admin"); // backend will filter based on role
      setNotes(res.data.notes);
    } catch (err) {
      alert(err.response?.data?.error || "Failed to fetch notes");
    }
  };

  return (
    <div className="notes-container">
      <h2>All User Notes (Admin)</h2>
      {notes.length === 0 ? (
        <p>No notes found.</p>
      ) : (
        notes.map(note => (
          <div key={note.id} className="note-item">
            <p><strong>{note.username}:</strong> {note.content}</p>
          </div>
        ))
      )}
    </div>
  );
}
