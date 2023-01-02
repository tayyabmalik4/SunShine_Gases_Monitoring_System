import machine from "../model/machineModel.js";

export const meterGetController = async ( req,res )=>{
    const meterbody = req.body;
    const MQTT_ID = meterbody.MQTT_ID

    try {
        const meterdata = await machine.find({MQTT_ID:MQTT_ID})
        res.status(200).json(meterdata)
    } catch (error) {
        res.status(409).json({message : error.message})
    }
}