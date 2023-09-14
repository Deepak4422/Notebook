import React from 'react'
import Notes from './Notes'
import AddNotes from './AddNotes'
//import { Link } from 'react-router-dom';
const Home = (props) => {
  const {alertShow}=props;
  return (
    <div>
      <AddNotes  alertShow={alertShow}/>
      <Notes  alertShow={alertShow}/>
    </div>
    
  )
}

export default Home
