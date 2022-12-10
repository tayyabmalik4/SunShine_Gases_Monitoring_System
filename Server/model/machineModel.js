import mongoose from "mongoose";

export const machinemodel = mongoose.Schema({
    machineName : String,
    MQTT_ID : String,
    Device_ID : String,
    meterReadings : Array,
    date : {type : Date , default : Date.now},
})

const machine = mongoose.model('machine', machinemodel)

export default machine;