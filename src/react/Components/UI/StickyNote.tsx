import { useRef } from "react";
import "./StickyNote.css";
import { Bold } from "lucide-react";

interface StickyNoteProps {
  note: { id: number; text: string };
  onChange: (updated: { id: number; text: string }) => void;
  onDelete: (id: number) => void;
}

export default function StickyNote({
  note,
  onChange,
  onDelete,
}: StickyNoteProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  return (
    <div
      className="sticky-note"
      style={{
        position: "relative",
        display: "flex",
        flexDirection: "row",
        height: "auto",
      }}
    >
      <textarea
        ref={textareaRef}
        value={note.text}
        onChange={(e) => onChange({ ...note, text: e.target.value })}
        placeholder="Take a note..."
        name="note"
      />
      <button className="delete-btn" onClick={() => onDelete(note.id)}>
        ×
      </button>
      <div
        className="sticky-note-actions"
        style={{
          position: "absolute",
          bottom: "0",
          left: "0",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          pointerEvents: "none",
        }}
      >
        <div
          style={{
            width: "90%",
            borderTop: "1px solid #e0e0a0",
            margin: "0 auto",
            marginBottom: "2px",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            display: "flex",
            gap: "10px",
            justifyContent: "center",
            opacity: 0,
            transition: "opacity 0.2s",
            pointerEvents: "auto",
          }}
          className="sticky-note-action-icons"
        >
          <Bold style={{ color: "black", width: "20px", height: "20px" }} />
        </div>
      </div>
    </div>
  );
}
