import {Router} from 'express'
import { signup } from '../controller/auth'
const authRoutes:Router = Router()
authRoutes.post('/signup', signup)

export default authRoutes