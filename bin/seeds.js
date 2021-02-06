// Iteration #1
const mongoose = require('mongoose')

// To connect to our db
require('../configs/db.config.js')

// Require the data model to create the dummy initial datas in database

let DroneModel = require('../models/Drone.model.js')

// insert dummy/initial data into database

DroneModel.insertMany([
    {
        name: "OptimusPrime",
        propellers: 8,
        maxSpeed: 24
    },
    {
        name: "Bumblebee",
        propellers: 6,
        speed: 18
    },
    {
        name: "Megatron",
        propellers: 8,
        maxSpeed: 20
    }
])
.then(() => {
    console.log("Data Seeded");
    mongoose.connection.close()
})
.catch((error) => {
    console.log("Data seeding went wrong", error);
})