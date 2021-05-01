import express from 'express';

const app = express();

//ROUTES

app.get('/',(req,res)=>{
    res.send("We are on HOME!");
})

//Listening to the server
app.listen(3000);