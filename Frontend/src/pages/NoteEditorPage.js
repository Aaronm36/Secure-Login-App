import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/api";
import "../styles/NoteEditorPage.css";

export default function NoteEditorPage() {
  const { id } = useParams();
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const res = await api.get(`/notes/${id}`);
        setContent(res.data.note.content);
      } catch {
        alert("Failed to fetch note");
      }
    };
    fetchNote();
  }, [id]);

  const handleUpdate = async () => {
    try {
      await api.put(`/notes/${id}`, { content });
      alert("Note updated!");
      navigate("/");
    } catch {
      alert("Failed to update note");
    }
  };

  return (
    <div className="note-editor">
      <h2>Edit Note</h2>
      <textarea value={content} onChange={(e) => setContent(e.target.value)} rows="6" />
      <button onClick={handleUpdate}>Save</button>
    </div>
  );
}