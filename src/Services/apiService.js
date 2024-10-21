import axios from 'axios';

const BASE_URL='http://127.0.0.1:8000/user/'

const noteUrl = "http://127.0.0.1:8000/note/notes/";


export const signupLoginApiCall = async (userData,endpoint) => {
    try {
        const response = await axios.post(`${BASE_URL+endpoint}`, userData);
        return response.data;
    } catch (error) {
        // throw error.response ? error.response : new Error("An error occurred during signup");
    }
};


// Create a new note
export const createNote = async (data) => {
    const token = localStorage.getItem("access");
    console.log("token:", token);
  
    let response = await axios.post(noteUrl, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("Note creation response:", response.data);
    return response.data;
  };
  
  // Get a note¸
  export const getNote = async () => {
    const token = localStorage.getItem("access");
    console.log("token:", token);
  
    let response = await axios.get(noteUrl , {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("Note response:", response.data);
    return response.data;
  };
  
  // Update a note by ID
  export const updateNote = async (noteId, data) => {
    const token = localStorage.getItem("access");
  
    try {
      let response = await axios.put(`${noteUrl}${noteId}/`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Note updated successfully:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error updating note:", error);
      throw error;
    }
  };
  
  // Delete a note by ID
  export const deleteNote = async (noteId) => {
    const token = localStorage.getItem("access");
  
    try {
      let response = await axios.delete(`${noteUrl}${noteId}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Note deleted successfully:", response);
    } catch (error) {
      console.error("Error deleting note:", error);
      throw error;
    }
  };

  export const changeNoteColorApi = async (noteId, newColor) => {
    const token = localStorage.getItem("access");
    try{
    let response = await axios.put(`${noteUrl}${noteId}/`, 
    { color: newColor }, 
    {
        headers: {
            
            Authorization: `Bearer ${token}`, 
        },
    });
    return response;
  } catch (error){

  }
};


  
  export const archiveNote = async (noteId) => {
    const token = localStorage.getItem("access");
  
    try {
      let response = await axios.patch(`${noteUrl}${noteId}/archive/`, {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Note archived:", response.data);
      return response;
    } catch (error) {
      console.error("Error archiving note:", error);
      throw error;
    }
  };
  
  
  // Get all archived notes
  export const getArchivedNotes = async () => {
    const token = localStorage.getItem("access");
  
    let response = await axios.get(`${noteUrl}is_archived/`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("Archived notes response:", response.data);
    return response;
  };
  
  // Move a note to trash by ID
  export const trashNote = async (noteId) => {
    const token = localStorage.getItem("access");
  
    try {
      let response = await axios.patch(`${noteUrl}${noteId}/trash/`, {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Note moved to trash:", response.data);
      return response;
    } catch (error) {
      console.error("Error moving note to trash:", error);
      throw error;
    }
  };
  
  // Get all trashed notes
  export const getTrashedNotes = async () => {
    const token = localStorage.getItem("access");
  
    let response = await axios.get(`${noteUrl}is_trashed/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("Trashed notes response:", response.data);
    return response;
  };
