import meter from "../model/meterModel.js";

export const meterPostController = async(req,res)=>{

    const meterbody = req.body;
    // console.log("Meter Body is: ", meterbody)
    const newMeter = new meter(meterbody)
    try {
        await newMeter.save()
        // console.log("Meter Data is Posted SuccessFully")
        res.status(200).json(newMeter)
    } catch (error) {
        res.status(409).json({message : error.message})
    }
}
export const meterGetController = async(req,res)=>{

    const meterbody = req.body;
    // console.log("Meter Body is: ", meterbody)
    const MQTT_ID = meterbody.MQTT_ID
    // console.log("mqa",MQTT_ID);

    try {
        const meterdata = await meter.find({"value.MQTT_ID":MQTT_ID})
        // console.log("Meter Data Fatched SuccessFully")
        res.status(200).json(meterdata)
    } catch (error) {
        res.status(409).json({message : error.message})
    }
}