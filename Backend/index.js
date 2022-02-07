//mongod.exe --dbpath c:\data\db
const connectToMongo= require('./db');
const express = require('express');
var cors = require('cors')
require('dotenv').config();
const path =require ('path')

connectToMongo();
const app = express()
app.use(cors());

const port = process.env.PORT || 5000;
app.use(express.json());
app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));

//for heroku 
if(process.env.NODE_ENV=="production"){
  app.use(express.static("frontend/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
  });
}

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})
