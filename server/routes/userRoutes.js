import express from 'express';
import { getUsers, getUserById, createUser, updateUser, deleteUser } from '../controllers/userController.js';

const router = express.Router();

// Define user routes
router.get('/', getUsers);
router.get('/:id', getUserById);
router.post('/', createUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

export { router };
