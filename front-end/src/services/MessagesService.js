import axios from 'axios';
import useAuthContext from '../contexts/AuthContext';
export const SendMessages = (e, conversation_id) => {
  const {user} = useAuthContext();
  console.log(user);
  e.preventDefault();
 
  axios
    .post(
      "http://localhost:8000/api/messages",
      {
        message: `${e.target.elements.message.value}`,
        conversation_id: conversation_id,
      },
      {
        headers: {
          Authorization: `Bearer ${user.token}`, // Include the token in the request headers
        },
      }
    )
    .then((res) => {
      alert("send")
    }).catch((error) => {
        console.error(error);
    });
};