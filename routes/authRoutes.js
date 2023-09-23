import express from 'express';
import  { login, register, resetPassword } from '../controllers/authControllers.js';
const router=express.Router()

router.post('/register', register);
router.post('/login', login);
// Add this route to your Express app
router.post('/reset-password', resetPassword);


export default router 
