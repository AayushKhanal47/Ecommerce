import {Request ,Response} from 'express'
import {hashSync} from 'bcrypt'
import { prismaClient } from '..'


export const signup = async (req:Request, res:Response)=>{
    const {email, password, name} = req.body;
    let user = await prismaClient.user.findFirst({where:{email}})
    if (user){  throw Error('User alredy exists')
        
    }
    user = await prismaClient.user.create({
        data:{
            name,
            email,
            password: hashSync(password, 10)
        }
    })
    res.json(user)
}

