
import mqtt from 'mqtt'
import mongo from 'mongodb'
import moment from 'moment'
import machine from '../model/machineModel.js'

const machineDB = () => {

    // const url = 'mongodb://localhost:27017/';
    // const mongoclient = mongo.MongoClient;

    const client = mqtt.connect('mqtt://192.168.0.127::1883');
    // const client = mqtt.connect('mqtt://192.168.0.139:1883');
    client.on('connect', () => {
        if (client.connected) {
            console.log("MQTT protocol is connected successfully");
        }
        client.subscribe('Data/tw/Dev')
    })

    client.on('message', async (topic, message) => {
        var stringBuf = message.toString('utf-8');
        var myobj3 = JSON.parse(stringBuf);
        // console.log("something happen", myobj3)
        if (myobj3.temp > 0 && myobj3.temp < 100 && myobj3.humidity > 0 && myobj3.humidity < 100) {
            var datetime = new Date();
            let date = moment(datetime).format('DD-MM-YYYY');
            let time = moment(datetime).format('HH:mm')
            try {
                let { Device_ID, temp, humidity, MQTT_ID, client_name } = myobj3
                const FindMeter = await machine.findOne({ Device_ID: Device_ID })
                if (FindMeter) {
                    const addData = await machine.findOneAndUpdate({ meter_id: meter_id }, { $push: { meterReadings: { temp, humidity, date, time,datetime} } }, { new: true })
                    console.log("Record Inserted SuccessFully");
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
            // dbo.collection("mqtt_datas").insertOne({ value: myobj3, date: date, time: time, datetime }, function (err, res) {
            //     if (err) throw err;
            //     console.log("Record Inserted SuccessFully");
            //     db.close();
            // })
        }
        else {
            console.log("Temperature and Humidity is Out of Range")
        }
    })
}
export default machineDB;