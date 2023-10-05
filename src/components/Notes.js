import React, { useEffect,useState } from 'react'
import notecontext from '../Contexts/Notes/Notecontext'
import { useContext,useRef } from 'react';
import Noteitem from './Noteitem';
import { useNavigate } from 'react-router-dom';
const Notes = (props) => {
  let history=useNavigate();
  
    const context=useContext(notecontext);
   
    const [note,setNote]=useState({_id:"",title:"",description:"",tag:""})
    
    const {notes,getNote,editNote}=context;
    useEffect(()=>{
      if(localStorage.getItem("token"))
      {
      getNote();
      }
      else{
      history("/login");
      }
    },[]);
    const ref=useRef(null);
    const refclose=useRef(null);
   const updateNote=(notes)=>{
     ref.current.click();
     setNote({id:notes._id, title:notes.title, description:notes.description, tag:notes.tag})
   }
  
 const onpress=(e)=>{
e.preventDefault();

editNote(note.id ,note.title,note.description,note.tag);
refclose.current.click();

 }

 const onChange=(e)=>{
  setNote({...note, [e.target.id]:e.target.value})
 }

  return (
    <div >
     
    
<button type="button" ref={ref} className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
  Launch demo modal
</button>


<div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h1 className="modal-title fs-5" id="exampleModalLabel">Edit note</h1>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
        
          <form onSubmit={onpress}>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">Title</label>
            <input type="text" className="form-control" id="title" onChange={onChange}   aria-describedby="emailHelp" minLength={5} required />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">Description</label>
            <input type="text" className="form-control"  onChange={onChange}  id="description" minLength={5} required/>
          </div>
          <div className="mb-3">
            <label htmlFor="tag" className="form-label">Tag</label>
            <input type="text" className="form-control" onChange={onChange} id="tag"/>
          </div>
          <button type="submit" className="btn btn-primary" >Add</button>
        </form>


      </div>
      <div className="modal-footer">
        <button type="button" ref={refclose}  className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button"  className="btn btn-primary" onClick={onpress}>Edit Note</button>
      </div>
    </div>
  </div>
</div>


      <div className="row my-3">
        <div className="container">
        {notes.length===0 && "Note is not present"}
        </div>
      {notes.map(note=>{
        return <Noteitem key={note._id} updateNote={updateNote} notes={note} />
      })}
      </div>
    </div>
  )
}

export default Notes
