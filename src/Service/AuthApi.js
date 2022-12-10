import axios from '../AxiosInstance';



export const signup = async (signupdata) =>{
    try {
        return await axios.post(`/signup`, signupdata);
    } catch (error) {
        console.log(`Error While calling Signup API `, error)
    }
}

export const login = async (logindata) =>{
    try {
        return await axios.post(`/login`,logindata)
    } catch (error) {
        console.log(`Error While Calling Login API`, error)
    }
}