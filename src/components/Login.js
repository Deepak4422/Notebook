import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

function Login() {
    const [user, setUser]=useState({email:"", password:""})
    let history=useNavigate();
    const onsubmit=async(e)=>{
        e.preventDefault();
        const response = await fetch("http://localhost:5600/api/auth/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({email:user.email,password:user.password}),
          });
          const json=await response.json();
          console.log(json);
          if(json.success)
          {
            localStorage.setItem('token', json.authtoken);
            history('/');
          }
          else{
            alert("Teri maa ki ");
          }
          
        
    }
    const onchange=(e)=>{
        setUser({...user,[e.target.id]:e.target.value})
    }
  return (
    <div>
      
      <form  onSubmit={onsubmit}>
  <div className="mb-3">
    <label htmlFor="email" className="form-label">Email address</label>
    <input type="email" className="form-control" id="email" onChange={ onchange} aria-describedby="emailHelp" />
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="password" className="form-label">Password</label>
    <input type="password" className="form-control" onChange={onchange} id="password" />
  </div>
  
  <button type="submit"  className="btn btn-primary">Submit</button>
</form>

    </div>
  )
}

export default Login
