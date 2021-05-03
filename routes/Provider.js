import express from 'express';

import {getProviders,createProvider,updateProvider} from '../controllers/Provider.js';

const router = express.Router();


router.get('/specific',(req,res)=>{
    res.send('We are on a specific post');
})

router.get('/', getProviders);
router.post('/', createProvider);
router.patch('/:id', updateProvider);

export default router;