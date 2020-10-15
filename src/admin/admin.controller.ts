import { AdminServices } from './admin.services';
import { Body, Controller, Post } from "@nestjs/common";

@Controller('admin')
export class AdminController{
    constructor(private readonly services:AdminServices){}
    @Post()
    login(@Body() payload){
        console.log(this.services.login(payload)) ;
        return this.services.login(payload) ;
    }
}