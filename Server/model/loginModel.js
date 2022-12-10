import mongoose from "mongoose";
// import autoIncrement from 'mongoose-auto-increment'

export const loginmodel = mongoose.Schema({
    username : String,
    password : String,
    admin :Boolean,
    date : {type :Date , default: Date.now}
})

// autoIncrement.initialize(mongoose.connection)
// loginmodel.plugin(autoIncrement.plugin, 'auth')

const authh = mongoose.model('auth', loginmodel)

export default authh;