import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import NoteCardContainer from '../layout/NoteCardContainer';
import { getTrashedNotes } from '../Services/apiService'; 

function Trash () {
  const [trashList,setTrashList]=useState([])

  useEffect(()=>{
    async function fetchTrashedNotes() {
      try {
        const response= await getTrashedNotes()
        setTrashList(response.data.data.filter(note => note.is_trash)); 
      } catch (error) {
        console.error('Error fetching trashed notes:', error.message);
      }
    }
    fetchTrashedNotes();
  }, []);
  
  const handleUpdateList = (updatedNote, action) => {
    if (action === "restore" || action === "delete") {
      setTrashList(trashList.filter(note => note.id !== updatedNote.id));
    }
  };

  return (
    <Box className="archive-box">
      {trashList.map(note => (
        <NoteCardContainer key={note.id} noteDetails={note} updateList={handleUpdateList} container="trash" />
      ))}
    </Box>
  );
}


export default Trash;
