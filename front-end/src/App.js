// import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import './App.css';
// import Master from './components/Master';
import Login from './pages/Login/Login.js';
import { BrowserRouter, Route, Routes,Navigate} from 'react-router-dom';
import SingUp from './pages/SignUp/SignUp.js';
import Friends from "./pages/Friends/Friends.js";
import Chats from "./pages/Chats/Chats.js";
import useAuthContext from './contexts/AuthContext.js';
import { useState } from 'react';



function App() {
  const {user} = useAuthContext();
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
