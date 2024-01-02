import React from "react";
import { FaArrowRightLong } from "react-icons/fa6";


//onClick={(e) =>  ShowConversation(e,conversation_id,conversation_name)}
const StartConversation = ({conversation_id,conversation_name}) => { 

   return (
     <div className="w-100 h-100 d-flex justify-content-center align-items-center ">
         <a className="btn btn-outline-primary btn-lg btn-block w-50 text-uppercase font-weight-bold" >
           <b>Start conversation </b> <FaArrowRightLong />     
        </a>
    </div>
   );

}

export default StartConversation;