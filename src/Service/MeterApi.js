import axios from '../AxiosInstance'

export const PostMeterData = async (data) =>{
    let resolved = {
        data : null,
        error : null
    }
    try {
        await axios.post(`meterPost`,data)
    } catch (error) {
        resolved.error = "Your Internet is Not Connected"
    }
    return resolved
}
export const GetMeterData = async (data) =>{
    let resolved = {
        data : null,
        error : null
    }
    try {
        const response = await axios.post(`meterGet`,{"MQTT_ID":data})
        resolved.data = response.data
    } catch (error) {
        resolved.error = "Your Internet in Not Connected"
    }
    return resolved
}