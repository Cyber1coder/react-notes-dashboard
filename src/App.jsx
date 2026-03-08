import { useState, useEffect, useRef, useMemo } from "react";
import { NotesContext } from "./NotesContext";

function App() {
  const [notes, setNotes] = useState([]);
  const [noteInput, setNoteInput] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(null);
  const inputRef = useRef(null);

  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem("notes"));
    if (savedNotes) {
      setNotes(savedNotes);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const addNote = () => {
    if (noteInput === "") return;
    setNotes([...notes, noteInput]);
    setNoteInput("");
  };

  const totalNotes = useMemo(() => {
    return notes.length;
  }, [notes]);

  return (
    <NotesContext.Provider value={{ notes }}>
      <div id="main">
        <h2>Notes Dashboard</h2>

        <input
          ref={inputRef}
          value={noteInput}
          onChange={(e) => setNoteInput(e.target.value)}
          placeholder="Enter note"
        />

        <button onClick={addNote}>Add Note</button>

        <h3>Total Notes: {totalNotes}</h3>

        <ul>
          {notes.map((note, index) => (
            <li
              key={index}
              onClick={() => setSelectedIndex(index)}
              style={{
                backgroundColor: selectedIndex === index ? "yellow" : "white",
              }}
            >
              {note}
            </li>
          ))}
        </ul>
      </div>
    </NotesContext.Provider>
  );
}

export default App;
