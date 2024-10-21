import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import NoteCardContainer from '../layout/NoteCardContainer';
import { getArchivedNotes } from '../Services/apiService';

function Archive () {
  const [archiveList, setArchiveList] = useState([]);

  useEffect(() => {
    async function getArchiveNotes() {
      try {
        const response = await getArchivedNotes()
        setArchiveList(response.data.data.filter(note => note.is_archive)); 
      } 
      catch (error) {
        console.error('Error fetching archived notes:', error.message);
      }
    }
    getArchiveNotes();
  }, []);

  const handleUpdateList = (updatedNote, action) => {
    if (action === "unarchive") {
      setArchiveList(archiveList.filter(note => note.id !== updatedNote.id));
    }
  };
  
  return (
    <Box className="archive-box">
      {archiveList.map(note => (
        <NoteCardContainer key={note.id} noteDetails={note} updateList={handleUpdateList}  container="archive"/>
      ))}
    </Box>
  );
}

export default Archive;
