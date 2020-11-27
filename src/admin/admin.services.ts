import { adminLoginDTO } from './dto/adminLogin.dto';
import { compare, hash } from 'bcrypt';
import { admin } from './admin.schema';
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from 'mongoose';

@Injectable()
export class AdminServices{
    constructor(@InjectModel(admin.name) private adminModel: Model<admin>) {}
    async login(payload:adminLoginDTO){
        const admin = await (await this.adminModel.findOne()).toJSON();
        const {Password,__v,_id,...rest} = admin;
        if(await compare(payload.password, Password)){
            return rest;
        }else{
            throw new Error("ssss");
        }
        
    }

    async createOne(){
        const password = "123456";
        const hashedPassword = await hash(password,10);
        const admin = {Name: "admin", Password: hashedPassword, Email:"chong.how97@live.com"};
        const newadmin = new this.adminModel(admin);
        await newadmin.save();
    }
}
