import express from 'express';
import  { login, register, resetPassword, updateAddress } from '../controllers/authControllers.js';
const router=express.Router()

router.post('/register', register);
router.post('/login', login);
router.post('/reset-password', resetPassword);
router.post('/update-address', updateAddress);


export default router 
