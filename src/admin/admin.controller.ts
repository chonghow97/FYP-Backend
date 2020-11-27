import { hash } from 'bcrypt';
import { adminLoginDTO } from './dto/adminLogin.dto';
import { AdminServices } from './admin.services';
import { Body, Controller, Get, Post } from "@nestjs/common";

@Controller('admin')
export class AdminController{
    constructor(private readonly services:AdminServices){}
    @Post()
    async login(@Body() payload:adminLoginDTO){
        return await this.services.login(payload);
    }

    @Get()
    async CreateOne(){
        // this.services.createOne(); //password 123456
    }
}