const mongoose = require('mongoose')

let DroneSchema = new mongoose.Schema({
    name:{
        type:String,
        required: true
    },
    propellers:{
        type: Number,
        required: true
    },
    maxSpeed:{
        type: Number,
        required: true
    }
})

let DroneModel = mongoose.model('myDrone', DroneSchema)

module.exports = DroneModel