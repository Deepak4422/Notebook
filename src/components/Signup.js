import React from 'react'
import { useState } from 'react'
import {useNavigate } from 'react-router-dom'

const Signup = () => {
    const [sign, setSign]=useState({name:"", email:"", password:""})
    const navigate=useNavigate();
    const onsubmit=async (e)=>{
        
   e.preventDefault();
   const response = await fetch("http://localhost:5600/api/auth/createUser", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({name:sign.name,email:sign.email,password:sign.password}),
          });
          const json=await response.json();
          console.log(json);
          if(json.success)
          {
            localStorage.setItem("token", json.authtoken);
            navigate("/");
          }
          else{
            alert("Invalid details");
          }


    }
    const onchange=(e)=>{
      setSign({...sign, [e.target.id]:e.target.value})
    }
  return (
    <div className="container">
        <form onSubmit={onsubmit} >
        <div className="mb-3">
    <label htmlFor="name" className="form-label">Name</label>
    <input type="text" className="form-control" onChange={onchange} id="name" aria-describedby="emailHelp"/>
  </div>
  <div className="mb-3">
    <label htmlFor="email" className="form-label">Email address</label>
    <input type="email" className="form-control" onChange={onchange} id="email" aria-describedby="emailHelp"/>
  </div>
  <div className="mb-3">
    <label htmlFor="password" className="form-label">Password</label>
    <input type="password" className="form-control" onChange={onchange} id="password" minLength={5} required/>
  </div>
  
  <button type="submit" className="btn btn-primary">Submit</button>
</form>
     
    </div>
  )
}

export default Signup
