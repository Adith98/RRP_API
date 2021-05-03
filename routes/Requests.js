import express from 'express';

import {createRequests, getRequests, addRegistrant} from '../controllers/Requests.js';

const router = express.Router();

router.get('/', getRequests);
router.post('/', createRequests);
router.patch('/:id',addRegistrant);

export default router;