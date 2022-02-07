const mongoose= require('mongoose')
require('dotenv').config()

// const mongoURI='mongodb://localhost:27017/mernp?readPreference=primary&appname=MongoDB%20Compass&ssl=false'
const mongoURI='mongodb+srv://Keshav:Keshav009@cluster0.7nlcy.mongodb.net/Notes?retryWrites=true&w=majority'
// const mongoURI=process.env.mongoURI;

const connectToMongo=()=>{
    mongoose.connect(mongoURI,()=>{
        console.log("Connect to mongo successfully...");
    } )
}

module.exports =connectToMongo;