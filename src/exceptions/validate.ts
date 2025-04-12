import { HttpException } from "./root";
import { compareSync } from 'bcrypt';
export class UnprocessableEntity extends HttpException{
  constructor(error:any, message: string, errorCode:number){
    super(message, errorCode, 422, error)
  }
}