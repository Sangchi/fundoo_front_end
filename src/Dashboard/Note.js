import React, { useState, useEffect } from 'react';
import AddNoteContainer from '../layout/AddNoteContainer';
import NoteCardContainer from '../layout/NoteCardContainer';
import { getNote ,updateNote} from '../Services/apiService';

function Notes() {
  const [notelist, setNotelist] = useState([]);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    async function fetchNotes() {
      try {
        const response = await getNote(); 
        setNotelist(response.data.filter(note => !note.is_archive && !note.is_trash));
      } catch (error) {
        console.error('Error fetching notes:', error.message);
      } finally {
        setLoading(false); 
      }
    }

    fetchNotes();
  }, []);

  function handleUpdateList(data, action) {
    if (action === "add") {
      setNotelist([data, ...notelist]); 
    } else if (action === "archive" || action === "trash") {
      setNotelist(notelist.filter(note => note.id !== data.id));
    } else if (action === "update" || action==='color'){           
      
      setNotelist(notelist.map(note => (note.id === data.id ? { ...note, ...data } : note)));
    }
  }


  if (loading) {
    return <div>Loading...</div>; 
  }

  async function handleEditNote(updatedNote) {
    try {
      await updateNote(updatedNote.id, updatedNote); 
      handleUpdateList(updatedNote, 'update');
    } catch (error) {
      console.error('Error updating note:', error.message);
    }
  }

  return (
    <>
      <AddNoteContainer updateAddList={handleUpdateList} />
      <div className="note-card-container">
        {notelist.map((note, index) => (
          <NoteCardContainer  noteDetails={note} updateList={handleUpdateList} onEdit={handleEditNote}  />
        ))}
      </div> 
    </>
  );
}

export default Notes;
