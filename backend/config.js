const mongoose = require('mongoose');

const URL = "mongodb://127.0.0.1:27017/iNoteBook";

const connectToMongo = ()=>{
    mongoose.connect(URL)
    console.log("Database connected successfully")
}
module.exports = connectToMongo;