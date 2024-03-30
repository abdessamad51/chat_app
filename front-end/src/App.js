// import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import './App.css';
// import Master from './components/Master';
import Login from './pages/Login/Login.js';
import { BrowserRouter, Route, Routes,Navigate} from 'react-router-dom';
import SingUp from './pages/SignUp/SignUp.js';
import Friends from "./pages/Friends/Friends.js";
import Chats from "./pages/Chats/Chats.js";
import Notifications from './pages/Notifications/Notifications.js';
import {useSelector} from 'react-redux'




function App() {
  const user = useSelector(state => state.auth.user)
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/* add routers */}
          <Route exact path="/login" element={user.token != "" ? <Navigate to="/" /> : <Login /> } />
          {/* <Route path="/home" element={<Master />} /> */}
          <Route  exact path="/singUp" element={user.token != "" ? <Navigate to="/" /> : <SingUp /> } />
          <Route exact path="/" element= {  user.token != "" ? <Chats /> : <Navigate to="/login" /> } />
          <Route exact path="/friends" element={user.token != "" ? <Friends /> :  <Navigate to="/login" />  } />
          <Route exact path="/notifications" element={ user.token != "" ?  <Notifications /> : <Navigate to="/login" />  } />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
