import express from 'express';

import {getRequestById, createRequests, getRequests, addRegistrant} from '../controllers/Requests.js';

const router = express.Router();

router.get('/', getRequests);
router.get('/:id', getRequestById);
router.post('/', createRequests);
router.patch('/:id',addRegistrant);

export default router;