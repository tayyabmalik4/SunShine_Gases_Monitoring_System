import mongoose from 'mongoose'
// import temphumidDB from './temphumidDB.js'
import dummyVal from './dummyVal.js'
// import dotenv from 'dotenv'
import machineDB from './machineDB.js'

// mongoose.set("debug" , true)

const connection = async () =>{
    // const URL = 'mongodb://localhost:27017/pdh'
    // const URL = 'mongodb://localhost:27017/tw'
    const URL = "mongodb+srv://hunch:hunch@hunch.vysl720.mongodb.net/sunshine?retryWrites=true&w=majority"
    try {
        await mongoose.connect(URL, {useUnifiedTopology:true , useNewUrlParser:true})
        // await mongoose.connect(URL, {useUnifiedTopology:true , useNewUrlParser:true})
        console.log("DataBase Connected SuccessFully")
        // temphumidDB()
        // setInterval(() => {
        //     dummyVal()
            
        // }, 60000);
        machineDB()
    } catch (error) {
         console.log("Error While connecting wit the database ", error);
    }
}

export default connection;