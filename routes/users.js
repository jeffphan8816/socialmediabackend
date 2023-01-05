import express from 'express';
import {
    getUser,
    getFriends,
    addRemoveFriend,
} from '../controllers/users.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

/* READ */
router.get('/:id', verifyToken, getUser);
router.get('/:id/friends', verifyToken, getFriends);

/* UPDATE */
router.put('/:id/addFriend', verifyToken, addRemoveFriend);

export default router;
