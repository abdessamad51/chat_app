import axios from 'axios';
import { useState,useEffect }  from "react";
// import Main from './Main';
import ReactDOM from "react-dom";
import Content from './Content';


const GetConversation = (url) => {

    const [conversations,setConversations] = useState(null);
    const [getData,setDetData] = useState(false);

    useEffect(() => {
        axios.get(url)
        .then((res) => { 
            setConversations(res.data);
            setDetData(true)  
        }); 
    },[url]);
   
    const showConversation = (e,id) => {
        let url = "http://localhost:8000/api/conversations/"+id;
        e.preventDefault();
        axios.get(url)
        .then((res) => { 
          ReactDOM.render(<Content messages = {res.data}/>,document.getElementById("main")) 
        }); 
       
      
    };
    return {conversations,getData,showConversation}
}

export default GetConversation;
