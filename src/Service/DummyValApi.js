import axios from '../AxiosInstance';

export const DummyValApi = async (data) =>{
    let resolved = {
        data : null,
        error : null
    }
    try {
        let response = await axios.post(`dummyValPost`,data)
        resolved.data = response.data
    }catch(error){
        resolved.error = "Your Internet is Not Connected"
    }
    return resolved
}