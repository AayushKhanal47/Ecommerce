import { HttpException } from './root';
import { ErrorCode } from './root';

export class BadRequestException extends HttpException{
    constructor(message:string, errorCode:ErrorCode){
        super(message,errorCode,400,null)
    }
}