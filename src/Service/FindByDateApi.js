import axios from '../AxiosInstance';
import { dashboardActions } from '../Redux/Slice/Dashboard/DashboardSlice';



export const finddate = async (dispatch,date,MQTT_ID) => {
    // console.log("start date is----------",date.startDate, "end date is---------",date.endDate)
        try {
            let response = await axios.post(`/finddate`,{date: date, MQTT_ID : MQTT_ID});

            dispatch?.(dashboardActions.setDateData(response?.data))
        } catch (error) {
            console.log(`Error While calling Date API`, error);
        }
};