import {Router} from 'express'
import { login } from '../controller/auth'
const authRoutes:Router = Router()
authRoutes.get('/login', login)

export default authRoutes