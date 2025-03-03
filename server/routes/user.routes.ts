import express from 'express'
import { authenticate } from '../middlewares/jwt.middleware'
import { deleteOneUser, getAllUsers, getOneuser, login, signup, updateUser } from '../controllers/user.controller'

const router = express.Router()

router.get('/getall', authenticate,getAllUsers);
router.post('/signup', signup),
router.post('/login',login);
router.put('/:id', authenticate, updateUser)
router.get('/:id',authenticate,getOneuser)
router.delete('/:id',authenticate,deleteOneUser )
export default router