import React, { useState } from "react";
import StickyNote from "./StickyNote";

export default function StickyNotesBoard() {
  const [notes, setNotes] = useState([{ id: 1, text: "" }]);

  const addNote = () => setNotes([...notes, { id: Date.now(), text: "" }]);
  const updateNote = (updated: { id: number; text: string }) =>
    setNotes(notes.map((n) => (n.id === updated.id ? updated : n)));
  const deleteNote = (id: number) => setNotes(notes.filter((n) => n.id !== id));

  return (
    <div>
      <button onClick={addNote}>+ Add Note</button>
      <div className="notes-board">
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
