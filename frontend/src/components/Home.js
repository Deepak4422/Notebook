import React from 'react'
import Notes from './Notes'

//import { Link } from 'react-router-dom';
const Home = (props) => {
  const {alertShow}=props;
  return (
    <div>
      
      <Notes  alertShow={alertShow}/>
    </div>
    
  )
}

export default Home
