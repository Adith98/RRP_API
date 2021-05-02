import express from 'express';

import {getProviders,createProvider,updateProvider} from '../controllers/Provider.js';

const router = express.Router();

/*
router.get('/',(req,res)=>{
    //console.log('We are on posts');
    res.send('We have reached Posts');
})
*/
router.get('/specific',(req,res)=>{
    //console.log('We are on a specific post');
    res.send('We are on a specific post');
})

router.get('/', getProviders);
router.post('/', createProvider);
router.patch('/:id', updateProvider);

export default router;