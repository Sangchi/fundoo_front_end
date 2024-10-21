import React, { useState } from "react"; 
import './NoteCardContainer.css';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PaletteIcon from '@mui/icons-material/Palette';
import ImageIcon from '@mui/icons-material/Image';
import ArchiveIcon from '@mui/icons-material/Archive';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { IconButton, Menu, MenuItem, Typography, Modal } from '@mui/material';
import UnarchiveIcon from "@mui/icons-material/Unarchive";
import RestoreIcon from "@mui/icons-material/Restore";
import DeleteIcon from "@mui/icons-material/Delete";
import {  changeNoteColorApi, deleteNote, updateNote ,trashNote,archiveNote} from '../Services/apiService'; 
import AddNoteContainer from "./AddNoteContainer";
import './Colorpalet.scss';

const NoteCardContainer = ({ noteDetails, updateList, container }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [openEditNote, setOpenEditNote] = useState(false);
  const [colorAnchorEl, setColorAnchorEl] = useState(null);
  const openColorPalette = Boolean(colorAnchorEl);
  
  const handleMoreClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleColorClick = (event) => {
    setColorAnchorEl(event.currentTarget);
  };

  const handleColorClose = () => {
    setColorAnchorEl(null);
  };

  const handleNoteIconsClick = async (action, endpoint = "", color='#ffffff') => {
    try {
      if (action === "delete") {
        await deleteNote(noteDetails.id);
        updateList(noteDetails, "delete");
      } else if (action === "archive") {
        await archiveNote(noteDetails.id);  
        updateList(noteDetails, "archive");  
      } else if (action === "trash") {
        await trashNote(noteDetails.id);
        updateList(noteDetails, "trash");
      } else if (["restore", "unarchive"].includes(action)) {
        const updatedNote = await updateNote(noteDetails.id, { action: endpoint });
        updateList(updatedNote.data, action);
      } else if (action === 'color') {
        await changeNoteColorApi(noteDetails.id, color);
        setColorAnchorEl(null);
        updateList({ ...noteDetails, color: color }, action);
      }
    } catch (error) {
      console.error(`Error handling action ${action}:`, error);
    }
  };

  

  const handleEdit = (data) => {
    setOpenEditNote(false);
    updateList(data, "update");
  };

  return (
    <div className="note-card" style={{backgroundColor: noteDetails.color ? noteDetails.color:'#ffffff'}} >  
      <div onClick={() => setOpenEditNote(true)}>
        
          <div className="note-card-content">
            <Typography variant="h6">{noteDetails.title || 'Untitled'}</Typography>  
            <Typography variant="body2" color="text.secondary">
              {noteDetails.description || 'No content'}
            </Typography>
          </div>
        
      </div>

      <div className="note-actions">
        {container === "trash" ? (
          <>
            <IconButton
              aria-label="restore note"
              onClick={() => handleNoteIconsClick("restore","" ,"toggle_trash")}
              className="icon-hidden"
            >
              <RestoreIcon />
            </IconButton>
            <IconButton
              aria-label="delete note"
              onClick={() => handleNoteIconsClick("delete", "","")}
              className="icon-hidden"
            >
              <DeleteIcon />
            </IconButton>
          </>
        ) : (
          <>
            <IconButton aria-label="set reminder" className="icon-hidden">
              <NotificationsIcon />
            </IconButton>
            <IconButton aria-label="add collaborator" className="icon-hidden">
              <PersonAddIcon />
            </IconButton>
            <IconButton aria-label="change color" className="icon-hidden" onClick={handleColorClick}>
              <PaletteIcon />
            </IconButton>
            <IconButton aria-label="add image" className="icon-hidden">
              <ImageIcon />
            </IconButton>
            {container === "archive" ? (
              <IconButton
                aria-label="unarchive note"
                onClick={() =>  handleNoteIconsClick("unarchive", "", "toggle_archive")}
                className="icon-hidden"
              >
                <UnarchiveIcon />
              </IconButton>
            ) : (
              <IconButton
                aria-label="archive note"
                onClick={() => handleNoteIconsClick("archive", "", "toggle_archive")}
                className="icon-hidden"
              >
                <ArchiveIcon />
              </IconButton>
            )}
            <IconButton
              aria-label="more options"
              className="icon-hidden"
              onClick={handleMoreClick}
            >
              <MoreVertIcon />
            </IconButton>
          </>
        )}

        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
        >
          <MenuItem onClick={() => handleNoteIconsClick("trash", "", "toggle_trash")}>
            Delete
          </MenuItem>
        </Menu>
        <Menu
            anchorEl={colorAnchorEl}
            open={openColorPalette}
            onClose={handleColorClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
          >
            <div className="color-palate-cnt">
              <div
                className="col1"
                onClick={() => handleNoteIconsClick("color","" ,"#FFFFFF")}
              ></div>
              <div
                className="col2"
                onClick={() => handleNoteIconsClick("color","" ,"#FAAFA8")}
              ></div>
              <div
                className="col3"
                onClick={() => handleNoteIconsClick("color", "","#F39F76" )}
              ></div>
              <div
                className="col4"
                onClick={() => handleNoteIconsClick("color","", "#FFF8B8")}
              ></div>
              <div
                className="col5"
                onClick={() => handleNoteIconsClick("color","", "#E2F6D3")}
              ></div>
              <div
                className="col6"
                onClick={() => handleNoteIconsClick("color", "", "#B4DDD3")}
              ></div>
              <div
                className="col7"
                onClick={() => handleNoteIconsClick("color","", "#D4E4ED")}
              ></div>
              <div
                className="col8"
                onClick={() => handleNoteIconsClick("color", "","#AECCDC")}
              ></div>
              <div
                className="col9"
                onClick={() => handleNoteIconsClick("color","" ,"#D3BFDB")}
              ></div>
              <div
                className="col10"
                onClick={() => handleNoteIconsClick("color","" ,"#F6E2DD")}
              ></div>
              <div
                className="col11"
                onClick={() => handleNoteIconsClick("color", "","#E9E3D4")}
              ></div>
              <div
                className="col12"
                onClick={() => handleNoteIconsClick("color", "","#EFEFF1")}
              ></div>
            </div>
          </Menu>

        <Modal
          open={openEditNote}
          onClose={() => setOpenEditNote(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <div style={{ padding: '20px', backgroundColor: 'none', borderRadius: '8px', outline: 'none' }}>
            <AddNoteContainer
             noteDetails={noteDetails}
             updateList={handleEdit}
             noteColor={noteDetails.color}
            />
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default NoteCardContainer;
