import express from 'express'
import { createProduct, deleteProduct, updateProduct } from '../controllers/productController.js'
import authMiddleware from '../middleware/auth.js';


const router = express.Router();
router.post('/', authMiddleware,createProduct);
router.put('/:productId', authMiddleware, updateProduct);
router.delete('/:productId', authMiddleware, deleteProduct);

export default router 
