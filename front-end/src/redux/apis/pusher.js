import Pusher from "pusher-js";
import Echo from "laravel-echo";

export const connectToPusher = () => {
    let user = JSON.parse(localStorage.getItem("user"));
    return  window.Echo = new Echo({
         broadcaster: "pusher",
         key: process.env.React_APP_PUSHER_KEY,
         cluster: process.env.React_APP_PUSHER_CLUSTER,
         encrypted: true,
         // authEndpoint: 'http://localhost:8000/broadcasting/auth',
         auth: {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
         },
      });
  }