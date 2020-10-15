import { AdminController } from './admin.controller';
import { Module } from "@nestjs/common";
import { AdminServices } from './admin.services';

@Module({
    imports:[],
    controllers: [AdminController],
    providers: [AdminServices],
})

export class AdminModule{}