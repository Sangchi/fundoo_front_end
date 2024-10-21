import React, { useState, useEffect, useRef } from "react";
import './AddNoteContainer.css';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import BrushIcon from '@mui/icons-material/Brush';
import ImageIcon from '@mui/icons-material/Image';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PaletteIcon from '@mui/icons-material/Palette';
import ArchiveIcon from '@mui/icons-material/Archive';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import UndoIcon from '@mui/icons-material/Undo';
import RedoIcon from '@mui/icons-material/Redo';
import { createNote, updateNote } from "../Services/apiService";
import './Colorpalet.scss';  // Assuming you have a color palette styles

const AddNoteContainer = ({ updateList, noteDetails, updateAddList, noteColor }) => {
  const [isExpanded, setIsExpanded] = useState(noteDetails ? true : false);
  const [title, setTitle] = useState(noteDetails ? noteDetails.title : '');
  const [description, setDescription] = useState(noteDetails ? noteDetails.description : '');
  const [color, setColor] = useState(noteDetails ? noteDetails.color : '#ffffff');
  const [colorAnchorEl, setColorAnchorEl] = useState(null);
  const containerRef = useRef(null);

  const handleInputClick = () => {
    setIsExpanded(true);
  };

  const handleClose = () => {
    setIsExpanded(false);
    setTitle('');
    setDescription('');
    setColor('#ffffff'); 
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        handleClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSubmit = async () => {
    if (title.trim() || description.trim()) {
      const note = { title, description, color };
      try {
        if (noteDetails) {
          await updateNote(noteDetails.id, { title, description, color });
          updateList({ ...noteDetails, ...note }, "update");
        } else {
          const newNote = await createNote(note);
          updateAddList(newNote.data, "add");
        }
      } catch (error) {
        console.error('Error adding/updating note:', error.message);
      }
    }
    handleClose();
  };

  const handleColorClick = (event) => {
    setColorAnchorEl(event.currentTarget);

  };

  const handleColorClose = () => {
    setColorAnchorEl(null);
  };

  const selectColor = (selectedColor) => {
    setColor(selectedColor);
    handleColorClose();
  };

  return (
    <div ref={containerRef}>
      {!isExpanded ? (
        <div className="collapsed-note" onClick={handleInputClick}>
          <input
            type="text"
            placeholder="Take a note..."
            className="collapsed-input"
            value=""
            readOnly
          />
          <div className="collapsed-icons">
            <CheckBoxIcon className="icon" />
            <BrushIcon className="icon" />
            <ImageIcon className="icon" />
          </div>
        </div>
      ) : (
        <div className="expanded-note" style={{ backgroundColor: color }}>
          <input
            type="text"
            placeholder="Title"
            className="note-title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{ backgroundColor: 'transparent' }}
          />
          <textarea
            placeholder="Take a note..."
            className="note-input"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={{ backgroundColor: 'transparent' }}
          />
          <div className="note-footer">
            <div className="icons">
              <NotificationsNoneIcon className="icon" />
              <PersonAddIcon className="icon" />
              <PaletteIcon className="icon" onClick={handleColorClick} />
              <ImageIcon className="icon" />
              <ArchiveIcon className="icon" />
              <MoreVertIcon className="icon" />
              <UndoIcon className="icon" />
              <RedoIcon className="icon" />
            </div>
            <button className="close-btn" onClick={handleSubmit}>Close</button>
          </div>

          {colorAnchorEl && (
            <div className="color-palate-cnt">
              <div className="col1" onClick={() => selectColor("#FFFFFF")}></div>
              <div className="col2" onClick={() => selectColor("#FAAFA8")}></div>
              <div className="col3" onClick={() => selectColor("#F39F76")}></div>
              <div className="col4" onClick={() => selectColor("#FFF8B8")}></div>
              <div className="col5" onClick={() => selectColor("#E2F6D3")}></div>
              <div className="col6" onClick={() => selectColor("#B4DDD3")}></div>
              <div className="col7" onClick={() => selectColor("#D4E4ED")}></div>
              <div className="col8" onClick={() => selectColor("#AECCDC")}></div>
              <div className="col9" onClick={() => selectColor("#D3BFDB")}></div>
              <div className="col10" onClick={() => selectColor("#F6E2DD")}></div>
              <div className="col11" onClick={() => selectColor("#E9E3D4")}></div>
              <div className="col12" onClick={() => selectColor("#EFEFF1")}></div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AddNoteContainer;
