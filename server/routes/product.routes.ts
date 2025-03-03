import express from 'express'
import { createProduct, deleteProduct, getAllProducts, getOneProduct, updateProduct } from '../controllers/product.controller'
import { authenticate } from '../middlewares/jwt.middleware'
const router = express.Router()


router.post('/create',authenticate, createProduct)
router.put('/:id',authenticate, updateProduct)
router.get('/products', authenticate, getAllProducts)
router.get('/product', authenticate,getOneProduct)
router.delete('/:id', authenticate, deleteProduct)
export default router