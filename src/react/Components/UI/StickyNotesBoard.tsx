import { useState } from "react";
import StickyNote from "./StickyNote";

export default function StickyNotesBoard() {
  const [notes, setNotes] = useState([{ id: 1, text: "" }]);

  const addNote = () => setNotes([...notes, { id: Date.now(), text: "" }]);
  const updateNote = (updated: { id: number; text: string }) =>
    setNotes(notes.map((n) => (n.id === updated.id ? updated : n)));
  const deleteNote = (id: number) => setNotes(notes.filter((n) => n.id !== id));

  return (
    <div>
      <button
        onClick={addNote}
        style={{
          background: "linear-gradient(90deg, #2563eb 0%, #1e40af 100%)",
          color: "#fff",
          border: "none",
          borderRadius: "8px",
          padding: "10px 24px",
          fontSize: "1rem",
          fontWeight: "bold",
          cursor: "pointer",
          boxShadow: "0 2px 8px rgba(37,99,235,0.15)",
          marginBottom: "16px",
          letterSpacing: "0.5px",
        }}
      >
        + <span style={{ color: "#93c5fd" }}>Add Note</span>
      </button>
      <div
        className="notes-board"
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
        }}
      >
        {notes.map((note) => (
          <StickyNote
            key={note.id}
            note={note}
            onChange={updateNote}
            onDelete={deleteNote}
          />
        ))}
      </div>
    </div>
  );
}
