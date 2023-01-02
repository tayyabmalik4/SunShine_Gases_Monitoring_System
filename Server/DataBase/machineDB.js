
import mqtt from 'mqtt'
import mongo from 'mongodb'
import moment from 'moment'
import machine from '../model/machineModel.js'

const machineDB = () => {

    // const url = 'mongodb://localhost:27017/';
    // const mongoclient = mongo.MongoClient;

    const client = mqtt.connect('mqtt://192.168.0.207::1883');
    // const client = mqtt.connect('mqtt://192.168.0.139:1883');
    client.on('connect', () => {
        if (client.connected) {
            console.log("MQTT protocol is connected successfully");
        }
        client.subscribe('Data/sunshine/Dev')
    })

    client.on('message', async (topic, message) => {
        var stringBuf = message.toString('utf-8');
        var myobj3 = JSON.parse(stringBuf);
        // console.log("something happen", myobj3)
        // if (myobj3.temp > 0 && myobj3.temp < 100 && myobj3.humidity > 0 && myobj3.humidity < 100) {
            var datetime = new Date().getTime();
            let date = moment(datetime).format('DD-MM-YYYY');
            let time = moment(datetime).format('HH:mm')
            try {
                let { Device_ID, pm, co2, co, sox, nox, MQTT_ID, client_name } = myobj3
                const FindMeter = await machine.findOne({ Device_ID: Device_ID })
                if (FindMeter) {
                    let gettimechk = FindMeter.meterReadings
                    let chktime = gettimechk[gettimechk.length-1]?.datetime
                    if(datetime<chktime+120000){
                        const addData = await machine.findOneAndUpdate({ Device_ID: Device_ID,"meterReadings":gettimechk[gettimechk.length-1] }, { $set: { "meterReadings.$": { pm, co2,co,sox,nox, date, time,datetime} } } )
                        console.log("Record Updated SuccessFully");
                    }else{
                    const addData = await machine.findOneAndUpdate({ Device_ID: Device_ID }, { $push: { meterReadings: { pm, co2,co,sox,nox, date, time,datetime} } })
                    console.log("Record Inserted SuccessFully");
                    }
                } else {
                    console.log("Meter ID is not found")
                    // const addMeter = new MeterModal({
                    //     meter_id,
                    //     _groupName,
                    //     client_name,
                    //     meterName: "Temperature | Humidity",
                    //     meterReadings: [{ temp, humidity, date, time, datetime }]
                    // })
                    // await addMeter.save()
                    // console.log("New Meter & Record Inserted SuccessFully");
                }
            } catch (err) {
                console.log("-----MQTT DB ERROR-----", err);
            }
        // }
        // else {
        //     console.log("Temperature and Humidity is Out of Range")
        // }
    })
}
export default machineDB;