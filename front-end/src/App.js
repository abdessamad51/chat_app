// import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import './App.css';
// import Master from './components/Master';
import Login from './components/Login.js';
import { BrowserRouter, Route, Routes,Navigate} from 'react-router-dom';
import SingUp from './components/SingUp';
import Friends from "./components/Friends";
import Chats from "./components/Chtas";
import useAuthContext from './contexts/AuthContext.js';
import { useState } from 'react';
// import {useNavigate } from "react-router-dom";
// import Error_404 from './components/Error_404.js';



function App() {
  const {user} = useAuthContext();


  console.log(user);
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/* add routers */}
          <Route path="/login" element={user ? <Navigate to="/" /> : <Login /> } />
          {/* <Route path="/home" element={<Master />} /> */}
          <Route path="/singUp" element={user ? <Navigate to="/" /> : <SingUp /> } />
          <Route exact path="/" element= {user ? <Chats /> :  <Navigate to="/login" />  } />
          <Route exact path="/friends" element={user ? <Friends /> :  <Navigate to="/login" />  } />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
