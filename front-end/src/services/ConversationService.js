import axios from 'axios';
import { useState,useEffect }  from "react";
// import Main from './Main';
import ReactDOM from "react-dom";
import Content from '../components/Content';
import StartConversation from '../components/StartConversation';
import useAuthContext from '../contexts/AuthContext.js'


export  const GetConversation = () => {

   
    const [conversations,setConversations] = useState(null);
    const [getData,setDetData] = useState(false);
    const {user} = useAuthContext();

    useEffect(() => {
        // const user = JSON.parse(localStorage.getItem("user"));
        
        axios.get("http://localhost:8000/api/conversations/",{
            headers : {
             Authorization: `Bearer ${user.token}` // Include the token in the request headers
            }
        })
        .then((res) => { 
            setConversations(res.data);
            setDetData(true)  
        }); 
    },[user]) 
    return {conversations,getData}
}

export const ShowConversation = (e,id,conversation_name,user,content=null) => {
    // const {user} = useAuthContext();
  
        axios.get("http://localhost:8000/api/conversations/"+id,{
            headers : {
             Authorization: `Bearer ${user.token}` // Include the token in the request headers
            }
        })
        .then((res) => { 
          ReactDOM.render(<Content messages = {res.data} conversation_id = {id}  conversation_name = {conversation_name} user={user}/>,document.getElementById("main")) ;
        }); 

  
};



export  const FriendsData = () => {

    const [conversations,setConversations] = useState(null);
    const [getData,setGetData] = useState(false);
    const {user} = useAuthContext();
    useEffect(() => {
        axios.get("http://localhost:8000/api/conversations/friends",{
            headers : {
             Authorization: `Bearer ${user.token}` // Include the token in the request headers
            }
        })
        .then((res) => { 
            setConversations(res.data);
            setGetData(true)  
        }); 
    },[user]) 
    return {conversations,getData}
}

