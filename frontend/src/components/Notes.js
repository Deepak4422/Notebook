import React, { useEffect,useState } from 'react'
import notecontext from '../Contexts/Notes/Notecontext'
import { useContext,useRef } from 'react';
import Noteitem from './Noteitem';
import { useNavigate } from 'react-router-dom';
import AddNotes from './AddNotes'

const Notes = (props) => {
  let history=useNavigate();
  
    const context=useContext(notecontext);
   
    const [note,setNote]=useState({_id:"",title:"",description:"",tag:""})
    const {notes,getNote,editNote}=context;
 
    const {alertShow}=props;


    useEffect(()=>{
     
      if(localStorage.getItem('token'))
      {
      getNote();
      }
      else{
      history('/login');
      }
    },[]);

    
    const refclose=useRef(null);


   const updateNote=(note)=>{
   
  
     
   }


  
 const onpress=(e)=>{

editNote(note.id ,note.title,note.description,note.tag);
refclose.current.focus();

 }


 const onChange=(e)=>{
  setNote({...note, [e.target.id]:e.target.value})
 }

  return (
    < >
     
     <AddNotes  alertShow={alertShow}/>

     

<div className="modal fade" id="exampleModal"  aria-labelledby="exampleModalLabel" >
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
        <button type="button"  onClick={onpress} className="btn btn-primary">Edit Note</button>
      </div>
    </div>
  </div>
</div>


      <div className="row my-3">
      <h2>You Notes</h2>
        <div className="container">
       
        {notes.length===0 && "Note is not present"}
        </div>
      {notes.map(note=>{
        return <Noteitem key={note._id} updateNote={updateNote} notes={note} />
      })}
      </div>
    </>
  )
}

export default Notes
