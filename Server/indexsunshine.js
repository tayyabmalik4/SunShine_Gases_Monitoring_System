import express from 'express';
import connection from './DataBase/db.js';
import Route from './Router/router.js';
import cors from 'cors';
import bodyParser from 'body-parser'
import path from 'path';

// const indexPath = path.resolve(__dirname, "." , "build" , "index.html")
const app = express();

const hostname = '0.0.0.0'
const port = 4040;
connection();

let __dirname = path.resolve()
app.use(bodyParser.json({extended:true}))
app.use(bodyParser.urlencoded({extended:true}))
app.use(cors())
app.use('/api',Route)

// app.use(express.static("build"))
// app.use(express.static(path.join(__dirname,'build')));
// console.log(__dirname)

// app.get('/*',(req,res)=>{
    //     res.send(path.join(__dirname,'build','index.html'));
    // })
app.use(express.static(path.join(__dirname,'build')));
app.get('/*',(req,res)=>{
    res.sendFile(path.resolve(__dirname,'build','index.html'));
})

app.listen(port,hostname,()=>{
    console.log(`Server is running successfully on PORT ${port}`)
})