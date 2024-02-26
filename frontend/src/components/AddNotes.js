import React from 'react'
import notecontext from '../Contexts/Notes/Notecontext'
import { useContext,useState } from 'react'


const AddNotes = (props) => {
  const [note,setNote]=useState({title:"",description:"",tag:""})
  const context=useContext(notecontext);
  const {addNote}=context;
  const onChange=(e)=>{
     setNote({...note,[e.target.id]: e.target.value});
  }
  const onpress=(e)=>{
 e.preventDefault();
 addNote(note.title,note.description,note.tag);
 setNote({title:"",description:"",tag:""})
 props.alertShow("Note Added","primary");
  }
  
  return (
    <div>
      <div className="container my-3">
      <h2>
      Add your notes
      </h2>
      <form>
  <div className="mb-3">
    <label htmlFor="title" className="form-label">Title</label>
    <input type="text" className="form-control" id="title" onChange={onChange}  value={note.title} aria-describedby="emailHelp"  minLength={5} required/>
    
  </div>
  <div className="mb-3">
    <label htmlFor="description" className="form-label">Description</label>
    <input type="text" className="form-control"  onChange={onChange} value={note.description} id="description"  minLength={5} required/>
  </div>
  <div className="mb-3">
    <label htmlFor="tag" className="form-label">Tag</label>
    <input type="text" className="form-control" value={note.tag} onChange={onChange} id="tag"/>
  </div>
 
  <button type="submit" disabled={note.title.length<5 ||  note.description.length<5} className="btn " onClick={onpress}>Add</button>
</form>
      </div>
    </div>
  )
}

export default AddNotes
