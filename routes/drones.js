const express = require('express');

// require the Drone model here
let DroneModel = require('../models/Drone.model.js')

const router = express.Router();

router.get('/drones', (req, res, next) => {
  // Iteration #2: List the drones
  DroneModel.find()
    .then((drones) => {
      res.render('drones/list', {drones})
    })
    .catch((err) => {
      console.log("Find Drones error: ", err);
    })
});

router.get('/drones/create', (req, res, next) => {
  // Iteration #3: Add a new drone
  res.render('drones/create-form')
});

router.post('/drones/create', (req, res, next) => {
  // Iteration #3: Add a new drone
  const { myDroneName, dronePropellers, droneSpeed } = req.body
    let myNewDrone = {
        name: myDroneName,
        propellers: dronePropellers,
        maxSpeed: droneSpeed
    }

    DroneModel.create(myNewDrone)
        .then(() => {
            // redirect the user to the /todos page
            //console.log("New drone created successfully");
            res.redirect('/drones')
        })
        .catch((err) => {
            console.log("something went wrong creating new Drone");
            console.log(err);
            res.redirect('/drones/create')
        })
});

router.get('/drones/:id/edit', (req, res, next) => {
  // Iteration #4: Update the drone
  let id = req.params.id

  DroneModel.findById(id)
  .then((drone) => {
      res.render('drones/update-form', {drone})
  })
  .catch(() => {
      console.log("something went wrong while getting a drone to edit route");
  })
});

router.post('/drones/:id/edit', (req, res, next) => {
  // Iteration #4: Update the drone
  let id = req.params.id
    const { myDroneName, dronePropellers, droneSpeed } = req.body
    let editedDrone = {
      name: myDroneName,
      propellers: dronePropellers,
      maxSpeed: droneSpeed
    }

    DroneModel.findByIdAndUpdate(id, editedDrone)
        .then(() => {
            res.redirect('/drones')
        })
        .catch(() => {
            console.log("Update edit failed");
        })
});

router.post('/drones/:id/delete', (req, res, next) => {
  // Iteration #5: Delete the drone
  let id = req.params.id

  DroneModel.findByIdAndDelete(id)
        .then(() => {
            //When delete successful, redirect the user to /todos page
            res.redirect('/drones')
        })
        .catch(() => {
            console.log("Delete failed");
        })
});

module.exports = router;
