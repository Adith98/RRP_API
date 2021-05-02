import express from 'express';
import mongoose from 'mongoose';
import 'dotenv/config.js';

import postRoutes from './routes/posts.js';

//Initialization
const app = express();

////Middlewares -> Every time a route is hit, this will run first
//Import Routes
app.use('/posts',postRoutes)

//ROUTES
app.get('/', (req, res) => {
    res.send("We are on HOME!");
})


//Connect to Database
mongoose.connect(
    process.env.DB_CONNECTION,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => { console.log('Connected to Mongo DB') }
);

//Listening to the server
app.listen(3000);