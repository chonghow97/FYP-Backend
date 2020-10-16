import { hash } from 'bcrypt';
import { adminLoginDTO } from './dto/adminLogin.dto';
import { AdminServices } from './admin.services';
import { Body, Controller, Post } from "@nestjs/common";

@Controller('admin')
export class AdminController{
    constructor(private readonly services:AdminServices){}
    @Post()
    async login(@Body() payload:adminLoginDTO){
        payload.password = await hash(payload.password, 10);
        console.log(this.services.login(payload)) ;
        return this.services.login(payload) ;
    }
}