const Workout = require('../models/Workout')
const mongoose = require("mongoose");

// GET All Workouts
const getWorkouts = async( req, res ) => {
    const workouts = await Workout.find({}).sort({ createdAt : -1 })

    return res.status(200).json(workouts)
}


// GET A Single Workout
const getWorkout = async( req, res ) => {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "No such workout"})
    }

    const workout = await Workout.findById(id)

    if(!workout) {
        return res.status(404).json({error: "No such workout"})
    }

    return res.status(200).json(workout)
}


// Create new workout
const createWorkout = async (req, res) => {
    const {title, load, reps} = req.body
  
    let emptyFields = []
  
    if (!title) {
      emptyFields.push('title')
    }
    if (!load) {
      emptyFields.push('load')
    }
    if (!reps) {
      emptyFields.push('reps')
    }
    if (emptyFields.length > 0) {
      return res.status(400).json({ error: 'Please fill in all fields', emptyFields })
    }
  
    // add to the database
    try {
      const workout = await Workout.create({ title, load, reps })
      res.status(200).json(workout)
    } catch (error) {
      res.status(400).json({ error: error.message })
    }
}


// DELETE a workout
const deleteWorkout = async( req, res ) => {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "No such workout"})
    }

    const workout = await Workout.findOneAndDelete({ _id : id });

    if(!workout) {
        return res.status(400).json({error: "No such workout"})
    }

    return res.status(200).json(workout)

}

// UPDATE a workout
const updateWorkout = async( req, res ) => {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "No such workout"})
    }

    const workout = await Workout.findByIdAndUpdate({ _id : id },{...req.body})

    if(!workout) {
        return res.status(400).json({error: "No such workout"})
    }

    return res.status(200).json(workout)

}

module.exports = { 
    createWorkout,
    getWorkouts,
    getWorkout,
    deleteWorkout,
    updateWorkout
}