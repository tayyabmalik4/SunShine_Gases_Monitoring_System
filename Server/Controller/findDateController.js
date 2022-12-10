import meter from '../model/meterModel.js'
import moment from 'moment'

export const getbetweendate = async (req, res) =>{

    const dategetting = req.body 
    // console.log(dategetting);
    let sdate = dategetting.date.startDate
    let edate = dategetting.date.endDate
    let MQTT_ID = dategetting.MQTT_ID

    let epStartDateTime = new Date (sdate).getTime()
    let epStartDate = new Date(epStartDateTime - 18000000).getTime()
    let commingEpEndDate = new Date(edate).getTime()
    let epEndDate = new Date(commingEpEndDate + 68400000).getTime()

    
    // let sd = Date(sdate)
    // let ed = Date(edate)
    // let sd = new Date(sdate)
    // let ed = new Date(edate)
    // let ssd = moment(sd)
    // let eed = moment(ed)
    // console.log("start date in epoch---------",epStartDate)
    // console.log("end date in epoch---------",epEndDate)

    try {
        const datetimedata = await meter.find() 
        let filterData = [];
        let process = datetimedata.map((data)=>{
            let commingEpTime = new Date(data.datetime).getTime()
            // console.log(commingEpTime);
            if((commingEpTime >= epStartDate && commingEpTime <= epEndDate) && data.value.MQTT_ID == MQTT_ID){
                filterData.push(data)
            }
        }) 
        await Promise.all(process)
        // console.log("Report is fatched by start date and end date")
        res.status(200).json(filterData)
    } catch (error) {
        res.status(404).json({message:error.message})
    }
}
