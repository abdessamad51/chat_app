import { login } from "../reducers/authSlice";
import axiosConfig from '../../axios/axiosConfig'
export const login1 = async (Logindata,disptach) => {

    const {email,password} = Logindata;
    try {
        const res = await axiosConfig.post("login",{
            ...Logindata
        });
        let user = {
            user_id : res.data.data.user.id,
            full_name : res.data.data.user.full_name,
            email : res.data.data.user.email,
            token : res.data.data.token,
            image_path : res.data.data.user.image
        }
        localStorage.setItem("user", JSON.stringify(user))
        disptach(login(user))

        return 'success';
    } catch(error) {
       console.log(error);
    }
}
export const register = async (formData,disptach) => {
    try {
        const res = await axiosConfig.post("register",formData,{
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        // console.log(res);
        let user = {
            user_id : res.data.data.user.id,
            full_name : res.data.data.user.full_name,
            email : res.data.data.user.email,
            token : res.data.data.token,
            image_path : res.data.data.user.image
        }
        console.log(user)
        localStorage.setItem("user", JSON.stringify(user))
        disptach(login(user))
    } catch(error) {
       console.log(error);
    }
}


