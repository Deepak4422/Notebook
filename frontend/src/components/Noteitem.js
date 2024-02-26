import React from 'react'
import notecontext from '../Contexts/Notes/Notecontext';
import { useContext } from 'react';

const Noteitem = (props) => {
  const context=useContext(notecontext);
const {deleteNote}=context;
    const {notes,updateNote}=props;
    
 
  
  return (
    <div className='col-md-3'>
      <div className="card" >
  <div className="card-body">
    <h5 className="card-title">{notes.title}</h5>
    <p className="card-text">{notes.description}</p>
   
    <i className="fa-solid fa-trash mx-3 " onClick={()=>{deleteNote(notes._id)}} ></i>
  <i className="fa-solid fa-pencil"  onClick={()=>{updateNote(notes)}} ></i>
  </div>
</div>
    </div>
  )
}

export default Noteitem

