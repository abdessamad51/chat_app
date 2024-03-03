// First we need to import axios.js
import axios from 'axios';
// Next we make an 'instance' of it
let user = null
if (localStorage.getItem("user")) {
    user =  JSON.parse(localStorage.getItem("user"));
}
const instance = axios.create({
// .. where we make our configurations
    baseURL: process.env.React_APP_URL
});

// Where you would set stuff like your 'Authorization' header, etc ...
instance.defaults.headers.common['Authorization'] = user ? `Bearer ${user.token}` : '';

export default instance;