import React from 'react'
import { useContext} from 'react'
//import {Link } from 'react-router-dom';
import notecontext from '../Contexts/Notes/Notecontext'
const About = () => {
    const a=useContext(notecontext);
   
  return (

    <div>
      This is about  Deepak and his age is 23
    </div>
  )
}

export default About
 