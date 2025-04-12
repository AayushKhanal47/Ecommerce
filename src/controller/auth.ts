import {NextFunction, Request ,Response} from 'express'
import {hashSync, compareSync} from 'bcrypt'
import { prismaClient } from '..'
import * as jwt from 'jsonwebtoken'
import { JWT_SECRET } from '../secrets'; 
import { BadRequestException } from '../exceptions/bad_request';
import { ErrorCode } from '../exceptions/root';
import { UnprocessableEntity } from '../exceptions/validate';
import { SignUpSchema } from '../schema/users';


export const signup = async (req:Request, res:Response, next:NextFunction)=>{
    try {
        SignUpSchema.parse(req.body)
        const {email, password, name} = req.body;
    let user = await prismaClient.user.findFirst({where:{email}})
    if (user){  
        next( new BadRequestException('User alredy exists',ErrorCode.USER_ALREADY_EXISTS))
    }
    user = await prismaClient.user.create({
        data:{
            name,
            email,
            password: hashSync(password, 10)
        }
    })
    res.json(user)
    } catch (err:any) {
        next(new UnprocessableEntity(err?.issues, "Unprocessabele entity", ErrorCode.UNPROCESSABLE_ENTITY))
    }
    
}

export const login = async (req:Request, res:Response)=>{
    const {email, password } = req.body;
    let user = await prismaClient.user.findFirst({where:{email}})
    if (!user){  throw Error('User not exists')
          }
        if(!compareSync(password, user.password)){
            throw Error('Incorrect Password')
        }
        const token = jwt.sign({
            userId:user.id
        },JWT_SECRET)
        res.json({ user, token });
}

