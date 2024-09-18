require('dotenv').config()
const express = require('express');
const mongoose = require("mongoose");
var cors = require("cors");
const PORT = process.env.PORT


const workoutRouter = require('./routes/workoutRoutes')

const app = express()

app.use(( req, res, next ) => {
    console.log(req.path,req.method)
    next()
})
app.use(express.json())
app.use(cors()); 

// Routes
app.use('/api/workouts',workoutRouter)





// DB Connection
mongoose.connect(process.env.MONGO_URI)
        .then(() => {
            app.listen(PORT,() => console.log(`Connected to DB & listening on PORT ${PORT}`))
        })
        .catch(error => console.log(error))
