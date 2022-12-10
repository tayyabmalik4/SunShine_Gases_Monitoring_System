import mongoose from "mongoose";

export const meterModel = mongoose.Schema({value:{
    MQTT_ID : String,
    Device_ID:String,
    pm : String,
    co2 : String,
    co : String,
    nox : String,
    sox : String,
    // Power: String,
    // Total_Power : String,
    // Temperature: String,
    // Oil_Pressure : String,
    // Fuel_Level : String,
    // Total_Fuel : String,
    // Total_Hourse:String,
    // Available_Fuel : String,
    // Water_Level : String,
    // Led_Status : String,
    // Sensor_Status : String,
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