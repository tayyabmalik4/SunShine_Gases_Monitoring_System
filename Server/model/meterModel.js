import mongoose from "mongoose";

export const meterModel = mongoose.Schema({value:{
    MQTT_ID : String,
    Device_ID:String,
    pm : String,
    co2 : String,
    co : String,
    nox : String,
    sox : String,
},
date: String,
time:String,
datetime:String,
},)

const meter = mongoose.model('meter', meterModel)

export default meter
// import mongoose from "mongoose";

// export const meterModel = mongoose.Schema({value:{
//     MQTT_ID: String,
//     temp:String,
//     humidity:String,
//     Device_ID:String,
//     client_name:String,
// },
// date: String,
// time:String,
// datetime:String,
// },)

// const meter = mongoose.model('meter', meterModel)

// export default meter