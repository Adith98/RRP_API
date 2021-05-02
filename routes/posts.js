import express from 'express';

const router = express.Router();

router.get('/',(req,res)=>{
    //console.log('We are on posts');
    res.send('We have reached Posts');
})

router.get('/specific',(req,res)=>{
    //console.log('We are on a specific post');
    res.send('We are on a specific post');
})

export default router;