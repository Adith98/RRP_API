import express from 'express';

import {getRequesters,getaRequester,createRequester,updateRequester} from '../controllers/Requester.js';

const router = express.Router();

router.get('/', getRequesters);
router.get('/:id', getaRequester);
router.post('/', createRequester);
router.patch('/:id', updateRequester);

export default router;