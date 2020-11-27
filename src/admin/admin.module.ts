import { admin, adminSchema } from './admin.schema';
import { AdminController } from './admin.controller';
import { Module } from "@nestjs/common";
import { AdminServices } from './admin.services';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
    imports:[MongooseModule.forFeature([{ name: admin.name, schema: adminSchema }])],
    controllers: [AdminController],
    providers: [AdminServices],
})

export class AdminModule{}