import axios from '../AxiosInstance';

export const DummyValApi = async (data) =>{
    let resolved = {
        data : null,
        error : null
    }
    try {
        await axios.post(`dummyValPost`,data)
    }catch(error){
        resolved.error = "Your Internet is Not Connected"
    }
    return resolved
}