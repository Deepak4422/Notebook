
import './App.css';
import Notestate from './Contexts/Notes/Notestate';
import { BrowserRouter as Router,Routes, Route} from 'react-router-dom';
import {useState} from 'react'

import Navbar from './components/Navbar';
import About from './components/About';
import Home from './components/Home';
import Alert from './components/Alert';
import Login from './components/Login';
import Signup from './components/Signup';

function App() {
  

  const [alert, setAlert]=useState(null);
  const alertShow=(message, type)=>{
    setAlert({
      message: message,
      type: type
    });
    setTimeout(()=>{
      setAlert(null)
    },3000)
  }
  
  return (
    <>
   <Notestate>
   <Router> 
        <Navbar/>
       { alert && <Alert alert={alert}/>}
        <div className="container">
        <Routes>
                <Route exact path='/' element={< Home alertShow={alertShow}  />}></Route>
                <Route exact path='/about' element={< About />}></Route>
                <Route exact path="/login" element={< Login alertShow={alertShow} />}></Route>
                <Route exact path="/signup" element={< Signup alertShow={alertShow}/>}></Route>
        </Routes>
        </div>
    </Router>
   </Notestate>
    </>
  );
}

export default App;
