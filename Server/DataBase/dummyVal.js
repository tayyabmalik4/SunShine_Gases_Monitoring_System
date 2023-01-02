import mqtt from 'mqtt'
import moment from 'moment'
import MeterModal from "../model/meterModel.js"

const dummyVal =async (re1, res) => {
        function getRndInteger(min, max) {
        return Math.floor(Math.random() * (max - min + 1) ) + min;
      }
        
          let dummypm = getRndInteger(6,8)
          let dummyco2 = getRndInteger(6,8)
          let dummyco = getRndInteger(42,46)
          let dummysox = getRndInteger(30,35)
          let dummynox = getRndInteger(14,17)
          let dummynox1 = dummynox/100
        //   console.log("This is dummy value of pm",dummypm,dummyco2,dummyco,dummysox,dummynox1);

          let pmval = dummypm.toString()
          let co2val = dummyco2.toString()
          let coval = dummyco.toString()
          let soxval = dummysox.toString()
          let noxval = dummynox1.toString()
        var myobj2 = {
            "MQTT_ID":"m1",
            "Device_ID": "CELL9000001234",
            "pm" : pmval,
            "co2":co2val,
            "co":coval,
            "sox":soxval,
            "nox": noxval
        }
        // if (myobj3.temp > 0 && myobj3.temp < 100 && myobj3.humidity > 0 && myobj3.humidity < 100) {
            var datetime = new Date();
            let date = moment(datetime).format('DD-MM-YYYY');
            let time = moment(datetime).format('HH:mm')
            try {
                const addReading = new MeterModal({ value: myobj2, date: date, time: time, datetime: datetime})
                await addReading.save()
                console.log("New Meter & Record Inserted SuccessFully")
            } catch (error) {
                console.log("Record Failed By some reason")
            }
    }
export default dummyVal;