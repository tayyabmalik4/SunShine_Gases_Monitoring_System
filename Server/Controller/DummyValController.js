import moment from 'moment'
// import MeterModal from "../model/meterModel.js"
import machine from '../model/machineModel.js';

const DummyValPostController = async (req, res) => {

    var bod = req.body
    var read = bod.reading
    var interval = bod.interval
    console.log(read, "-----------", interval)



    let Device_ID = "CELL9000001234"

    // if (myobj3.temp > 0 && myobj3.temp < 100 && myobj3.humidity > 0 && myobj3.humidity < 100) {

    try {
        const FindMeter = await machine.findOne({ Device_ID: Device_ID })
        if (FindMeter) {
            // let gettimechk = FindMeter.meterReadings
            // let chktime = gettimechk[gettimechk.length - 1]?.datetime
            // if (datetime < chktime + 50000) {
            // const addData = await machine.findOneAndUpdate({ Device_ID: Device_ID, "meterReadings": gettimechk[gettimechk.length - 1] }, { $set: { "meterReadings.$": { pm, co2, co, sox, nox, date, time, datetime } } })
            // console.log("Record Updated SuccessFully");
            // } else {
            // for(let index = 0; index < read; index++){
            let x = 0
            var interr = 60000
            var interrr = interr * interval
            let intervalID = setInterval(async () => {
                var datetime = new Date().getTime();
                let date = moment(datetime).format('DD-MM-YYYY');
                let time = moment(datetime).format('HH:mm')
                function getRndInteger(min, max) {
                    return Math.floor(Math.random() * (max - min + 1)) + min;
                }

                let dummypm = getRndInteger(6, 8)
                let dummyco2 = getRndInteger(6, 8)
                let dummyco = getRndInteger(42, 46)
                let dummysox = getRndInteger(30, 35)
                let dummynox = getRndInteger(14, 17)
                let dummynox1 = dummynox / 100

                let pmval = dummypm.toString()
                let co2val = dummyco2.toString()
                let coval = dummyco.toString()
                let soxval = dummysox.toString()
                let noxval = dummynox1.toString()
                var myobj2 = {
                    "MQTT_ID": "m1",
                    "Device_ID": "CELL9000001234",
                    "pm": pmval,
                    "co2": co2val,
                    "co": coval,
                    "sox": soxval,
                    "nox": noxval
                }
                let { Device_ID, pm, co2, co, sox, nox, MQTT_ID } = myobj2
                if (x < read) {
                    const addData = await machine.findOneAndUpdate({ Device_ID: Device_ID }, { $push: { meterReadings: { pm, co2, co, sox, nox, date, time, datetime } } })
                    console.log("Record Inserted SuccessFully");
                    console.log(x)
                    x++;
                }
                else if (x = read) {
                    clearInterval(intervalID)
                    return console.log("Loop Ended");
                }
                else {
                    clearInterval(intervalID)
                    return console.log("Loop Ended");
                }
            }, interrr);
            // }
            // }
        } else {
            console.log("Meter ID is not found")
        }
    } catch (err) {
        console.log("-----MQTT DB ERROR-----", err);
    }
    // }
    // else {
    //     console.log("Temperature and Humidity is Out of Range")
    // }
    // try {
    //     const addReading = new MeterModal({ value: myobj2, date: date, time: time, datetime: datetime})
    //     await addReading.save()
    //     console.log("New Meter & Record Inserted SuccessFully")
    // } catch (error) {
    //     console.log("Record Failed By some reason")
    // }
}
export default DummyValPostController;