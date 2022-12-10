import mongoose from 'mongoose'
import temphumidDB from './temphumidDB.js'
// import dotenv from 'dotenv'
// import machineDB from './machineDB.js'

// mongoose.set("debug" , true)

const connection = async () =>{
    // const URL = 'mongodb://localhost:27017/pdh'
    // const URL = 'mongodb://localhost:27017/tw'
    const URL = "mongodb+srv://tayyabwithhunch:hunchwithtayyab@pdh.w4crlr5.mongodb.net/sunshine?retryWrites=true&w=majority"
    try {
        await mongoose.connect(URL, {useUnifiedTopology:true , useNewUrlParser:true})
        // await mongoose.connect(URL, {useUnifiedTopology:true , useNewUrlParser:true})
        console.log("DataBase Connected SuccessFully")
        temphumidDB()
        // machineDB()
    } catch (error) {
         console.log("Error While connecting wit the database ", error);
    }
}

export default connection;