import react from 'react'

const authState = () => {
    let user =  {
        user_id : null,
        full_name : "",
        email: "",
        token : ""
    }
    if (localStorage.getItem("user")) {
        user =  JSON.parse(localStorage.getItem("user"));
    }
    return user;
};


export default authState