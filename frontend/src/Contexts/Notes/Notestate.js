import React, { useState } from "react";
import notecontext from "./Notecontext";
const Notestate = (props) => {
    const host="http://localhost:5600"
  const s1 = [ ];
  const [notes, setNotes] = useState(s1);

  // get the notes from mongodB
  const getNote =async () => {
    const response = await fetch(`${host}/api/notes/fetchnotes`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token")
            
        },
       
      });
      const json=await response.json();
      if(json.success)
      {
        setNotes(json);
      }
      
    }

  const addNote =async (title, description, tag) => {
    const response = await fetch(`${host}/api/notes/addnotes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token":localStorage.getItem("token"),
        },
        body: JSON.stringify({title,description,tag}),
      });
    
      console.log(await response.json());

    const s = {
      "_id": Math.random() * 100,
      title: title,
      description: description,
      " tag": tag,
    };
    setNotes(notes.concat(s));
  };
  //edit a note
  const editNote = async (id, title, description, tag) => {
    const response = await fetch(`${host}/api/notes/updatenotes/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token":localStorage.getItem("token"),
       
      },
      body: JSON.stringify({title,description,tag}),
    });
    await response.json(); 
    
 const newNote=JSON.parse(JSON.stringify(notes));
    for (let index = 0; index < newNote.length; index++) {
      const element = notes[index];
      if (element._id === id) {
        newNote[index].title = title;
        newNote[index].description = description;
        newNote[index].tag = tag;
        break;
      }
    }
  setNotes(newNote);
  };
  //delete a note
  const deleteNote = async (id) => {
    await fetch(`${host}/api/notes/deletenotes/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token":localStorage.getItem("token"),
      },
      
    });
    setNotes(
      notes.filter((note) => {
        return note._id !== id;
      })
    );
  };

  return (
    <notecontext.Provider
      value={{ notes, setNotes, addNote, editNote, deleteNote, getNote }}
    >
      {props.children}
    </notecontext.Provider>
  );
};
export default Notestate;
