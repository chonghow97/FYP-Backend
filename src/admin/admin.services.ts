import { Injectable } from "@nestjs/common";

@Injectable()
export class AdminServices{
    login(payload){
        return payload;
    }
}
