const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/chatS').then(()=>console.log("db connected")).catch((error)=>console.log("db not connected", error))