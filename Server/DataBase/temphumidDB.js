import mqtt from 'mqtt'
import moment from 'moment'
import MeterModal from "../model/meterModel.js"

const temphumidDB = () => {
    const client = mqtt.connect('mqtt:15.206.128.//:1883',{username:'hunch',password:'hunch'});
    // const client = mqtt.connect('mqtt://192.168.0.139:1883');
    client.on('connect', () => {
        if (client.connected) {
            console.log("MQTT protocol is connected successfully");
        }
        else {
            console.log("Not Connected any where")
        }
        client.subscribe('Data/sunshine/Dev')


    })

    client.on('message', async (topic, message) => {
        var stringBuf = message.toString('utf-8');
        var myobj3 = JSON.parse(stringBuf);
        // if (myobj3.temp > 0 && myobj3.temp < 100 && myobj3.humidity > 0 && myobj3.humidity < 100) {
            var datetime = new Date();
            let date = moment(datetime).format('DD-MM-YYYY');
            let time = moment(datetime).format('HH:mm')
            try {
                const addReading = new MeterModal({ value: myobj3, date: date, time: time, datetime: datetime})
                await addReading.save()
                console.log("New Meter & Record Inserted SuccessFully")
            } catch (error) {
                console.log("Record Failed By some reason")
            }
            
        // }
        // else {
        //     console.log("Temperature and Humidity is Out of Range")
        // }
    })
}
export default temphumidDB;