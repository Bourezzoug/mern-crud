const express = require('express');
const { createWorkout, getWorkout, getWorkouts, deleteWorkout, updateWorkout } = require('../controllers/workoutController');
const requireAuth = require('../middleware/requireAuth');

const router = express.Router();
router.use(requireAuth);

// GET All Workouts
router.get('/', getWorkouts)

// GET A Single Workout
router.get('/:id', getWorkout)

// POST A Workout
router.post('/', createWorkout)

// DELETE A Workout
router.delete('/:id', deleteWorkout)

// UPDATE A Workout
router.patch('/:id', updateWorkout)

module.exports = router